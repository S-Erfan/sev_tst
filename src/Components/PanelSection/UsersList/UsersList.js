import Link from "next/link";
import React from "react";
import RowTable from "./RowTable";

const UsersList = ({ list, updater }) => {
  return (
    <div className="container mx-auto px-4 sm:px-12 ">
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs  text-gray-700 uppercase tracking-wider">
                  id
                </th> */}

                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs  text-gray-700 uppercase tracking-wider">
                  نام کاربر
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs  text-gray-700 uppercase tracking-wider">
                  شماره کاربر
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs  text-gray-700 uppercase tracking-wider">
                  مشخصات کاربر
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs  text-gray-700 uppercase tracking-wider">
                  حذف کردن کاربر
                </th>
              </tr>
            </thead>
            <tbody>
              {list.map(item => <RowTable 
                key={item.uuid}
                name={`${item.first_name} ${item.last_name}`} 
                phone={item.phone_number}
                userId={item.uuid}
                updater={updater}
              />)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersList;



