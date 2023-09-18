import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useState } from "react";

function CreateChatRoomButton({ user_ids }: any) {
  const [formData, setFormData] = useState({ credit: "" });
  const router = useRouter();

  const clickButton = async () => {
    const URL = `${process.env.NEXT_PUBLIC_RAILS_API}/chat_rooms`;
    const response = await axios.post(
      URL,
      { user_ids: user_ids },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          uid: Cookies.get("uid"),
          client: Cookies.get("client"),
          "access-token": Cookies.get("access-token"),
        },
      }
    );
    router.push(`/chat-room/${response.data.chat_room.id}`);

    console.log(response);
  };

  return (
    <div>
      <button onClick={clickButton}>チャットを開始する。</button>
    </div>
  );
}

export default CreateChatRoomButton;
