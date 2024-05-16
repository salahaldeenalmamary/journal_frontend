import { Button, Form } from "antd";
import { useEffect, useState } from "react";

const SubmitButton = ({ form, children, ...res }) => {
  const [submittable, setSubmittable] = useState(false);

  // Watch all values
  const values = Form.useWatch([], form);
  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);
  return (
    <Button type="primary" htmlType="submit" disabled={!submittable} {...res}>
      {children}
    </Button>
  );
};
export default SubmitButton;
