import React from "react";
import { useDispatch } from "../main";
import { login, logout } from "../features/User";

export default function Login(): JSX.Element {
  const dispatch = useDispatch();

  return (
    <div style={{ marginBottom: "20px" }}>
      <button
        onClick={() => {
          dispatch(login({ name: "Dong-ho", age: 29, email: "dong963939@gmail.com" }));
        }}
        style={{ marginRight: "15px" }}
      >
        로그인
      </button>

      <button
        onClick={() => {
          dispatch(logout());
        }}
      >
        로그아웃
      </button>
    </div>
  );
}
