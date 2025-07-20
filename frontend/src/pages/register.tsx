import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/auth/register", {
        email,
        password,
        firstName,
        lastName,
        phone,
      });
      toast.success(t("register") + " successful!");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Register failed");
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
          {t("register")}
        </Typography>
        <form onSubmit={handleRegister}>
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
          <TextField
            label={t("firstName") || "First Name"}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label={t("lastName") || "Last Name"}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label={t("phone") || "Phone"}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {t("register")}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
