import Layout from "@/components/Layout/Layout";
import axios from "axios";

interface Post {
  id: number;
  content: string;
}

interface HomeProps {
  posts: Post[];
}

//Homeコンポーネント
const Home: React.FC<HomeProps> = (props) => {
  const handleClick = async () => {
    try {
      const axiosInstance = axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_RAILS_API}/api/v1/`,
        timeout: 1000,
        headers: {
          "content-type": "application/json",
        },
      });
      const response = await axiosInstance.post("auth/sign_in", {
        email: "test@example.com",
        password: "password",
      });

      console.log(response);

      return {
        props: {
          posts: [],
        },
      };
    } catch (error) {
      console.error("Error fetching posts:", error);
      return {
        props: {
          posts: [],
        },
      };
    }
    // ここにボタンがクリックされたときの処理を書くことができます
  };
  return (
    <Layout>
      <button onClick={handleClick}>ボタン</button>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  try {
    const axiosInstance = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_SERVERSIDE_RAILS_API}/api/v1/`,
      headers: {
        "content-type": "application/json",
      },
    });
    const response = await axiosInstance.post("auth/sign_in", {
      email: "test@example.com",
      password: "password",
    });

    console.log(response);

    return {
      props: {
        posts: [],
      },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      props: {
        posts: [],
      },
    };
  }
};

export default Home;
