import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import App from "./app";
import store from "./store/configureStore";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { blue, red, geekblue, gray } from "@ant-design/colors";
import { MessageProvider } from "./common/Notification";
// ...
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <MessageProvider>
      <ConfigProvider
        theme={{
          components: {
            Descriptions: {
              extraColor: "blue",
              padding: 20,
            },
            Menu: {
              darkItemColor: blue[0],
              darkItemBg: blue[8],
              darkSubMenuItemBg: blue[6],
              darkItemSelectedColor: blue[8],
              darkItemSelectedBg: blue[0],
              darkDangerItemActiveBg: blue[0],
            },
          },
        }}
      >
        <App />
      </ConfigProvider>
      </MessageProvider>
    </Provider>
  </React.StrictMode>
);
// const rootElement = ReactDOM.createRoot(document.createRo("root"));
// rootElement.render(<App />);
