import HeadCustom from "../../src/Components/Head/Head";
import Header from "../../src/Components/Header/Header";
import BlogsSection from "../../src/Components/BlogsSection/BlogsSection";
import Footer from "../../src/Components/Footer/Footer";
import callApi from "../../src/Utils/callApi/callApi";
import { GET_ALL_BLOG } from "../../src/Utils/ApiRoute/apiRoutes";

export default function Blogs({ blogs }) {
  return (
    <>
      <HeadCustom title={"بلاگ ها"} descriptionContent={"بلاگ های سوین"} />
      <Header />
      <main className="mb-7 mt-[100px] fullScreen">
        <BlogsSection blogs={blogs} />
      </main>
      <Footer />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { data, status } = await callApi(GET_ALL_BLOG, false, "{}", "get");

  return {
    props: {
      blogs: data.result,
    },
  };
};
