import { Button, Form, Input, Card, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    // tạm thời chỉ log & redirect
    console.log("Login values:", values);
    navigate("/");
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

          <Button type="primary" htmlType="submit" block>
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
