import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchAppointmentById } from "../../api/appointments";
import { Typography, Box, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function AppointmentDetailPage() {
  const { token } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, error } = useQuery(
    ["appointment", id],
    () => fetchAppointmentById(token!, id as string),
    {
      enabled: !!token && !!id,
    }
  );

  if (isLoading) return <Typography>{t("Loading...")}</Typography>;
  if (error)
    return (
      <Typography color="error">{t("Error loading appointment")}</Typography>
    );
  if (!data) return <Typography>{t("Appointment not found")}</Typography>;

  return (
    <ProtectedRoute>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Paper sx={{ p: 4, minWidth: 320 }}>
          <Typography variant="h4" mb={2}>
            {t("Appointment")}
          </Typography>
          <Typography variant="subtitle1" mb={1}>
            {t("Doctor")}: {data.doctorId}
          </Typography>
          <Typography variant="subtitle1" mb={1}>
            {t("Patient")}: {data.patientId}
          </Typography>
          <Typography variant="body1" mb={2}>
            {t("From")}: {new Date(data.startTime).toLocaleString()}
          </Typography>
          <Typography variant="body1" mb={2}>
            {t("To")}: {new Date(data.endTime).toLocaleString()}
          </Typography>
          <Typography variant="body2" mb={2}>
            {t("Status")}: {data.status}
          </Typography>
          {data.notes && (
            <Typography variant="body2" mb={2}>
              {t("Notes")}: {data.notes}
            </Typography>
          )}
        </Paper>
      </Box>
    </ProtectedRoute>
  );
}
