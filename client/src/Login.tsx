import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Tabs } from 'antd';
// import 'antd/dist/antd.css';

const { TabPane } = Tabs;

function Login({ onLogin }: { onLogin: () => void }): JSX.Element {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  const handleTabChange = (key: string): void => {
    setActiveTab(key);
  };

  const handleLogin = (values: any): void => {
    console.log('Login:', values);
    
    let email = values.email;
    let password = values.password;

    const requestOptions: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    };
    fetch("http://localhost:3001/user/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // Token storage
        document.cookie = `token=${data.data.token}; expires=${new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        )}; path=/`;      
      onLogin();
      navigate("/home");
      });
  };

  const handleRegister = (values: any): void => {
    console.log('Register:', values);
    let name: string = values.name;
    let email: string = values.email;
    let password: string = values.password;

    const requestOptions: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    };
    
    fetch("http://localhost:3001/user/register", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        alert(data.desc + "\nPlease Login!");
        console.log(data);
      });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '40px' }}>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Login" key="login">
          <Form onFinish={handleLogin}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email address!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Register" key="register">
          <Form onFinish={handleRegister}>
          <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: 'Please input your name!' },
                { type: 'string', message: 'Please enter a valid name!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email address!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Login;
