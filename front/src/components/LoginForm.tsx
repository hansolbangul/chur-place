import React from "react";
import { Join } from "./Join";
import { Login } from "./Login";

interface IBool {
  loginOpen: boolean;
  joinOpen: boolean;
  setLoginOpen: (item: boolean) => void;
  setJoinOpen: (item: boolean) => void;
}

export const LoginForm = ({ loginOpen, joinOpen, setLoginOpen, setJoinOpen }: IBool) => {

  return (
    <>
      {loginOpen && <Login setOpen={setLoginOpen} setNext={setJoinOpen} />}
      {joinOpen && <Join setOpen={setJoinOpen} />}
    </>
  )
}