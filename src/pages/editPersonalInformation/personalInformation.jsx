import React, { useMemo } from "react";
import ContainerWithBadge from "../../common/containerWithBadge";
import { Form, Input, InputNumber, Radio, Select } from "antd";
import countryList from "react-select-country-list";

const PersonalInformation = () => {
  const countriesList = useMemo(() => countryList().getData(), []);

  return (
    <ContainerWithBadge label={"Personal Information"}>
      <Form.Item
        label={"Title"}
        name={"title"}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={"Given/First Name"}
        name={"firstName"}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label={"Middle Name"} name={"middleName"}>
        <Input />
      </Form.Item>
      <Form.Item
        label={"Family/Last Name"}
        name={"lastName"}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label={"Degree"} name={"degree"}>
        <Input />
      </Form.Item>
      <Form.Item label={"Phone"} name={"phone"}>
        <InputNumber width={100} />
      </Form.Item>
      <Form.Item
        label={"E-mail Address"}
        name={"email"}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="region" label="Country" hasFeedback>
        <Select
          placeholder="select region of submission"
          options={countriesList}
          showSearch
        />
      </Form.Item>
      <Form.Item label={"Gender"} name={"gender"}>
        <Radio.Group defaultValue={0}>
          <Radio value={1}>Male</Radio>
          <Radio value={2}>Female</Radio>
          <Radio value={0}>Prefer not to answer</Radio>
        </Radio.Group>
      </Form.Item>
    </ContainerWithBadge>
  );
};

export default PersonalInformation;
