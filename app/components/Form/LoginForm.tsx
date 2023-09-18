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


const LoginForm: React.FC = (props:any) => {
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
      baseURL: `${process.env.NEXT_PUBLIC_RAILS_API}/api/v1/`,
      headers: {
        "content-type": "application/json",
      },
    });
    
    (async () => {
      setIsError(false);
      setErrorMessage("");
      try {
        const response = await axiosInstance.post("auth/sign_in", {
          email: data.get("email"),
          password: data.get("password"),
        });
        Cookies.set("user_id",response.data.data.user_id , { expires: 7 });
        Cookies.set("uid", response.headers["uid"] , { expires: 7 });
        Cookies.set("client", response.headers["client"] , { expires: 7 });
        Cookies.set("access-token", response.headers["access-token"], { expires: 7 }) ;
        

        const usersAxiosInstance = axios.create({
          baseURL: `${process.env.NEXT_PUBLIC_RAILS_API}`,
          headers: {
            "content-type": "application/json",
            uid: Cookies.get("uid"),
            client: Cookies.get("client"),
            "access-token": Cookies.get("access-token"),
          },
        });
        const userResponse = await usersAxiosInstance.get(`users/${response.data.data.user_id}`);
        const userImage = userResponse.data.image_url; 
        Cookies.set("user_image", userImage);
        
        router.push(`/users/profile/${response.data.data.user_id}`);
      } catch (error:any) {
        if(error.response.data.errors[0].includes("A confirmation email was sent to your account"))
        {
          const resendResponse = await axiosInstance.post("/auth/confirmation", {
            email: data.get("email"),
            password: data.get("password"),
            redirect_url :`${process.env.NEXT_PUBLIC_RAILS_API}/redirect/confirm`
          });

          if(resendResponse.statusText="OK"){
              setIsError(true);
              setErrorMessage("本登録が済んでおりません。メールをご確認ください。");
              return
          }

        }
        Cookies.remove("user_id");
        Cookies.remove("uid");
        Cookies.remove("client");
        Cookies.remove("access-token");
        setIsError(true);
        if (error) {
          console.log(error);
          setErrorMessage("メールアドレスかパスワードが間違っています");
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
            <Link href="/SignUp" style={{ color: 'blue' }}>
              新規登録
            </Link>
            してください。
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            パスワードを忘れた方は
            <Link href="/resetPassword" style={{ color: 'blue' }}>
            こちら
            </Link>
          </Typography>
          {isError && (
            <Alert
              style={{width:"70%",display:"box",margin:"10px auto"}}
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


export default LoginForm;



