import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import axios from "axios";

const resourceTypes = [
  { value: "ARTICLE", label: "Article" },
  { value: "EXERCISE", label: "Exercise" },
  { value: "VIDEO", label: "Video" },
  { value: "LINK", label: "Link" },
];

export default function CreateResourceForm() {
  const { token, user } = useAuth();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("ARTICLE");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  const mutation = useMutation(
    async (data: any) => {
      setLoading(true);
      const res = await axios.post("/api/resources", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoading(false);
      return res.data;
    },
    {
      onSuccess: () => {
        toast.success(t("Resource created!"));
        queryClient.invalidateQueries(["resources"]);
        setTitle("");
        setContent("");
        setUrl("");
        setTags("");
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Create failed");
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      title,
      type,
      content,
      url,
      tags: tags.split(",").map((t) => t.trim()),
      createdBy: user?.email || "",
    });
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" mb={2}>
        {t("Create Resource")}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label={t("Title")}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          select
          label={t("Type")}
          value={type}
          onChange={(e) => setType(e.target.value)}
          fullWidth
          margin="normal"
        >
          {resourceTypes.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label={t("Content")}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
        <TextField
          label={t("URL")}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label={t("Tags (comma separated)")}
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {t("Create Resource")}
        </Button>
      </form>
    </Paper>
  );
}
