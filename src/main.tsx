import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import store from "./app/store.ts";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);
