import React, { useEffect } from "react";

function CommentReplyCard({ comment }: any) {
  return (
    <div className="CommentReplyContainer">
      <hr />
      <div className="CommentUserProfile">
        <img
          src={comment.user_image_url}
          alt="Avatar"
          style={{ width: "80px", height: "80px" }}
        />
        <p>{comment.user.name}</p>
      </div>
      <div className="CommentContents">
        <p>{comment.body}</p>
      </div>
    </div>
  );
}

export default CommentReplyCard;
