import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";
import PasswordRemakeForm from "@/components/Form/PasswordRemakeForm";

function Home() {
  const router = useRouter();

  return (
    <Layout>
      <div>
        <PasswordRemakeForm />
      </div>
    </Layout>
  );
}

export default Home;
