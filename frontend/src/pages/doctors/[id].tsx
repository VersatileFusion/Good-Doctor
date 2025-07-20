import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchDoctorById } from "../../api/doctors";
import { Typography, Box, Paper, Avatar, Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function DoctorDetailPage() {
  const { token } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, error } = useQuery(
    ["doctor", id],
    () => fetchDoctorById(token!, id as string),
    {
      enabled: !!token && !!id,
    }
  );

  if (isLoading) return <Typography>{t("Loading...")}</Typography>;
  if (error)
    return <Typography color="error">{t("Error loading doctor")}</Typography>;
  if (!data) return <Typography>{t("Doctor not found")}</Typography>;

  return (
    <ProtectedRoute>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Paper sx={{ p: 4, minWidth: 320 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar src={data.photoUrl} sx={{ width: 56, height: 56, mr: 2 }}>
              {data.userId[0]}
            </Avatar>
            <Typography variant="h4">{data.userId}</Typography>
          </Box>
          <Typography variant="subtitle1" mb={1}>
            {t("Bio")}: {data.bio || "-"}
          </Typography>
          <Box mb={2}>
            {data.specialties.map((spec: string) => (
              <Chip key={spec} label={spec} sx={{ mr: 1 }} />
            ))}
          </Box>
        </Paper>
      </Box>
    </ProtectedRoute>
  );
}
