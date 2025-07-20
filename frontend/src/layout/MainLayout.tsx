import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { label: "dashboard", href: "/" },
  { label: "appointments", href: "/appointments" },
  { label: "doctors", href: "/doctors" },
  { label: "patients", href: "/patients" },
  { label: "payments", href: "/payments" },
  { label: "notifications", href: "/notifications" },
  { label: "analytics", href: "/analytics" },
  { label: "resources", href: "/resources" },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const switchLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => switchLanguage("en")}>English</MenuItem>
            <MenuItem onClick={() => switchLanguage("fa")}>فارسی</MenuItem>
          </Menu>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {t("welcome")}
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {user &&
              navLinks.map((link) => (
                <Button
                  key={link.href}
                  color="inherit"
                  component={Link}
                  href={link.href}
                  sx={{ ml: 1 }}
                >
                  {t(link.label)}
                </Button>
              ))}
            {!user && (
              <Button
                color="inherit"
                component={Link}
                href="/login"
                sx={{ ml: 1 }}
              >
                {t("login")}
              </Button>
            )}
            {!user && (
              <Button
                color="inherit"
                component={Link}
                href="/register"
                sx={{ ml: 1 }}
              >
                {t("register")}
              </Button>
            )}
            {user && (
              <Button color="inherit" onClick={logout} sx={{ ml: 1 }}>
                {t("logout")}
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2 }}>{children}</Box>
    </>
  );
}
