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


const ResendToken: React.FC = (props:any) => {
  const router = useRouter();
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [user_id, setUserId] = useState('');
  useEffect(() => {
    
    const { error } = router.query; // クエリパラメータからエラーメッセージを取得

    if (error) {
      if(decodeURIComponent(error as string)=="NeedtoLogin"){
        setErrorMessage("ログインが必要です");
        setIsError(true);
      }
       // URLエンコードされたエラーメッセージをデコードして設定
    }
  }, [router.query]);

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
        const response = await axiosInstance.post("/confirmation", {
          email: data.get("email"),
          password: data.get("password"),
          redirect_url :`${process.env.NEXT_PUBLIC_RAILS_API}/redirect/confirm`
        });
    
        
        console.log(response)
      } catch (error:any) {
        setIsError(true);
        if (error) {
          console.log(error);
          setErrorMessage(error.message);
        }
      }
    })();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box style={{margin:"10px"}}>
        <Typography component="h1" variant="h5">
          ログイン
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
          <TextField
            style={{margin:"5px auto"}}
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button type="submit" variant="contained" sx={{ display:"block",margin:"15px auto"}}>
            ログイン
          </Button>
          <Typography variant="body2" color="textSecondary" align="center">
            アカウントをお持ちでない場合は、
            <Link href="/SignUp">
              新規登録
            </Link>
            してください。
          </Typography>
          {isError && (
            <Alert
              style={{width:"70%",display:"box",margin:"0 auto"}}
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


export default ResendToken;



