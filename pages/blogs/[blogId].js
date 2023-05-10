import HeadCustom from "../../src/Components/Head/Head";
import Header from "../../src/Components/Header/Header";
import Footer from "../../src/Components/Footer/Footer";
import { useRouter } from "next/router";
import BlogDetail from "../../src/Components/BlogDetail/BlogDetail";

import coverBlog from "../../public/images/untitled folder 3/user-4.jpg";
import LatestBlogs from "../../src/Components/LatestBlogs/LatestBlogs";
import callApi from "../../src/Utils/callApi/callApi";
import { GET_BLOG_ID } from "../../src/Utils/ApiRoute/apiRoutes";

const blogInfo = {
  id: 1,
  title: "لورم ایپسوم لورم ایپسوم",
  desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
};

export default function BlogId({ contentBlog }) {
  const { blogId } = useRouter().query;
  return (
    <>
      <HeadCustom
        title={`${contentBlog.blog.title} `}
        descriptionContent={contentBlog.blog.content}
      />
      <Header />
      <main className="mb-7 mt-[100px]">
        <BlogDetail
          title={contentBlog.blog.title}
          img={contentBlog.blog.id}
          description={contentBlog.blog.content}
        />
        <LatestBlogs blogs={contentBlog.similar} />
      </main>
      <Footer />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { blogId } = context.params;
  const { data, status } = await callApi(
    GET_BLOG_ID + blogId,
    false,
    "{}",
    "get"
  );

  return {
    props: {
      contentBlog: data.result,
    },
  };
};
