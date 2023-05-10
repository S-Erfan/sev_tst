import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const UserNavigate = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      <Link href="/profile" className="w-fit h-fit text-neutral-700 no-underline " >
        <div className="flex gap-2">
          <span>
            {user.info.firstName} {user.info.lastName}
          </span>
          <div className="w-[25px] h-[25px]">
            <UserIcon className="w-[25px] h-[25px]" />
          </div>
        </div>
      </Link>
    </>
  );
};

export default UserNavigate;
