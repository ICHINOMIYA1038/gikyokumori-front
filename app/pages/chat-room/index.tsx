import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/Layout/Layout";
import Cookies from "js-cookie";

function ChatRoomPage() {
  const router = useRouter();
  const [chat_rooms, setRooms] = useState([]);
  const [chat_rooms_list, setRoomsList] = useState([]);
  const [user_id, setUserID] = useState(null);
  const sendMessage = () => {
    axios
      .post(`http://localhost:3000/messages/`, { headers })
      .then((response) => {
        router.reload();
      })
      .catch((error) => console.error(error));
  };
  const headers = {
    "Content-Type": "application/json",
    uid: Cookies.get("uid"),
    client: Cookies.get("client"),
    "access-token": Cookies.get("access-token"),
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/chat_rooms/`, { headers })
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    // 任意の整数
    const user_id_to_exclude = 54;

    // chat_roomsのコピーを作成し、user_id_to_excludeを持つユーザーを除外
    const filtered_chat_rooms: any = chat_rooms.map((chat_room: any) => ({
      ...chat_room,
      users: chat_room.users.filter(
        (user: any) => user.user_id !== user_id_to_exclude
      ),
    }));

    // 新しいchat_roomsをセット
    setRoomsList(filtered_chat_rooms);
  }, [chat_rooms]);

  return (
    <Layout>
      <h1 className="text-2xl">ダイレクトメール</h1>
      <div
        className="chatroom-main-container"
        style={{ width: "500px", margin: "0 auto" }}
      >
        <div className="chatroom-list-container">
          {chat_rooms_list.map((room: any) => (
            <div
              className="chatroom-elem-container"
              key={room.id}
              onClick={() => {
                router.push(`/chat-room/${room.id}`);
              }}
            >
              <p>{room.name}</p>
              {room.users.map((user: any) =>
                user.user_id === user_id ? null : (
                  <div key={user.user_id} className="round-icon">
                    <img
                      src={user.image_url}
                      width="50px"
                      height="50px"
                      alt="Round Icon"
                    />
                    <p>{user.user_id}</p>
                    <p>{user.name}</p>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ChatRoomPage;
