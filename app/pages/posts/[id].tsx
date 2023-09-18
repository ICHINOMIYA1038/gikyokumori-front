import Layout from "@/components/Layout/Layout";
import { useState } from "react";
import { useRouter } from "next/router";
import React from "react";
import PostCardDetail from "@/components/Post/PostCardDetail";
import CommentCard from "@/components/Comment/CommentCard";
import { Button, TextField, Alert } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import CreateChatRoomButton from "@/components/button/CreateChatRoomButton";

interface Post {
  post_id: string;
  user_id: string;
  content: string;
}

interface UserDetailProps {
  post: Post;
  comments: Comment[];
}

const UserDetail: React.FC<UserDetailProps> = ({ post, comments }) => {
  const router = useRouter();
  const [commentInput, setCommentInput] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const handleCommentChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCommentInput(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (commentInput == "") {
      setIsError(true);
      setErrorMessage("コメントを入力してください");
      return;
    }

    const payload = {
      post_id: post.post_id,
      body: commentInput,
    };

    const headers = {
      "Content-Type": "application/json",
      uid: Cookies.get("uid"),
      client: Cookies.get("client"),
      "access-token": Cookies.get("access-token"),
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_RAILS_API}/comments`, payload, {
        headers,
      })
      .then((response: any) => {
        // 送信成功時の処理
        setCommentInput("");
        router.reload();
      })
      .catch((error: any) => {
        console.log(error);
        // 送信失敗時の処理
        setIsError(true);
        setErrorMessage("不明なエラー");
      });
  };

  if (!post) {
    return <p>該当はありません</p>;
  }
  return (
    <Layout>
      <PostCardDetail post={post} />
      <div className="CommentInputHeaderTitile">
        {comments.length}件のコメント
      </div>
      <div className="CommentInputContainer">
        <TextField
          value={commentInput}
          onChange={handleCommentChange}
          label="コメントを入力してください"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
        />
        <Button variant="contained" onClick={handleCommentSubmit}>
          送信
        </Button>
        {isError && (
          <Alert
            style={{ width: "70%", display: "box", margin: "10px auto" }}
            onClose={() => {
              setIsError(false);
              setErrorMessage("");
            }}
            severity="error"
          >
            {errorMessage}
          </Alert>
        )}
      </div>
      {comments &&
        comments.map((comment: any) => (
          <CommentCard key={post.post_id} comment={comment} />
        ))}
      <CreateChatRoomButton user_ids={[post.user_id]} />
    </Layout>
  );
};
export async function getServerSideProps(context: { params: any }) {
  const id = context.params.id;
  // APIを使用してユーザーのデータを取得する処理
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVERSIDE_RAILS_API}/posts/${id}`,
    { method: "GET" }
  );
  const data = await response.json();
  const post = data;

  const commentResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVERSIDE_RAILS_API}/posts/${id}/comments/parent`,
    { method: "GET" }
  );
  const commentData = await commentResponse.json();
  const comments = commentData;

  return {
    props: {
      post,
      comments,
    },
  };
}

export default UserDetail;
