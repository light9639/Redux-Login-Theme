# 🔐 Redux Toolkit으로 색상과 내용을 변환할 수 있는 리덕스 예제 파일입니다.
:octocat: https://light9639.github.io/Redux-Login-Theme/

![light9639 github io_Redux-Login-Theme_](https://user-images.githubusercontent.com/95972251/230261893-b1734062-9427-47cc-9cf3-febf07b7ca59.png)

:sparkles: 🔐 Redux Toolkit으로 색상과 내용을 변환할 수 있는 리덕스 예제 파일입니다. :sparkles:
## :tada: React 생성
- React 생성
```bash
npm create-react-app my-app
# or
yarn create react-app my-app
```

- vite를 이용하여 프로젝트를 생성하려면
```bash
npm create vite@latest
# or
yarn create vite
```
- 터미널에서 실행 후 프로젝트 이름 만든 후 React 선택, Typescirpt 선택하면 생성 완료.
## 🚤 Redux-Toolkit 설치
- Redux-Toolkit 설치 명령어
```bash
npm install redux react-redux @reduxjs/toolkit
# or
yarn add redux react-redux @reduxjs/toolkit
```

## ✒️ main.tsx, App.tsx, User.ts, Theme.ts 수정 및 작성
### :zap: main.tsx
- 리덕스에서 타입 가져오기
- `useDispatch`, `useSelector`에 타입 추가하여 타입 설정
- 리덕스 폴더 features에서 reducer를 가져온 다음 store 변수에 담는다.
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "./features/User";
import themeReducer from "./features/Theme";
import {
  TypedUseSelectorHook,
  useDispatch as _useDispatch,
  useSelector as _useSelector
} from "react-redux";

// 리덕스에서 타입 가져오기
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// useDispatch, useSelector에 타입 추가하여 타입 설정
export const useDispatch: () => AppDispatch = _useDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;

// 리덕스 폴더 features에서 reducer를 가져온 다음 store 변수에 담는다.
const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
```
### :zap: App.tsx
- `Profile`, `Login`, `ChangeColor`을 `import`하여 하단에 넣는다.
```typescript
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Profile from "./components/Profile";
import Login from "./components/Login";
import ChangeColor from "./components/ChangeColor";

export default function App(): JSX.Element {
  return (
    <div className="App">
      <div>
        <a href="https://ko.redux.js.org/introduction/getting-started/" target="_blank">
          <img src="https://camo.githubusercontent.com/7b7f04b16cc2d2d4a32985710e4d640985337a32bbb1e60cdacede2c8a4ae57b/68747470733a2f2f63646e2e776f726c64766563746f726c6f676f2e636f6d2f6c6f676f732f72656475782e737667" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Profile />
      <Login />
      <ChangeColor />
    </div>
  )
}
```
### :zap: User.ts
- 리덕스 툴킷에서 필요한 함수를 `import` 한 뒤 3가지 변수를 입력하면 오브젝트가 변환되도록 만드는 리덕스  생성한다.
```typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StateType1 {
    name: string;
    age: number;
    email: string;
}

const initialStateValue: StateType1 = { name: "", age: 0, email: "" };

export const userSlice = createSlice({
    name: "user",
    initialState: { value: initialStateValue },
    reducers: {
        login: (state, action: PayloadAction<{ name: string; age: number ; email: string }>) => {
            state.value = action.payload;
        },
        logout: (state) => {
            state.value = initialStateValue;
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
```
### :zap: Theme.ts
- 리덕스 툴킷에서 필요한 함수를 `import` 한 뒤 색상을 입력하면 변화하도록 하는  생성한다.
```typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StateType {
    value: string;
}

const initialState: StateType = { value: "" };

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        changeColor: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { changeColor } = themeSlice.actions;

export default themeSlice.reducer;
```
## ✒️ ChangeColor.tsx, Login.tsx, Profile.ts 수정 및작성
### :zap: ChangeColor.tsx
- `input` 안에 데이터가 색상이면 상단 텍스트의 색상을 입력시킨 색상으로 변화시킨다.
```typescript
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
```
### :zap: Login.tsx
- `login`함수 안에 입력한 데이터대로 텍스트를 변환시킨다.
```typescript
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
```
### :zap: Profile.tsx
- `Login.tsx`에서 입력한 데이터가 변환되면 이 데이터값이 변환되도록 만든다.
```typescript
import React from "react";
import { useSelector } from "../main";

export default function Profile(): JSX.Element {
  const user = useSelector((state) => state.user.value);
  const themeColor = useSelector((state) => state.theme.value);

  return (
    <div style={{ color: themeColor }}>
      <h1> Profile Page</h1>
      <p> Name: {user.name} </p>
      <p> Age: {user.age}</p>
      <p> Email: {user.email}</p>
    </div>
  );
}
```
