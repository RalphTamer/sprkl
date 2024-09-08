import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./components/Pages/HomePage";
import AddUser from "./components/Pages/AddUser";
import UserProfile from "./components/Pages/UserProfile";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/add" element={<AddUser />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/user" element={<Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
