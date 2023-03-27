import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import PostSide from "../components/PostSide/PostSide";
import ProfileSide from "../components/profileSide/ProfileSide";
import RightSide from "../components/RightSide/RightSide";
import "./Home.css";
import decode from "jwt-decode"
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../actions/AuthActions";

const Home = () => {

  const authInfo = useSelector((state) => state.authReducer.authData);
  const token = authInfo?.token
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  useEffect(() => {
    if(token){
      const decodedToken = decode(token)
      if(decodedToken.exp * 1000 < new Date().getTime()){
        alert("Session Expired")
        handleLogout()
      }
    }
  }, [location])

  const handleLogout = () =>{
    dispatch(logout())
    navigate("/")
  }

  return (
    <div className="Home">
      <ProfileSide/>
      <PostSide />
      <RightSide />
    </div>
  );
};

export default Home;
