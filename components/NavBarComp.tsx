import React from "react";
import { useStateContext, AppContextInterface } from "../pages/_app";
import PrimarySearchAppBar from "./Navbar";

interface NavBarCompProps {}

const NavBarComp: React.FC<NavBarCompProps> = ({}) => {
  const { search, searchChange, request } =
    useStateContext() as AppContextInterface;
  return (
    <div>
      <PrimarySearchAppBar
        search={search}
        searchChange={searchChange}
        request={request}
      />
    </div>
  );
};

export default NavBarComp;
