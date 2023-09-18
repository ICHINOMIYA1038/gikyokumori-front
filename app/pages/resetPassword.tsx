import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";
import ResetPasswordForm from "@/components/Form/ResetPasswordForm";

function Home() {
  const router = useRouter();

  return (
    <Layout>
      <div>
        <ResetPasswordForm />
      </div>
    </Layout>
  );
}

export default Home;
