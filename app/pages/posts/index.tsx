import Layout from "@/components/Layout/Layout";
import PostCard from "@/components/Post/PostCard";
import { Pagination } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface Post {
  post_id: number;
  content: string;
  user_id: string;
  title: string;
  synopsis: string;
  catchphrase: string;
  number_of_men: string;
  number_of_women: string;
  total_number_of_people: string;
  playtime: string;
  image_url: string;
  file_url: string;
}

interface HomeProps {
  pagination: any;
  posts: Post[];
}

//Homeコンポーネント
const Home: React.FC<HomeProps> = (props) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [per, setPer] = useState(1);

  const handlePageChange = (event: any, newPage: any) => {
    setPage(newPage);
    router.push(`/posts?page=${newPage}&per=${props.pagination.limit_value}`);
  };

  return (
    <Layout>
      {props.posts.map((post) => (
        <PostCard key={post.post_id} post={post} />
      ))}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Pagination
          count={props.pagination.total_pages} //総ページ数
          color="primary" //ページネーションの色
          onChange={handlePageChange}
          page={props.pagination.current_page} //現在のページ番号
        />
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  try {
    const page = context.query.page || 1; // ページ番号をクエリパラメータから取得、指定がない場合は1
    const per = context.query.per || 4;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RAILS_API}/posts?paged=${page}&per=${per}`,
      { method: "GET" }
    );
    const json = await response.json();

    return {
      props: {
        posts: json.posts,
        pagination: json.pagination,
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
