import { Button, Form, Input, Card, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { register } from "../services/auth";
import { useAuthStore } from "../stores/authStore";

const { Title } = Typography;

export default function RegisterPage() {
  const navigate = useNavigate();
  const { loading, setLoading } = useAuthStore();

  const handleRegister = async (values: { username: string, password: string }) => {
    try {
      setLoading(true);
      await register(values);
      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || 'Register failed')
      } else {
        console.error('Unexpected error', err)
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card style={{ width: 400 }}>
        <Title level={3} style={{ textAlign: "center" }}>Sign Up</Title>

        <Form layout="vertical" onFinish={handleRegister}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Username is required" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }, { min: 6 }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || value === getFieldValue("password")) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords do not match");
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={loading}>
            Sign Up
          </Button>

          <div style={{ marginTop: 16, textAlign: "center" }}>
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
