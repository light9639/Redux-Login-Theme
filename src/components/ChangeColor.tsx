import React, { useState } from "react";
import { useDispatch } from "../main";
import { changeColor } from "../features/Theme";

export default function ChangeColor(): JSX.Element {
  const [color, setColor] = useState<string>("");
  const dispatch = useDispatch();

  return (
    <div>
      <input
        type="text"
        placeholder="색상을 입력하세요."
        onChange={(event) => {
          setColor(event.target.value);
        }}
        style={{
          padding: "10px 15px",
          borderRadius: "7.5px",
          border: "1px solid #ccc",
          marginRight: "15px",
          fontSize: "1rem"
        }}
      />
      <button
        onClick={() => {
          dispatch(changeColor(color));
        }}
      >
        색상 변환
      </button>
    </div>
  );
}
