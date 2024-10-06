import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../../config";

import AuthImage from "../images/auth-image.jpg";
import PasswordToggle from "./component/PasswordToggle";
import LogoMkp from "../images/logo-mkp.png";
import BgSign from "../images/bg-signin.jpg";
import login1 from "../images/login1.jpg";
import TextFieldGlobal from "../components/TextFieldGlobal";
import TextFieldPassword from "../components/TextFieldPassword";

function Signin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    const encryptedPassword = btoa(password);

    try {
      const response = await fetch(`${config.api_auth}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jUser: username,
          jPass: encryptedPassword,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        const accessToken = data.result.token;
        const fullName = data.result.user.fullName;
        const roleName = data.result.user.roleName;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("fullName", fullName);
        localStorage.setItem("roleName", roleName);
        setLoggedIn(true);
        navigate("/");
      } else {
        console.log(
          "Sign In Failed. Please check your credentials and try again."
        );
        // Tambahan: Cetak respons dari server ke konsol
        const errorResponse = await response.text();
        console.log("Respons dari server:", errorResponse);
        console.log();
        setErrorMessage(
          "Sign In Failed. Please check your credentials and try again."
        );
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      setErrorMessage("An error occurred during login.");
    }
  };

  // const checkToken = async () => {
  //   const accessToken = localStorage.getItem("accessToken");

  //   if (accessToken) {
  //     const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
  //     const expirationTime = decodedToken.exp * 1000;

  //     if (expirationTime < Date.now()) {
  //       try {
  //         const response = await fetch(`${config.api_auth}/refresh_token`, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         });

  //         if (response.ok) {
  //           const data = await response.json();
  //           const newAccessToken = data.result.token;
  //           localStorage.setItem("accessToken", newAccessToken);
  //           setLoggedIn(true);
  //         } else {
  //           console.log("Refresh token failed");
  //         }
  //       } catch (error) {
  //         console.error("An error occurred during token refresh:", error);
  //       }
  //     } else {
  //       setLoggedIn(true);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   checkToken();
  // }, []);

  return (
    <main
      className=" flex flex-col justify-center items-center min-h-screen"
      style={{ backgroundImage: `url(${login1})`, backgroundSize: "cover" }}>
      {/* START CARD */}
      <div className="flex md:flex justify-start items-center min-h-screen">
        <div className="flex justify-center items-center">
          <div className="bg-white bg-opacity-50 px-6 py-4 rounded-xl">
            {/* Form Login */}
            <div className="w-full mx-auto">
              {/* Logo */}
              <div className="flex-1 mb-10 ">
                <div className="flex items-center h-50 px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center mt-7">
                    <img
                      src={LogoMkp}
                      alt="Logo MKP"
                      width={"55"}
                      height={"55"}
                    />
                    <div className="ml-2">
                      <h3 className="text-small text-slate-20 font-bold text-black mb-0">
                        MKP Management System
                      </h3>
                      <h1 className="text-[10px] text-black">
                        The Most Reliable Traffic Intelligence Company
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              {/* End of Logo */}
              <form onSubmit={login}>
                <div className="space-y-4">
                  <div className="px-5 text-black">
                    <TextFieldGlobal
                      label="Username"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="px-5">
                    <TextFieldPassword
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                {/* <Link className="w-full btn bg-primary text-white mt-3" to="/">
                  Masuk
                </Link> */}
                <div className="px-5 mt-5">
                  <button
                    type="submit"
                    className="w-full btn bg-primary text-white mt-3">
                    Sign In
                  </button>
                </div>
              </form>
              {loggedIn}
              <div className="text-sm text-center">
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              </div>
              <div className="pt-0 mt-3 mb-5">
                <div className="text-sm text-center text-black">
                  Don't have an account yet?{" "}
                  <Link
                    className="font-bold text-blue-900 hover:text-blue-500"
                    to="/signup">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END CARD */}
    </main>
  );
}

export default Signin;
