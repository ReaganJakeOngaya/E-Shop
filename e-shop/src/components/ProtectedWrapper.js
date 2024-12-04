import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
// import Navbar from "./Components/Navbar";

const ProtectedWrapper = () => {
  const navigate = useNavigate();

    useEffect(() => {
  if (!localStorage.getItem('token') || !localStorage.getItem('user')) {
    navigate("/");
  }
}, [navigate]);

  return (
    <div className="px-14">
      <div className="flex">
      <Navbar />
      </div>
    </div>
  );
};

export default ProtectedWrapper;