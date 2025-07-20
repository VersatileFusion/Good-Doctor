import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointment } from "../api/appointments";
import { useAuth } from "../context/AuthContext";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function BookAppointmentForm() {
  const { token, user } = useAuth();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [doctorId, setDoctorId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [notes, setNotes] = useState("");

  const mutation = useMutation((data: any) => createAppointment(token!, data), {
    onSuccess: () => {
      toast.success(t("Appointment booked!"));
      queryClient.invalidateQueries(["appointments"]);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Booking failed");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      doctorId,
      patientId: user?.email,
      startTime,
      endTime,
      notes,
    });
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" mb={2}>
        {t("Book Appointment")}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label={t("Doctor ID")}
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label={t("Start Time")}
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          fullWidth
          margin="normal"
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label={t("End Time")}
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          fullWidth
          margin="normal"
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label={t("Notes")}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={mutation.isLoading}
        >
          {t("Book Appointment")}
        </Button>
      </form>
    </Paper>
  );
}
