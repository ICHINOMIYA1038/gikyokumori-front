import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();

  return (
    <Layout>
      <div className="supportDocument">
        <h2>プレスリリース</h2>
        <h3>バージョン情報</h3>
        <p>2023.7.15, ベータ版を公開しました。</p>
      </div>
    </Layout>
  );
}

export default Home;
