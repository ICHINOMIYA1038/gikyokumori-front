import Layout from "@/components/Layout/Layout";
import PostsForm from "@/components/Form/PostsForm";
import Cookies from "js-cookie";
import router from "next/router";
import PostCardEdit from "@/components/Post/PostCardEdit";
import React, {
  useEffect,
  useState,
  FC,
  Dispatch,
  SetStateAction,
} from "react";
import { FormData } from "@/components/types/type";

const initialFormData: FormData = {
  title: "",
  catchphrase: "",
  number_of_men: 0,
  number_of_women: 0,
  total_number_of_people: 0,
  playtime: "",
  pdfFile: null,
  image: null,
  user_image_url: "",
  tags: [],
  fee: "",
  feeText: "",
  credit: "",
  creditText: "",
  contact: "",
  contactText: "",
  modification: "",
  modificationText: "",
  condition: "",
  conditionText: "",
};

function Home() {
  const [user_id, setUser_id] = useState("");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (Cookies.get("uid")) {
    headers["uid"] = Cookies.get("uid") || "";
  }

  if (Cookies.get("client")) {
    headers["client"] = Cookies.get("client") || "";
  }

  if (Cookies.get("access-token")) {
    headers["access-token"] = Cookies.get("access-token") || "";
  }
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_RAILS_API}/current_user`, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setFormData((prevData) => ({
          ...prevData,
          user_image_url: data.user.image_url,
        }));
        if (data.status === "ng") {
          //Loginにリダイレクト
          router.push("/Login");
        } else {
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  return (
    <Layout>
      <div className="lg:flex">
        <div>
          <PostsForm formData={formData} setFormData={setFormData} />
        </div>
        {/* PostCardEditコンポーネントの内容 */}
        <PostCardEdit post={formData} setFormData={setFormData} />
      </div>
    </Layout>
  );
}

export default Home;
