import React, { useState } from "react";
// List box
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { persianNumbers } from "../../../Utils/helper/helpers";

const people = [];

const ageGeneration = () => {
  const nowYear = new Date().getFullYear();
  const date = (+nowYear).toString();
  const startY = persianNumbers(date);
  for (let i = +nowYear - 18; i > +nowYear - 50; i--) {
    const dateInit = new Date("August 19, 1975 23:15:30").setFullYear(i);
    const nwD = new Date(dateInit).toLocaleString("fa-IR");
    const obj = { id: i, name: nwD.split("/")[0] };
    people.push(obj);
  }
};

ageGeneration();

const SelectOptions = ({ listArr, state, changeHandler }) => {
  //   const [selectedPerson, setSelectedPerson] = useState(people[0]);

  return (
    <>
      <Listbox value={state} onChange={changeHandler}>
        {({ open }) => (
          <>
            <Listbox.Button
              disabled
              className={`select-main z-0 min-h-[44px] ${
                open && "ring-2 shadow-violet-700 ring-violet-500"
              }  `}
            >
              {state.name}
            </Listbox.Button>
            <Transition
              className={"z-10 customScrollDark"}
              enter="transition duration-100 ease-out"
              enterFrom="transform -translate-y-6 opacity-0"
              enterTo="transform  opacity-100"
              leave="transition  ease-out"
              leaveFrom="transform  opacity-100"
              leaveTo="transform -translate-y-6 opacity-0"
            >
              <Listbox.Options
                className={
                  "bg-white shadow-md rounded-lg px-2 py-1 absolute w-[100%] max-h-[250px] overflow-x-hidden overflow-y-scroll  z-10 customScrollDark"
                }
              >
                {listArr.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    value={person}
                    disabled={person.unavailable}
                    className="navLink flex cursor-pointer justify-center items-center gap-1 rtl "
                  >
                    {({ active, selected }) => (
                      // <li
                      //   className={`${
                      //     active ? "bg-blue-500 text-white" : "bg-white text-black"
                      //   }`}
                      // >
                      <>
                        {person.name}
                        {selected && (
                          <CheckIcon className="w-[18px] h-[18px]" />
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>
    </>
  );
};

export default SelectOptions;
