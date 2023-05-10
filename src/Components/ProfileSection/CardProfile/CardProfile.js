import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { TrashIcon } from "@heroicons/react/24/outline";
import notify from "../../../Utils/toast/notify";
import callApi from "../../../Utils/callApi/callApi";
import { DELETE_PROFILE_IMAGE } from "../../../Utils/ApiRoute/apiRoutes";
import { useState } from "react";

const DivCustom = styled.div`
  position: relative;
  transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
  height: 100%;
  width: 100%;
  .trash {
    transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
    position: absolute;
    bottom: -5rem;
    left: 50%;
    z-index: 2;
    transform: translateX(-50%);
    cursor: pointer;
  }
  :hover {
    opacity: 0.8;
    .trash {
      bottom: 1rem;
    }
  }

  @media (max-width: 768px) {
    .trash {
      bottom: 1rem;
    }
  }
`;

const CardProfile = ({ src, id, updateProfile, deletedAdmin = false }) => {
  const [loader, setLoader] = useState(false);

  const deletedImage = async () => {
    setLoader(true);
    if (deletedAdmin === false) {
      const { data, status } = await callApi(
        DELETE_PROFILE_IMAGE + id,
        true,
        "{}",
        "get"
      );
      data.ok ? notify(data.message, "success") : notify(data.message, "error");
      updateProfile();
    } else {
      notify("ادمین حذف کنه" + id, "success");
      deletedAdmin();
    }
    setLoader(false);
  };

  return (
    <>
      <DivCustom>
        <Image
          src={src}
          alt="profile image user"
          className="w-full h-full object-cover "
          width={400}
          height={400}
        />
        <span className="trash" onClick={deletedImage}>
          <TrashIcon className="w-[50px] h-[50px] text-red-600 " />
        </span>
      </DivCustom>
    </>
  );
};

export default CardProfile;
