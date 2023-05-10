import { io } from "socket.io-client";
import Footer from "../src/Components/Footer/Footer";
import HeadCustom from "../src/Components/Head/Head";
import Header from "../src/Components/Header/Header";
import RulesSection from "../src/Components/RulesSection/RulesSection";
import SearchSection from "../src/Components/SearchSection/SearchSection";
import { BASE_URL } from "../src/Utils/ApiRoute/apiRoutes";

export default function SearchPage({ userlist }) {
  return (
    <>
      <HeadCustom
        title={"جستجو کاربران"}
        descriptionContent={
          "پیدا کنید و چت کنید و اولین قرار خود را بگذارید/ جستجوی سریع"
        }
      />
      <Header />
      <main className="mb-7 mt-[100px] min-h-[83vh]">
        <SearchSection userlist={userlist} />
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const initSocket = await new io(`${BASE_URL}/home`, {
    reconnection: true,
  });

  await initSocket.emit("home:user_list");

  return {
    props: {
      userlist: await new Promise((resolve) => {
        initSocket.on("home:user_list", (data) => {
          if (data.ok) {
            const { result } = data;
            resolve(result);
          }
        });
      }),
    },
  };
}
