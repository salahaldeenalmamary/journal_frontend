import React, { useEffect, useRef } from "react";
import { Form, Input, Modal } from "antd";
import SubmitButton from "../../utils/submitButton";
// import { Modal } from "react-bootstrap";
// reset form fields when modal is form, closed
const useSetFormOnCloseAndOpenModal = ({ form, open, current }) => {
  const prevOpenRef = useRef();
  useEffect(() => {
    prevOpenRef.current = open;
  }, [open]);
  const prevOpen = prevOpenRef.current;
  useEffect(() => {
    if (!open && prevOpen) {
      console.log("open: ", open);
      console.log("prevOpen: ", prevOpen);
      form.resetFields();
    } else {
      form.setFieldsValue(current);
    }
  }, [form, prevOpen, open]);
};

const ReviewerFormModal = ({
  onCloseModal,
  showModal,
  onFinish,
  currentReviewer,
}) => {
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
        span: 8,
      },
      xl: {
        span: 8,
      },
      xxl: {
        span: 8,
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
        span: 8,
      },
      xl: {
        span: 8,
      },
      xxl: {
        span: 8,
      },
    },
  };
  const [form] = Form.useForm();
  useSetFormOnCloseAndOpenModal({
    form,
    open: showModal,
    current: currentReviewer,
  });
  const onOk = () => {
    form.submit();
  };

  return (
    <Modal
      title="Add/Update Reviewer"
      size="lg"
      open={showModal}
      onCancel={onCloseModal}
      onOk={onOk}
      okText={"Save Reviewer"}
    >
      <Form form={form} size="small" onFinish={onFinish} {...formItemLayout}>
        <Form.Item
          label="Given/First Name"
          name="firstName"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Middle Name" name="middleName">
          <Input />
        </Form.Item>

        <Form.Item
          label="Family/Last Name"
          name="lastName"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Degree" name="degree">
          <Input />
        </Form.Item>

        <Form.Item label="Position" name="position">
          <Input />
        </Form.Item>

        <Form.Item
          label="Institution"
          name="university"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Department" name="department">
          <Input />
        </Form.Item>

        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Reason" name="reason">
          <Input.TextArea allowClear showCount rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReviewerFormModal;
