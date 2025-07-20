import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: RegisterAuthDto) {
    console.log('Registering user:', data.email);
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existing) throw new ConflictException('Email already in use');
    const hashed = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: { ...data, password: hashed },
    });
    return { ...user, password: undefined };
  }

  async login(data: LoginAuthDto) {
    console.log('User login attempt:', data.email);
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
      include: { roles: true },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
      user: {
        email: user.email,
        roles: user.roles.map((r) => r.name),
      },
    };
  }
}
