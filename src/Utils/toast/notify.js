import { toast } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';

const notify = (content, status) => {
  if(status === "success"){
    toast.success(content, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Flip,
    });
  }else if(status === "error"){
    toast.error(content, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Flip,
    });
  }
};

export default notify;
