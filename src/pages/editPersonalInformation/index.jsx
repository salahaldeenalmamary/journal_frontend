import { Form, Layout, theme } from "antd";
import React from "react";
import LoginInformation from "./loginInformation";
import PersonalInformation from "./personalInformation";
import InstitutionRelatedInformation from "./institutionRelatedInformation";
import SubmitButton from "../../utils/submitButton";
const { Header, Footer, Sider, Content } = Layout;
const EditPersonalInformation = () => {
  const [form] = Form.useForm();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 12,
      },
      sm: {
        span: 12,
      },
      md: {
        span: 8,
      },
      lg: {
        span: 6,
      },
      xl: {
        span: 6,
      },
      xxl: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 24,
      },
      md: {
        span: 10,
      },
      lg: {
        span: 12,
      },
      xl: {
        span: 12,
      },
      xxl: {
        span: 12,
      },
    },
  };
  const handleFinish = (values) => {
    console.log(values);
  };
  return (
    <div>
      <Layout>
        <Sider
          width="20%"
          style={{
            background: colorBgContainer,
          }}
        >
          Sider
        </Sider>
        <Content className="px-5">
          <Form
            form={form}
            className="mx-5"
            onFinish={handleFinish}
            {...formItemLayout}
          >
            <LoginInformation />
            <PersonalInformation />
            <InstitutionRelatedInformation />
            <Form.Item>
              <SubmitButton form={form}>Save Reviewer</SubmitButton>
              {/* <Button type={"primary"} htmlType="submit"></Button> */}
            </Form.Item>
          </Form>
        </Content>
        <Sider
          width="20%"
          style={{
            background: colorBgContainer,
          }}
        >
          Sider
        </Sider>
      </Layout>
    </div>
  );
};

export default EditPersonalInformation;
