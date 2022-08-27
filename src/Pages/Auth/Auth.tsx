import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Login } from "./components";

export const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      navigate('/home');
    }
  }, []);
  
  return (
    <div className="main__auth">
      <Login />
    </div>
  );
};
