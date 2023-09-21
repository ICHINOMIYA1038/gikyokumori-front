import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // リクエストからクッキーを取得
  const uid = request.cookies.get("uid")?.value as string | " ";
  const client = request.cookies.get("client")?.value as string| " ";
  const accessToken = request.cookies.get("access-token")?.value as string| " ";

  // APIエンドポイントからユーザー情報を取得
  const apiUrl = `${process.env.NEXT_PUBLIC_RAILS_API}/current_user`;
  const apiResponse = await fetch(apiUrl, {
    headers: {
      // クッキーをリクエストヘッダーに追加
      "uid":uid,
      "client":client,
      "access-token":accessToken,
    },
  });
  const responseData = await apiResponse.json();

  console.log(apiResponse)
  if (responseData.status === "ok") {
    // ユーザー情報が "ok" の場合、そのままレスポンスを返す
    return NextResponse.next();
  } else {
    // ユーザー情報が "ng" の場合、"/Login" にリダイレクト
    return NextResponse.redirect("localhost:8000/Login");
  }
}


// ミドルウェアを特定のルートに適用する
export const config = {
  matcher: '/posts/new',
}