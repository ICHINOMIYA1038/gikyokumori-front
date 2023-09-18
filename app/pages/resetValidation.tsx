import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";
import ResendToken from "@/components/resendToken";

function Home() {
  const router = useRouter();

  return (
    <Layout>
      <div>
        <ResendToken />
      </div>
    </Layout>
  );
}

export default Home;
