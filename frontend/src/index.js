import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import GlobalStyles from "~/components/GlobalStyles";
import App from "~/App";
import { store, persistor } from "~/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyles>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </GlobalStyles>
  </React.StrictMode>
);
