import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      toast.success(t("login") + " successful!");
      // Role-based redirect
      const roles = res.data.user?.roles || [];
      if (roles.includes("ADMIN")) {
        router.push("/admin");
      } else if (roles.includes("DOCTOR")) {
        router.push("/doctor-dashboard");
      } else if (roles.includes("PATIENT")) {
        router.push("/patient-dashboard");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Paper sx={{ p: 4, minWidth: 320 }}>
        <Typography variant="h5" mb={2}>
          {t("login")}
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label={t("password") || "Password"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {t("login")}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
