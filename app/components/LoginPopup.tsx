import React, { useState } from "react";
import { useRouter } from "next/router";
import { Grid, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import LoginForm from "@/components/Form/LoginForm";

const LoginPopup = ({ errorMessage, onClose }: any) => {
  const router = useRouter();
  return (
    <div className="popup">
      <h2>{errorMessage}</h2>

      <LoginForm />
      <div className="popup-close-button" style={{ textAlign: "center" }}>
        <IconButton onClick={onClose}>
          <CloseIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
};

export default LoginPopup;
