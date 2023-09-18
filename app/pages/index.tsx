import Layout from "@/components/Layout/Layout";
import SearchForm from "@/components/search";
import PostCard from "@/components/Post/PostCard";
import { useRouter } from "next/router";
import { Pagination } from "@mui/material";
import NewsList from "@/components/NewsList";
import TopImage from "@/components/Layout/TopImage";
import { useState } from "react";
import SortComponent from "@/components/SortComponent";
import { useQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  content: string;
}

interface HomeProps {
  posts: Post[];
}

interface NewsItemProps {
  date: string;
  category: string;
  title: string;
}

const getNewsData = async (): Promise<any> => {
  const newsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_RAILS_API}/news_items`,
    { method: "GET" }
  );
  return newsResponse.json();
};

const getPosts = async ({ queryKey }: any): Promise<any> => {
  if (queryKey === undefined || queryKey === null) {
    throw new Error("queryKey is undefined or null");
  }

  console.log(queryKey);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RAILS_API}/search?${queryKey}`,
    { method: "GET" }
  );

  return response.json();
};

//Homeコンポーネント
const Home: React.FC<HomeProps> = (props: any) => {
  const queryString = new URLSearchParams(props.query).toString();

  const {
    data: newsdata,
    isLoading,
    // isFetching,
    error,
  } = useQuery({
    queryKey: ["news"],
    queryFn: getNewsData,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    cacheTime: Infinity,
  });

  const {
    data: postdata,
    isLoading: isLoadingPost,
    // isFetching,
    error: errorPost,
  } = useQuery({
    queryKey: [queryString],
    queryFn: getPosts,
    refetchOnWindowFocus: false,
    staleTime: 100 * 60 * 5,
    cacheTime: Infinity,
  });

  const router = useRouter();
  const [sort_by, setSortBy] = useState(0);
  const [sortDirection, setSortDirection] = useState(0);

  const handlePageChange = (event: any, newPage: any) => {
    const searchParams = props.query; // 既存のクエリパラメータをコピー

    searchParams.page = newPage; // ページを更新
    searchParams.per = postdata.pagination.limit_value; // 1ページあたりの件数を維持（もしくは新しい値に更新）
    const queryString = new URLSearchParams(searchParams).toString();

    router.push(`/?${queryString}`);
  };

  const handleSortChange = (sortByValue: any, sortDirectionValue: any) => {
    setSortBy(sortByValue);
    setSortDirection(sortDirectionValue);
  };

  return (
    <Layout>
      <TopImage />
      {!isLoading && <NewsList news={newsdata} />}
      <div className="lg:flex">
        <div className="mx-10 mt-28 lg:sticky lg:top-24 lg:w-1/2 lg:h-192">
          <SearchForm sort_by={sort_by} sortDirection={sortDirection} />
          <SortComponent
            sort_by={sort_by}
            sortDirection={sortDirection}
            onSortChange={handleSortChange}
          />
        </div>
        <div className="mx-10 mt-5 lg:w-1/2">
          <div className="hidden lg:block">
            <SortComponent
              sort_by={sort_by}
              sortDirection={sortDirection}
              onSortChange={handleSortChange}
            />
          </div>
          {postdata &&
            postdata.posts.map((post: { post_id: any }) => (
              <PostCard key={post.post_id} post={post} />
            ))}
        </div>
      </div>

      <div className="justify-center my-10 flex">
        {postdata && (
          <Pagination
            count={postdata.pagination.total_pages} //総ページ数
            color="primary" //ページネーションの色
            onChange={handlePageChange}
            page={postdata.pagination.current_page} //現在のページ番号
          />
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ query }: any) => {
  return {
    props: {
      query: query || [],
    },
  };
};

export default Home;
