import React, { useState } from "react";
import Layout from "@/components/Layout/Layout";
import { GetServerSidePropsContext } from "next";
import { authUser } from "@/components/authUsers";
import PostCard from "@/components/Post/PostCard";

function Home({ posts, redirectDestination }: any) {
  return (
    <Layout>
      <div style={{ textAlign: "center" }}>
        <h2>お気に入り</h2>
        <div>
          {!posts && (
            <div style={{ textAlign: "center" }}>
              お気に入りに登録されている記事はありません。
            </div>
          )}
          {posts &&
            posts.map((post: any) => (
              <PostCard key={post.post_id} post={post} />
            ))}
          <div className="grid-container"></div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const response = await authUser("favo", context);
  function isRedirect(
    response: any
  ): response is { redirect: { destination: string; permanent: boolean } } {
    return response && typeof response === "object" && "redirect" in response;
  }

  if (isRedirect(response)) {
    return {
      redirect: {
        permanent: false, // 永続的なリダイレクトかどうか
        destination: "/Login?error=NeedtoLogin", // リダイレクト先

        // destination: 'https://example.com/' // 別サイトでも指定可能
      },
    };
  }

  console.log(response);
  const result = JSON.parse(response as string);
  return {
    props: {
      posts: result.posts,
    },
  };
}

export default Home;
