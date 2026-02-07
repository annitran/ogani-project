import { Button, Form, Input, Card, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { login, type IUserParam } from "../services/auth"
import { useAuthStore } from "../stores/authStore"
import axios from "axios";

const { Title } = Typography;

export default function LoginPage() {
  const setAuth = useAuthStore((s) => s.setAuth)
  const loading = useAuthStore((s) => s.loading)
  const setLoading = useAuthStore((s) => s.setLoading)
  const navigate = useNavigate();

  const handleLogin = async (values: IUserParam) => {
    try {
      setLoading(true);

      const res = await login(values)
      setAuth(res.data.user, res.data.token)
      console.log("login user:", res.data.user)

      if (res.data.user.role === "admin") {
        navigate("/admin")
      } else {
        navigate("/")
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || 'Login failed')
      } else {
        console.error('Unexpected error', err)
      }
    } finally {
      setLoading(false)
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ width: 400 }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Login
        </Title>

        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={loading}>
            Login
          </Button>

          <div style={{ marginTop: 16, textAlign: "center" }}>
            Don't have an account yet? <Link to="/register">Sign Up</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
