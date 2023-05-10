import { Provider } from "react-redux";
import { store } from "../src/Redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import HeadCustom from "../src/Components/Head/Head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <HeadCustom
        title={"صفحه اصلی سوین | دوستیابی سوین"}
        descriptionContent={
          "صفحه اصلی سوین | دوستیابی سوین | دوست یابی سوین یه شما کمک می کند با هر کسی که علاقه مند هستید چت کنید در محیط ساده و قوی دوستان جدیدی پیدا کنید"
        }
      />
      <Provider store={store}>
        <ThemeProvider>
          <Component {...pageProps} />
          <ToastContainer rtl toastClassName={{ fontFamily: "vazir" }} />
        </ThemeProvider>
      </Provider>
    </>
  );
}
