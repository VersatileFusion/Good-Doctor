import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchResourceById } from "../../api/resources";
import { Typography, Box, Paper, Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function ResourceDetailPage() {
  const { token } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, error } = useQuery(
    ["resource", id],
    () => fetchResourceById(token!, id as string),
    {
      enabled: !!token && !!id,
    }
  );

  if (isLoading) return <Typography>{t("Loading...")}</Typography>;
  if (error)
    return <Typography color="error">{t("Error loading resource")}</Typography>;
  if (!data) return <Typography>{t("Resource not found")}</Typography>;

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
            {data.title}
          </Typography>
          <Typography variant="subtitle1" mb={1}>
            {t("Type")}: {data.type}
          </Typography>
          <Typography variant="body1" mb={2}>
            {data.content}
          </Typography>
          {data.url && (
            <Typography variant="body2" mb={2}>
              <a href={data.url} target="_blank" rel="noopener noreferrer">
                {data.url}
              </a>
            </Typography>
          )}
          <Box mb={2}>
            {data.tags.map((tag: string) => (
              <Chip key={tag} label={tag} sx={{ mr: 1 }} />
            ))}
          </Box>
          <Typography variant="caption">
            {t("Created by")}: {data.createdBy}
          </Typography>
        </Paper>
      </Box>
    </ProtectedRoute>
  );
}
