import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Main } from "./pages/main/main";
import { Navbar } from "../src/components/navbar";
import { Login } from "./pages/login";
import { ChakraProvider } from "@chakra-ui/react";
import { CreatePost } from "./pages/create-post/create-post";
function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createPost" element={<CreatePost />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </div>
  );
}

export default App;
