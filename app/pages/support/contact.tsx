import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  TextField,
  Grid,
  Button,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";

interface MyError {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
  [key: string]: string;
}

function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<MyError>({
    name: "",
    email: "",
    inquiryType: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleInquiryTypeChange = (e: any) => {
    setInquiryType(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const validateForm = () => {
    const errors: MyError = {
      name: "",
      email: "",
      inquiryType: "",
      message: "",
    };

    if (!name.trim()) {
      errors.name = "名前は必須です";
    }

    if (!email.trim()) {
      errors.email = "メールアドレスは必須です";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "有効なメールアドレスを入力してください";
    }

    if (!inquiryType) {
      errors.inquiryType = "問い合わせ種別を選択してください";
    }

    if (!message.trim()) {
      errors.message = "問い合わせ内容は必須です";
    }

    setErrors(errors);
    console.log(Object.keys(errors));

    return Object.keys(errors).every((key) => !errors[key]);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setSubmitStatus("sending");

        const payload = {
          name: name,
          email: email,
          inquiryType: inquiryType,
          message: message,
        };

        await axios.post(
          `${process.env.NEXT_PUBLIC_RAILS_API}/contacts`,
          payload
        );

        setSubmitStatus("success");
        setName("");
        setEmail("");
        setInquiryType("");
        setMessage("");
      } catch (error) {
        setSubmitStatus("error");
        console.log(error);
      }
    }
  };

  const handleCloseSnackbar = () => {};

  return (
    <Layout>
      <div className="contactForm">
        <h2>お問い合わせ</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="名前"
                value={name}
                onChange={handleNameChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                value={email}
                onChange={handleEmailChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                error={Boolean(errors.inquiryType)}
                required
                fullWidth
              >
                <InputLabel id="inquiryType-label">問い合わせ種別</InputLabel>
                <Select
                  labelId="inquiryType-label"
                  id="inquiryType"
                  value={inquiryType}
                  onChange={handleInquiryTypeChange}
                  fullWidth
                >
                  <MenuItem value="0">著作権侵害報告</MenuItem>
                  <MenuItem value="1">不具合報告</MenuItem>
                  <MenuItem value="2">悪質なユーザーの報告</MenuItem>
                  <MenuItem value="3">その他</MenuItem>
                </Select>
                {errors.inquiryType && <div>{errors.inquiryType}</div>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="問い合わせ内容"
                multiline
                rows={4}
                value={message}
                onChange={handleMessageChange}
                error={Boolean(errors.message)}
                helperText={errors.message}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" disabled={submitStatus === "sending"}>
                {submitStatus === "sending" ? "送信中..." : "送信"}
              </Button>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={submitStatus === "success"}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          message="送信が完了しました。"
        />
        <Snackbar
          open={submitStatus === "error"}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          message="送信に失敗しました。"
        />
      </div>
    </Layout>
  );
}

export default Home;
