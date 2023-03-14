import { useState } from "react";
// import reactLogo from "./assets/react.svg";
import { useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/mobiles"
          element={
            <ProtectedRoute>
              <PhoneList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? (
    <div>
      <h3>This is a protected page</h3>
      {children}
    </div>
  ) : (
    <Navigate replace to="/" />
  );
}

function checkAuth(data) {
  if (data.status === 401) {
    throw Error("unauthorized");
  } else {
    return data.json();
  }
}

function logout() {
  localStorage.clear();
  // localStorage.removeItem("token");
  window.location.href = "/";
  // we cant use useNavigate or Navigate because it is not a component or jsx
}

function PhoneList() {
  const [mobileList, setMobileList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/mobiles", {
      headers: { "x-auth-token": localStorage.getItem("token") },
    })
      .then((data) => checkAuth(data))
      .then((res) => setMobileList(res))
      .catch((err) => logout());
  }, []);

  return (
    <div className="phone-list-container">
      {mobileList.map((mbl, index) => (
        <Phone mobile={mbl} key={index} />
      ))}
    </div>
  );
}
function Phone({ mobile }) {
  return (
    <div className="phone-container">
      <img className="phone-picture" src={mobile.img} alt={mobile.model} />
      <h2 className="phone-name">{mobile.model}</h2>
      <p className="phone-company">{mobile.company}</p>
    </div>
  );
}
export default App;
