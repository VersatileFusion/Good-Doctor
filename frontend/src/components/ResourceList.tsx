import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchResources, Resource } from "../api/resources";
import { useAuth } from "../context/AuthContext";
import {
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ResourceList() {
  const { token } = useAuth();
  const { t } = useTranslation();
  const { data, isLoading, error } = useQuery(
    ["resources"],
    () => fetchResources(token!),
    {
      enabled: !!token,
    }
  );

  if (isLoading) return <CircularProgress />;
  if (error)
    return (
      <Typography color="error">{t("Error loading resources")}</Typography>
    );
  if (!data || data.length === 0)
    return <Typography>{t("No resources found")}</Typography>;

  return (
    <List>
      {data.map((res: Resource) => (
        <ListItem key={res.id} divider>
          <ListItemText
            primary={res.title}
            secondary={`${t("Type")}: ${res.type} | ${t("Created by")}: ${
              res.createdBy
            }`}
          />
        </ListItem>
      ))}
    </List>
  );
}
