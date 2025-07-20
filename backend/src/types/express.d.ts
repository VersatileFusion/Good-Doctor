import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    roles?: string[];
    // add other properties as needed
  };
}
