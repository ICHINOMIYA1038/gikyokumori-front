import { GetServerSidePropsContext } from "next";
import Cookies from "js-cookie";

export const authUser = async (url: string, context: GetServerSidePropsContext) => {
  const { req } = context;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("uid",  req.cookies["uid"] || "");
  headers.append("client", req.cookies["client"]|| "");
  headers.append("access-token", req.cookies["access-token"] || "");

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVERSIDE_RAILS_API}/${url}`, {
      headers: headers,
    });

    if (!response.ok) {
      // ログインに失敗した場合
      return {
        redirect: { 
          destination: "/Login",
          permanent: false,
        },
      };
    }

    // ログインに成功した場合
    const data = await response.json();
    const result = JSON.stringify(data)

    
    return result;
  } catch (error) {
    // エラーが発生した場合
    return null;
  }
};