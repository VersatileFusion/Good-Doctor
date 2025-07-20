import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPayments, Payment } from "../api/payments";
import { useAuth } from "../context/AuthContext";
import {
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function PaymentList() {
  const { token } = useAuth();
  const { t } = useTranslation();
  const { data, isLoading, error } = useQuery(
    ["payments"],
    () => fetchPayments(token!),
    {
      enabled: !!token,
    }
  );

  if (isLoading) return <CircularProgress />;
  if (error)
    return <Typography color="error">{t("Error loading payments")}</Typography>;
  if (!data || data.length === 0)
    return <Typography>{t("No payments found")}</Typography>;

  return (
    <List>
      {data.map((pay: Payment) => (
        <ListItem key={pay.id} divider>
          <ListItemText
            primary={`${t("Appointment")}: ${pay.appointmentId} | ${t(
              "Amount"
            )}: ${pay.amount}`}
            secondary={`${t("Status")}: ${pay.status} ${
              pay.paidAt
                ? "| " +
                  t("Paid at") +
                  ": " +
                  new Date(pay.paidAt).toLocaleString()
                : ""
            }`}
          />
        </ListItem>
      ))}
    </List>
  );
}
