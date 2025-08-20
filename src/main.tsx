// // main.tsx (or index.tsx)

// import React from "react";
// import { createRoot } from "react-dom/client";
// import { Provider } from "react-redux";
// import { store } from "@/Store/store";
// import App from "./App";
// import "./index.css";

// const root = createRoot(document.getElementById("root")!);

// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import "./index.css";
import { store, persistor } from "@/Store/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
