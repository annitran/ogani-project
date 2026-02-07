import { Form, Input, Button, Card, message } from "antd"
import { useNavigate } from "react-router-dom"
import { adminCreateCategory } from "../../../services/admin/category"
import axios from "axios"

export default function CreateCategory() {
  const navigate = useNavigate()

  const onFinish = async (values: { name: string }) => {
    try {
      await adminCreateCategory(values.name)

      message.success("Category created!")

      navigate("/admin/categories")
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || 'Login failed')
      } else {
        console.error('Unexpected error', err)
      }
    }
  }

  return (
    <Card title="Create New Category" style={{ maxWidth: 500, textAlign: "center" }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Category name"
          name="name"
          rules={[
            { required: true, message: "Please enter category name" },
          ]}
        >
          <Input placeholder="Vegetables..." />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Create
        </Button>
      </Form>
    </Card>
  )
}
