import React from "react";
import { Form, Input, Button } from "antd";
import "../styles/SignupScreen.css";

const SignupPage = () => {
  const redirectToPage = () => {
    window.location.href = "/";
  };

  const onFinish = async (values) => {
    const { email, password } = values;

    try {
      // const response = await fetch("https://caterorange-bakend.vercel.app/api/signup", {
      const response = await fetch("http://localhost:5001/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Redirect or perform other actions on successful signup
        console.log("Signup successful");
        window.location.href = "/";
      } else {
        const errorMessage = await response.text();
        console.error(`Signup failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <Form onFinish={onFinish}>
      <div className="signup-main">
        <Form.Item
          name="email"
          label="E-mail"
          style={{ textAlign: "left" }}
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
          <Input placeholder="Enter Your Email" style={{ height: "3rem" }} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          style={{ textAlign: "left" }}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            placeholder="Enter Your Password"
            style={{ height: "3rem" }}
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          style={{ textAlign: "left" }}
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Enter Your Password again"
            style={{ height: "3rem" }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
        <span style={{ color: "purple" }}>
          <img src="" alt=""></img>Back to Login Page{" "}
          <Button style={{ height: "2rem" }} onClick={redirectToPage}>
            Click here
          </Button>
        </span>
      </div>
    </Form>
  );
};

export default SignupPage;
