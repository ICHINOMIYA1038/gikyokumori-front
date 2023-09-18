import React  from 'react';
import {useState,useRef,useEffect} from 'react';
import { useRouter} from 'next/router';
import { Button,Chip,TextField,Alert } from '@mui/material';
import Cookies from "js-cookie";
import CommentReplyCard from './CommentReplyCard';
import axios from 'axios';




function CommentCard({ comment }:any) {
    const router = useRouter()
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [showReply, setShowReply] = useState(false);
    const [replyInput, setReplyInput] = useState('');
    const [commentInput, setCommentInput] = useState('');
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);

    const handleCommentChange = (e:any) => {
        setCommentInput(e.target.value);
      };
    
      const handleCommentSubmit = () => {
        if(commentInput==""){
          setIsError(true);
          setErrorMessage("コメントを入力してください")
          return;
        }
        const payload = {
          post_id: comment.post_id,
          parent_comment_id: comment.comment_id,
          body: commentInput,
        };

        const headers= {
            "Content-Type": "application/json",
            uid: Cookies.get("uid"),
            client: Cookies.get("client"),
            "access-token": Cookies.get("access-token"),
        }
        axios.post(`${process.env.NEXT_PUBLIC_RAILS_API}/comments`, payload,  { headers })
        .then(() => {
          // 送信成功時の処理
          setCommentInput('');
          router.reload();
        })
        .catch((error:any) => {
          console.log(error)
          // 送信失敗時の処理
          setIsError(true);
          setErrorMessage("エラー");
        });
    };

    const toggleReply = () => {
      setShowReplyForm(!showReplyForm);
    };

    const toggleShowReply = () => {
      setShowReply(!showReply);
    };
      
    const closeReply = () => {
      setShowReply(false);
    };

    const closeReplyForm = () => {
      setShowReplyForm(false);
    };

    return (
        <div className="CommentParentContainer">
        <div className="CommentUserProfile">
            <img src={comment.user_image_url} alt="Avatar" style={{ width: '80px', height: '80px' }} />
            <p>{comment.name}</p>
        </div>
        <div className='CommentContents'>
            <p>{comment.body}</p>
        </div>
        { 
        
        showReply ? (
          <>{
         comment.child_comments.map((child: { post_id: any; }) => (
          <CommentReplyCard key={child.post_id} comment={child} />
        ))}
        <Button className="CloseButton" onClick={closeReply}>閉じる</Button>
         
        </>
        ):  (
          <>{comment.child_comments.length !=0 &&
          <Button onClick={toggleShowReply}>{`${comment.child_comments.length}件の返信を見る`}</Button>
          }
          </>
        )
        
        }
       <hr />
       <div className="CommentInputReplyContainer">
       {
       
       showReplyForm ? (
          <>
            <TextField
              value={commentInput}
              onChange={handleCommentChange}
              label="返信を入力してください"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="contained" onClick={handleCommentSubmit}>送信</Button>
              <Button className="CloseButton" onClick={closeReplyForm}>閉じる</Button>
            </div>
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
          </>
        ) : (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={toggleReply}>返信をする</Button>
          </div>
        )}
      </div>
        </div>
);
}

export default CommentCard;