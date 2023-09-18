import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/Layout/Layout";
import Cookies from "js-cookie";

function ChatRoomPage() {
  const router = useRouter();
  const { id } = router.query;
  const [messages, setMessages] = useState([]);
  const [user_id, setUserID] = useState(null);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    axios
      .post(
        `http://localhost:3000/messages/`,
        { content: message, chat_room_id: id },
        { headers }
      )
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
    if (id) {
      axios
        .get(`http://localhost:3000/chat_rooms/${id}`, { headers })
        .then((response) => {
          setMessages(response.data.messages);
          setUserID(response.data.active_user.user_id);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  return (
    <Layout>
      <h1>Chat Room</h1>
      <div className="chat-container" style={{ padding: "0px 500px" }}>
        {messages.map((message: any) => (
          <div
            key={message.id}
            className={`message-box ${
              message.user_id === user_id ? "my-message" : "other-message"
            }`}
          >
            <p>{message.content}</p>
            <p>{message.username}</p>
            <p>{message.sent_at}</p>
          </div>
        ))}
      </div>

      <div
        className="input-container"
        style={{ display: "flex", marginTop: "20px", padding: "0px 500px" }}
      >
        <textarea
          rows={3} // 複数行表示する行数を指定
          cols={3}
          value={message}
          onChange={(e: any) => setMessage(e.target.value)}
          placeholder="メッセージを入力"
          style={{
            flex: 1,
            marginRight: "10px",
            padding: "5px",
            resize: "none",
          }}
          // インプットボックスの状態を管理するためのステートを追加する必要があります
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "5px 10px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
          // ボタンをクリックしたときにメッセージを送信するハンドラ関数を呼び出す必要があります
        >
          送信
        </button>
      </div>
    </Layout>
  );
}

export default ChatRoomPage;
