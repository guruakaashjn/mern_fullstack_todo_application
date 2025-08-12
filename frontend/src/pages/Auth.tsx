/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import AuthForm from "../components/AuthForm";
import { useAppDispatch } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useSignupMutation } from "../store/services/authApi";
import { toast } from "react-toastify";
import { setUser } from "../store/features/authSlice";

type AuthMode = "login" | "signup";

const auth = () => {
  const [
    login,
    {
      data: loginData,
      error: loginError,
      isError: isLoginError,
      isSuccess: isLoginSuccess,
    },
  ] = useLoginMutation();

  const [
    signup,
    {
      data: signupData,
      error: signupError,
      isError: isSignupError,
      isSuccess: isSignupSuccess,
    },
  ] = useSignupMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setFormData({
      email: "",
      password: "",
      name: "",
    });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (authMode === "login") {
      const loginFormData = {
        email: formData.email,
        password: formData.password,
      };

      console.log(loginFormData);
      login(loginFormData);
    } else {
      signup(formData);
    }
  };

  useEffect(() => {
    if (isLoginSuccess) {
      toast(`Login Successful`);

      dispatch(setUser({ type: "auth/login", payload: { data: loginData } }));
      navigate("/");

      return;
    }

    if (isLoginError) {
      console.log("Login Error occured");
      toast(`Error occured while login ${JSON.stringify(loginError)}`);
    }
  }, [isLoginSuccess, isLoginError, loginData, loginError]);

  useEffect(() => {
    if (isSignupSuccess) {
      toast(`Signup Successful`);

      setAuthMode("login");
      return;
    }

    if (isLoginError) {
      console.log("Signup Error occured");
      toast(`Error occured while signup ${JSON.stringify(signupError)}`);
    }
  }, [isSignupSuccess, isSignupError, signupData, signupError]);

  return (
    <>
      <AuthForm
        authMode={authMode}
        setAuthMode={setAuthMode}
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        handleReset={handleReset}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default auth;
