import Layout from "@/components/Layout/Layout";
import LoginForm from "@/components/Form/LoginForm";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();

  return (
    <Layout>
      <div>
        <LoginForm />
      </div>
    </Layout>
  );
}

export default Home;
