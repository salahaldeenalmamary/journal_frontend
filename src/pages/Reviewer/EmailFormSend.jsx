import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Card, Input, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { setFormData } from '../../store/entities/emailSlice';

const { TextArea } = Input;

const EmailFormSend = () => {
  const dispatch = useDispatch();
  const formData =useSelector((state) => state.entities.Email);;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };

  const handleFileChange = (info) => {
    const file = info.fileList[0]?.originFileObj;
    dispatch(setFormData({ attachment: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form data submitted:', formData);
    // You can add your logic to send an email or perform other actions
  };

  return (
    <Card title="Send Email Notification">
      <Form onSubmit={handleSubmit} encType="multipart/form-data" className="p-4">
        <Form.Item label="From:" required>
          <Input type="text" name="from" value={formData.from} onChange={handleChange} />
        </Form.Item>

        <Form.Item label="To:" required>
          <Input type="text" name="to" value={formData.to} onChange={handleChange} />
        </Form.Item>

        <Form.Item label="Letter Purpose:" required>
          <Input type="text" name="purpose" value={formData.purpose} onChange={handleChange} />
        </Form.Item>

        <Form.Item label="Letter Subject:" required>
          <Input type="text" name="subject" value={formData.subject} onChange={handleChange} />
        </Form.Item>

        <Form.Item label="Attachment File:">
          <Upload.Dragger onChange={handleFileChange} beforeUpload={() => false}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item label="Letter Body:" required>
          <TextArea rows={4} name="body" value={formData.body} onChange={handleChange} />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Send Email
        </Button>
      </Form>
    </Card>
  );
};

export default EmailFormSend;
