import React from "react";
import ContainerWithBadge from "../../common/containerWithBadge";
import { Button, Form, Input, Space } from "antd";

const LoginInformation = () => {
  return (
    <ContainerWithBadge label={"Login Information"}>
      <Form.Item label="Username">
        <Space align="center">
          <Form.Item
            name={"username"}
            noStyle
            rules={[
              {
                required: true,
                message: "city is required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Button type="link">information</Button>
        </Space>
      </Form.Item>
      <Form.Item
        label="password"
        rules={[
          {
            required: true,
            message: "password is required",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        rules={[
          {
            required: true,
            message: "Confirm Password is required",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
    </ContainerWithBadge>
  );
};

export default LoginInformation;
