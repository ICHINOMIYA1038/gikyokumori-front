import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";
import SignUpForm from "@/components/Form/SignUpForm";

function Home() {
  const router = useRouter();

  return (
    <Layout>
      <div>
        <SignUpForm />
      </div>
    </Layout>
  );
}

export default Home;
