import React, { useState, FormEvent,useEffect } from "react";
import { useRouter } from "next/router";
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material/";
import axios from "axios";
import Cookies from "js-cookie";
import { GetServerSideProps } from 'next';
import Link from 'next/link'


const ResetPasswordForm: React.FC = (props:any) => {
  const router = useRouter();
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [user_id, setUserId] = useState('');

  const handleSubmit = (event:any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const axiosInstance = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_RAILS_API}/api/v1/auth`,
      headers: {
        "content-type": "application/json",
      },
    });
    
    (async () => {
      setIsError(false);
      setErrorMessage("");
      try {
        const response = await axiosInstance.post("/password", {
          email: data.get("email"),
          redirect_url :`${process.env.NEXT_PUBLIC_RAILS_API}/redirect/reset`
        });
    
        
        console.log(response)
      } catch (error) {
        setIsError(true);
        if (error) {
          console.log(error);
          setErrorMessage("正しいメールアドレスを入力してください");
        }
      }
    })();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box style={{margin:"10px"}}>
        <Typography component="h1" variant="h5">
          メールアドレスを入力してください。
        </Typography>
        <Box component="form" onSubmit={handleSubmit} style={{textAlign:"center"}}>
          <TextField
            style={{margin:"5px auto"}}
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
          />
        
          <Button type="submit" variant="contained" sx={{ display:"block",margin:"15px auto"}}>
            パスワードをリセットする
          </Button>
          <Typography variant="body2" color="textSecondary" align="center">
            アカウントをお持ちでない場合は、
            <Link href="/SignUp" style={{ color: 'blue' }}>
              新規登録
            </Link>
            してください。
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            アカウントをお持ちの場合は、
            <Link href="/Login"  style={{ color: 'blue' }} >
              ログイン
            </Link>
            してください。
          </Typography>
          {isError && (
            <Alert
              style={{width:"70%",display:"box",margin:"5px auto"}}
              onClose={() => {
                setIsError(false);
                setErrorMessage("");
              }}
              severity="error"
            >
              {errorMessage}
            </Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
};


export default ResetPasswordForm;



