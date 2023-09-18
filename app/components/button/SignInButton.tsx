import Typography from "@mui/material/Typography";
import LoginIcon from "@mui/icons-material/Login";
import React from "react";

const SigninButton = ({ func }: any) => {
  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FF9800",
    padding: "10px",
    borderRadius: "4px",
    cursor: "pointer",
    margin: "3px 5px",
  };

  const iconStyle = {
    marginRight: "5px",
    color: "black",
  };
  const textStyle = {
    fontWeight: "bold",
    color: "black", // 黒色に設定
    userSelect: "none" as const, // 選択不可に設定
    whiteSpace: "nowrap" as const,
  };

  return (
    <div style={buttonStyle} onClick={func}>
      <LoginIcon style={iconStyle} />
      <Typography className="hidden lg:block" style={textStyle}>サインイン</Typography>
    </div>
  );
};

export default SigninButton;
