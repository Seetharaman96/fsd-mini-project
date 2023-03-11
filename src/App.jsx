import { useState } from "react";
// import reactLogo from "./assets/react.svg";
import { useEffect } from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <PhoneList />
    </div>
  );
}
function PhoneList() {
  const [mobileList, setMobileList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/mobiles")
      .then((data) => data.json())
      .then((res) => setMobileList(res));
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
