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




const PasswordRemakeForm: React.FC = (props:any) => {
  const router = useRouter();
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");
  const [reset_password_token, setToken] = useState("");
  const [user_id, setUserId] = useState('');
  const [uid,setUid] = useState("");
  const [accessToken,setAccesstoken] = useState("");
  const [client,setClient] = useState("");

  useEffect(() => {
    
    const { uid, 'access-token': accessToken, client } = router.query;
    setUid(uid as string);
    setAccesstoken(accessToken as string);
    setClient(client as string);
  
    if (reset_password_token) {
      
        setToken(decodeURIComponent(reset_password_token as string));
    }
    else{
      //  router.push("/Login?error=不明なエラーが発生しました")
    }
       // URLエンコードされたエラーメッセージをデコードして設定
  }, [router.query]);

  const handleSubmit = (event:any) => {
    event.preventDefault();
    setIsError(false);
    setErrorMessage("");
    setIsSuccess(false);
    setSuccessMessage("");
    setIsPasswordError(false);
        // バリデーションチェック

        if (!password) {
            setIsError(true);
            setIsPasswordError(true);
            setErrorMessage("パスワードを入力してください。");
            return
          }
      
          // パスワードのバリデーションチェック
          if (password.length < 6) {
            setIsError(true);
            setIsPasswordError(true);
            setErrorMessage("パスワードは6文字以上で入力してください。");
            return;
          }

    const data = new FormData(event.currentTarget);
    if (password !== password_confirmation) {
        setIsError(true);
        setErrorMessage("パスワードが一致しません");
        return;
      }
  
    const axiosInstance = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_RAILS_API}/api/v1/`,
      headers: {
        "content-type": "application/json",
      },
    });
    
    (async () => {

      try {
        const response = await axiosInstance.put("auth/password", {
          "password": data.get("password"),
          "password_confirmation":data.get("password_confirmation"),
          "uid":uid,
          "access-token":accessToken,
          "client":client
        });
        console.log(response)
        if(response.statusText=='OK'){
          setIsSuccess(true)
          setSuccessMessage("パスワードがリセットされました。")
        }
      } catch (error:any) {
        setIsError(true);
        console.log(error);
        if (error.response) {
          
         
        }else{
          setErrorMessage("不明なエラーが発生しました")
        }
      }
    })();
  };

  return (
<Container component="main" maxWidth="xs">
<Box component="form" onSubmit={handleSubmit} style={{textAlign:"center"}}>
    <Typography component="h1" variant="h5">
      パスワードのリセット
    </Typography>
      <TextField
        style={{ width: "70%", margin: "5px auto" }}
        name="password"
        label="パスワード"
        type="password"
        id="password"
        value={password}
        autoComplete="new-password"
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
        error={isPasswordError}
      />
      <TextField
        style={{ width: "70%", margin: "5px auto" }}
        name="password_confirmation"
        label="パスワードの再入力"
        type="password"
        id="password_confirmation"
        value={password_confirmation}
        autoComplete="new-password"
        onChange={(e:any) => setConfirmPassword(e.target.value)}
        error={isPasswordError}
      />
      <Button type="submit" variant="contained" sx={{ display: "block", margin: "15px auto" }}>
        パスワードのリセット
      </Button>
      {isError && (
        <Alert
          style={{  display: "box", margin: "0 auto",whiteSpace: "normal"  }}
          onClose={() => {
            setIsError(false);
            setErrorMessage("");
          }}
          severity="error"
        >
          {errorMessage}
        </Alert>
      )}
      {(isSuccess && !isError) && (
        <Alert
          
          style={{  display: "box", margin: "0 auto",whiteSpace: "normal"  }}
          onClose={() => {
            setIsSuccess(false);
            setSuccessMessage("");
          }}
          severity="success"
        >
          {successMessage}
        </Alert>
      )}
    </Box>
</Container>
  );
};


export default PasswordRemakeForm;



