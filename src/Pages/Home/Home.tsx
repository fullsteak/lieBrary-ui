import React from "react";
import { Outlet } from "react-router-dom";
import AlertDialog from "../../common/components/AlertDialog";
import Menu from "../../common/components/Menu";
import "../assets/css/home.css";

export const Home = () => {
  return (
    <>
      <Menu />
      <div className="home">
        <div className="home__content">
          <Outlet />
        </div>
      </div>
    </>
  );
};
