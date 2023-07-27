import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";

import { signInAnonymously } from "firebase/auth";

import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const signInAnonymouslyHandler = async () => {
    try {
      await signInAnonymously(auth);
      setIsLoggedIn(true);
      setUser(await auth.currentUser);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn]);

  if (user && user.uid) {
    console.log("userID: " + user.uid);
    console.log("userName: " + user.displayName);
  }
  if (user === null && isLoggedIn) {
    console.log("User Logged in but no user login ID");
  }

  return (
    <>
      <Card className="input">
        <h1>Login Anonymously</h1>
        <Button
          className="button"
          onClick={isLoggedIn ? null : signInAnonymouslyHandler}
        >
          Login
        </Button>
      </Card>
    </>
  );
};

export default Login;
