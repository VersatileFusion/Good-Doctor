import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchTotalAppointments,
  fetchTotalRevenue,
  fetchAppointmentsPerDoctor,
  fetchNewPatientsPerMonth,
} from "../api/analytics";
import { useAuth } from "../context/AuthContext";
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function AnalyticsSummary() {
  const { token } = useAuth();
  const { t } = useTranslation();
  const { data: totalAppointments } = useQuery(
    ["totalAppointments"],
    () => fetchTotalAppointments(token!),
    { enabled: !!token }
  );
  const { data: totalRevenue } = useQuery(
    ["totalRevenue"],
    () => fetchTotalRevenue(token!),
    { enabled: !!token }
  );
  const { data: perDoctor } = useQuery(
    ["appointmentsPerDoctor"],
    () => fetchAppointmentsPerDoctor(token!),
    { enabled: !!token }
  );
  const { data: newPatients } = useQuery(
    ["newPatientsPerMonth"],
    () => fetchNewPatientsPerMonth(token!),
    { enabled: !!token }
  );

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" mb={2}>
        {t("analytics")}
      </Typography>
      <Box mb={2}>
        <Typography>
          {t("Total Appointments")}:{" "}
          {totalAppointments?.totalAppointments ?? "-"}
        </Typography>
        <Typography>
          {t("Total Revenue")}: {totalRevenue?.totalRevenue ?? "-"}
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="subtitle1">
          {t("Appointments per Doctor")}:
        </Typography>
        <List>
          {perDoctor &&
            perDoctor.map((d: any) => (
              <ListItem key={d.doctorId}>
                <ListItemText
                  primary={`${t("Doctor")}: ${d.doctorId} | ${t("Count")}: ${
                    d._count.id
                  }`}
                />
              </ListItem>
            ))}
        </List>
      </Box>
      <Box>
        <Typography variant="subtitle1">
          {t("New Patients per Month")}:
        </Typography>
        <List>
          {newPatients &&
            Object.entries(newPatients).map(([month, count]) => (
              <ListItem key={month}>
                <ListItemText primary={`${month}: ${count}`} />
              </ListItem>
            ))}
        </List>
      </Box>
    </Paper>
  );
}
