// lib/auth.tsx
import Cookies from "js-cookie";

export const auth= async (context: { req: any; res: any; }) =>{
    const { req, res } = context;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("uid", Cookies.get("uid") || "");
    headers.append("client", Cookies.get("client") || "");
    headers.append("access-token", Cookies.get("access-token") || "");

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVERSIDE_RAILS_API}/api/v1/auth/validate_token`, {
      headers: headers,
    });
    if (!response.ok && response.status === 401) {
      return new Promise<Boolean>((resolve) => {
        resolve(false);
      });
      };
    
    if (response.status === 500) {
      return new Promise<Boolean>((resolve) => {
        resolve(false);
      });
    }
    else{
      return new Promise<Boolean>((resolve) => {
        resolve(true);
      });
    }
  };

  export const signout=async(context: { req: any; res: any; }) =>{
    const { req, res } = context;
    const response = await fetch(`${process.env.NEXT_PUBLIC_RAILS_API}/api/v1/auth/sign_out`, {
      headers: {
        "Content-Type": "application/json",
        uid: req.cookies["uid"],
        client: req.cookies["client"],
        "access-token": req.cookies["access-token"],
      },
   })
  }