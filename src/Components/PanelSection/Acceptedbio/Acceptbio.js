import React from "react";
import TableRow from "./TableRow";

const Acceptbio = ({ list, updater }) => {
  return (
    <>
      <div className="container mx-auto px-4 sm:px-12">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs  text-gray-700 uppercase tracking-wider">
                    id
                  </th>

                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs  text-gray-700 uppercase tracking-wider">
                    بیوگرافی
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs  text-gray-700 uppercase tracking-wider">
                    تایید بیو
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-xs  text-gray-700 uppercase tracking-wider">
                    رد کردن بیو
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map((item) => (
                  <TableRow
                    key={item.uuid}
                    id={item.uuid}
                    name={item.first_name}
                    lName={item.last_name}
                    bio={item.bio}
                    updater={updater}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Acceptbio;
