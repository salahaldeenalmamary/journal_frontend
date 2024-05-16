import React from "react";
import ContainerWithBadge from "../../common/containerWithBadge";
import { Form, Input, Radio, Space } from "antd";

const InstitutionRelatedInformation = () => {
  return (
    <ContainerWithBadge label={"Institution Related Information"}>
      <Form.Item label={"Position"} name={"position"}>
        <Input />
      </Form.Item>
      <Form.Item
        label={"Institution"}
        name={"university"}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={"Department"}
        name={"department"}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Address">
        <Space.Compact>
          <Form.Item
            name={["address", "city"]}
            noStyle
            rules={[
              {
                required: true,
                message: "city is required",
              },
            ]}
          >
            <Input placeholder="Input city" />
          </Form.Item>
          <Form.Item
            name={["address", "region"]}
            noStyle
            rules={[
              {
                required: true,
                message: "region is required",
              },
            ]}
          >
            <Input placeholder="Input region" />
          </Form.Item>
          <Form.Item
            name={["address", "street"]}
            noStyle
            rules={[
              {
                required: true,
                message: "street is required",
              },
            ]}
          >
            <Input placeholder="Input street" />
          </Form.Item>
        </Space.Compact>
        <Form.Item name={["address", "extraDetails"]}>
          <Input.TextArea
            rows={3}
            showCount
            allowClear
            placeholder="Extra Details"
          />
        </Form.Item>
      </Form.Item>
      <Form.Item
        label={"Available as Reviewer?"}
        colon={false}
        name={"IsAcceptToBeReviewer"}
        rules={[
          {
            required: true,
            message: "answer is required",
          },
        ]}
      >
        <Radio.Group>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Form.Item>
    </ContainerWithBadge>
  );
};

export default InstitutionRelatedInformation;
