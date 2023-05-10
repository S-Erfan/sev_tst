import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

const MenuAcc = ({ btnMenu, menuItems, classBase }) => {
  return (
    <Menu placement="bottom-start">
      <MenuHandler>{btnMenu}</MenuHandler>
      <MenuList className={classBase ? classBase : ""}>
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={item[1]}>{item[0]}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default MenuAcc;
