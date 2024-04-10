import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/LoginScreen.css";


const Loginpage = () => {
  const redirectToPage = () => {
    window.location.href = "/signup";
  };
  const redirectToHomePage = () => {
    window.location.href = "/";
  };
  const redirectToForgotPassword = () =>{
    window.location.href = "/forgot-password";
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const onFinish = async () => {
    try {
      setEmail("");
      setPassword("");

      // const response = await axios.post("https://caterorange-bakend.vercel.app/api/login", {
      const response = await axios.post("http://localhost:5001/api/login", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.user.id);
        // localStorage.setItem('id', )
        // console.log(response.data.user.id);
        redirectToHomePage()

        console.log("Login successful");
      } else {
        console.log("Login failed");
        setLoginError(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      // console.log("Login failed");
      // setLoginError(true);
    }
  };
  return (
    <Form onFinish={onFinish}>
      <div className="login-right-inner">
        <span style={{ textAlign: "left", fontSize: "50px" }}>Welcome</span>
        <div>
          {loginError && (
            <div style={{ color: "red", textAlign: "left" }}>
              Login failed. Please check your credentials.
            </div>
          )}
          <Form.Item
            style={{ marginBottom: 0, textAlign: "left" }}
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              type="email"
              placeholder="Company Email"
              style={{ height: "4rem" }}
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            style={{ marginBottom: 0, textAlign: "left" }}
            name="password"
            rules={[
              {
                type: "password",
                message: "The input is not valid Password !",
              },
              {
                required: true,
                message: "Please input your Password !",
              },
            ]}
          >
            <Input.Password
              placeholder="input password"
              style={{ height: "4rem" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
        </div>
        <span
          style={{ textAlign: "left", color: "blue", fontweight: "bolder", cursor: "pointer" }}
          onClick={redirectToForgotPassword}
        >
          Forgot Password ?
        </span>
        <div style={{ textAlign: "right" }}>
          <Button
            style={{ width: "6rem", height: "2.5rem", marginRight: "8px" }}
            onClick={redirectToPage}
          >
            Signup
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "6rem", height: "2.5rem" }}
          >
            Login
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Loginpage;
