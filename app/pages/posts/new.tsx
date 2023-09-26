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
  const [formData, setFormData] = useState<FormData>(initialFormData);

  return (
    <Layout>
      <div className="lg:flex justify-center">
        <div className="m-10">
          <PostsForm formData={formData} setFormData={setFormData} />
        </div>
        {/* PostCardEditコンポーネントの内容 */}
        <PostCardEdit post={formData} setFormData={setFormData} />
      </div>
    </Layout>
  );
}

export default Home;
