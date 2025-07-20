import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPatients, Patient } from "../api/patients";
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

export default function PatientList() {
  const { token } = useAuth();
  const { t } = useTranslation();
  const { data, isLoading, error } = useQuery(
    ["patients"],
    () => fetchPatients(token!),
    {
      enabled: !!token,
    }
  );

  if (isLoading) return <CircularProgress />;
  if (error)
    return <Typography color="error">{t("Error loading patients")}</Typography>;
  if (!data || data.length === 0)
    return <Typography>{t("No patients found")}</Typography>;

  return (
    <List>
      {data.map((pat: Patient) => (
        <ListItem
          key={pat.id}
          divider
          component={Link}
          href={`/patients/${pat.id}`}
          button
        >
          <ListItemText
            primary={pat.userId}
            secondary={pat.medicalHistory || t("No medical history")}
          />
        </ListItem>
      ))}
    </List>
  );
}
