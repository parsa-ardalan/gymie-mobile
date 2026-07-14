import { Slot } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "../redux/store";
import AuthGuard from "../utils/AuthGuard";

export default function Layout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthGuard>
          <Slot />
        </AuthGuard>
      </PersistGate>
    </Provider>
  );
}