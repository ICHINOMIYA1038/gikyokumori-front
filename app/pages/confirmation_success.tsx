import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";

function Home() {
  return (
    <Layout>
      <div>
        <p>認証が完了しました。</p>
      </div>
    </Layout>
  );
}

export default Home;
