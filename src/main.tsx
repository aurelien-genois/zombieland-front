import { createRoot } from "react-dom/client";
import App from "./components/App/App.tsx";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store";
import { fetchMe } from "./store/reducers/authReducer.ts";

store.dispatch(fetchMe());
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
