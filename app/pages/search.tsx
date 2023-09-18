import Layout from "@/components/Layout/Layout";
import SearchForm from "@/components/search";
import { useRouter } from "next/router";
import NewsList from "@/components/NewsList";

interface Post {
  id: number;
  content: string;
}

interface HomeProps {
  posts: Post[];
}

//Homeコンポーネント
const Home: React.FC<HomeProps> = (props: any) => {
  const router = useRouter();

  const handlePageChange = (event: any, newPage: any) => {
    const searchParams = props.query; // 既存のクエリパラメータをコピー

    searchParams.page = newPage; // ページを更新
    searchParams.per = props.pagination.limit_value; // 1ページあたりの件数を維持（もしくは新しい値に更新）

    const queryString = new URLSearchParams(searchParams).toString();
    router.push(`/?${queryString}`);
  };

  return (
    <Layout>
      <div className="main-container">
        <div className="sidebar">
          <SearchForm />
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ query }: any) => {
  try {
    const page = query.page || 1;
    const per = query.per || 8;
    const queryString = new URLSearchParams(query).toString();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVERSIDE_RAILS_API}/search?${queryString}&paged=${page}&per=${per}`,
      { method: "GET" }
    );
    const json = await response.json();

    return {
      props: {
        posts: json.posts,
        pagination: json.pagination,
        query: query,
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
