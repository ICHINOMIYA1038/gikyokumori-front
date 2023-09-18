import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteButton from "./Delete";

function Card({ user }: any) {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(true);
  };
  const handleMouseUp = () => {
    setIsClicked(false);
    router.push(`/users/${user.user_id}`);
  };
  const handleMouseOut = () => {
    setIsClicked(false);
  };

  const endpointUrl = `${process.env.NEXT_PUBLIC_RAILS_API}/users`;

  return (
    <div className={`card ${isClicked ? "clicked" : ""}`}>
      <div className="icon_area">
        <DeleteButton
          tableName="users"
          primaryColumnName="user_id"
          id={user.user_id}
          endpointUrl={endpointUrl}
        />
        <span className="icon_text"></span>
      </div>

      <div
        onMouseDown={handleClick}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
      >
        <p>
          id: <span className="card-info">{user.user_id}</span>
        </p>
        <p>
          Name: <span className="card-info">{user.name}</span>
        </p>
        <p>
          Email: <span className="card-info">{user.email}</span>
        </p>
      </div>
    </div>
  );
}

export default Card;
