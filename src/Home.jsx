import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Home() {
  return (
    <div>
      <h1>Hello all, Welcome to Seetha Mobiles App</h1>
      <LoginForm />
    </div>
  );
}

function LoginForm() {
  const [formState, setFormState] = useState("success");
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: { userName: "Seetharaman", password: "password@123" },
    onSubmit: async (values) => {
      console.log(values);
      const data = await fetch("http://localhost:4000/users/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(values),
      });
      if (data.status === 401) {
        setFormState("error");
        console.log("error");
      } else {
        setFormState("success");
        const result = await data.json();
        console.log(result);
        localStorage.setItem("token", result.token);
        navigate("/mobiles");
      }
    },
  });
  return (
    <form onSubmit={handleSubmit} className="form-login">
      <h3>Login page</h3>
      <div className="form-login-container">
        <TextField
          value={values.userName}
          name="userName"
          onChange={handleChange}
          label="UserName"
          variant="outlined"
        />
        <TextField
          value={values.password}
          name="password"
          onChange={handleChange}
          label="Password"
          variant="outlined"
        />
        <Button color={formState} type="submit" variant="contained">
          {formState === "success" ? "Submit" : "Retry"}
        </Button>
      </div>
    </form>
  );
}
