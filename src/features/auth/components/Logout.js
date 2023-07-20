import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, signOutAsync } from "../authSlice";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(signOutAsync());
  });

  // but useEffect run after the render
  // useEffect pela navigate chali jay atle navigate ne delay karvu pade tena mate user
  return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>;
};

export default Logout;
