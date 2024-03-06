import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/homepage/Homepage";
import SignUpPage from "./components/signup/SignUpPage";
import PostPage from "./components/posts/PostPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/posts" element={<PostPage />} />
        </Routes>
      </BrowserRouter>

      {/* <SignUpPage /> */}
    </>
  );
}

export default App;
