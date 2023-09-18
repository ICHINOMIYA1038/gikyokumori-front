import UsersForm from "@/components/Form/UsersForm";
import Layout from '@/components/Layout/Layout'
import {auth} from '@/components/auth'

function Home() {
    return (
      <Layout>
      <div>
        <UsersForm/>
      </div>
      </Layout>
    );
  }

export default Home;

export async function getServerSideProps(context: any) {
  
  const result = await auth(context);

  if (!result) {
    console.log("redirect");
    return {
      redirect: {
        permanent: false,
        destination: "/Login",
      },
    };
  }

  return {
    props: {},
  };

};