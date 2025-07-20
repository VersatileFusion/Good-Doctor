import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotifications, Notification } from "../api/notifications";
import { useAuth } from "../context/AuthContext";
import {
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function NotificationList() {
  const { token } = useAuth();
  const { t } = useTranslation();
  const { data, isLoading, error } = useQuery(
    ["notifications"],
    () => fetchNotifications(token!),
    {
      enabled: !!token,
    }
  );

  if (isLoading) return <CircularProgress />;
  if (error)
    return (
      <Typography color="error">{t("Error loading notifications")}</Typography>
    );
  if (!data || data.length === 0)
    return <Typography>{t("No notifications found")}</Typography>;

  return (
    <List>
      {data.map((notif: Notification) => (
        <ListItem key={notif.id} divider>
          <ListItemText
            primary={notif.message}
            secondary={new Date(notif.createdAt).toLocaleString()}
          />
        </ListItem>
      ))}
    </List>
  );
}
