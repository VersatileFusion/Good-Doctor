import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAppointments, Appointment } from "../api/appointments";
import { useAuth } from "../context/AuthContext";
import {
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function AppointmentList() {
  const { token } = useAuth();
  const { t } = useTranslation();
  const { data, isLoading, error } = useQuery(
    ["appointments"],
    () => fetchAppointments(token!),
    {
      enabled: !!token,
    }
  );

  if (isLoading) return <CircularProgress />;
  if (error)
    return (
      <Typography color="error">{t("Error loading appointments")}</Typography>
    );
  if (!data || data.length === 0)
    return <Typography>{t("No appointments found")}</Typography>;

  return (
    <List>
      {data.map((appt: Appointment) => (
        <ListItem
          key={appt.id}
          divider
          component={Link}
          href={`/appointments/${appt.id}`}
          button
        >
          <ListItemText
            primary={`${t("Doctor")}: ${appt.doctorId} | ${t("Patient")}: ${
              appt.patientId
            }`}
            secondary={`${t("From")}: ${new Date(
              appt.startTime
            ).toLocaleString()} ${t("To")}: ${new Date(
              appt.endTime
            ).toLocaleString()} | ${t("Status")}: ${appt.status}`}
          />
        </ListItem>
      ))}
    </List>
  );
}
