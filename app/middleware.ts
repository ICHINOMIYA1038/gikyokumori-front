import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // リクエストからクッキーを取得
  const existingCookie = request.cookies.get("myCookie");

  if (existingCookie) {
    console.log("Existing Cookie:", existingCookie);
  } else {
    console.log("No Existing Cookie");
  }

  // すべてのクッキーを取得
  const allCookies = request.cookies.getAll();
  console.log("All Cookies:", allCookies);

  // 新しいクッキーを設定
  const response = NextResponse.next();
  response.cookies.set("newCookie", "Hello, Cookie!", { path: "/" });

  // 特定のクッキーが存在するか確認
  const hasCookie = request.cookies.has("myCookie");
  console.log("Has myCookie:", hasCookie);

  // 特定のクッキーを削除
  request.cookies.delete("myCookie");

  // 削除後に再度確認
  const hasCookieAfterDeletion = request.cookies.has("myCookie");
  console.log("Has myCookie after deletion:", hasCookieAfterDeletion);

  // すべてのクッキーを削除
  request.cookies.clear();

  // レスポンスを返す
  return response;
}
