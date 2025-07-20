import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDoctors, Doctor } from "../api/doctors";
import { useAuth } from "../context/AuthContext";
import {
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function DoctorList() {
  const { token } = useAuth();
  const { t } = useTranslation();
  const { data, isLoading, error } = useQuery(
    ["doctors"],
    () => fetchDoctors(token!),
    {
      enabled: !!token,
    }
  );

  if (isLoading) return <CircularProgress />;
  if (error)
    return <Typography color="error">{t("Error loading doctors")}</Typography>;
  if (!data || data.length === 0)
    return <Typography>{t("No doctors found")}</Typography>;

  return (
    <List>
      {data.map((doc: Doctor) => (
        <ListItem
          key={doc.id}
          divider
          component={Link}
          href={`/doctors/${doc.id}`}
          button
        >
          <ListItemAvatar>
            <Avatar src={doc.photoUrl}>{doc.userId[0]}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={doc.userId}
            secondary={doc.specialties.join(", ")}
          />
        </ListItem>
      ))}
    </List>
  );
}
