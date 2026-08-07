import { Slot } from "expo-router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";


import { persistor, store } from "../redux/store";
import {
  requestNotificationPermission
} from "../services/notification.service";
import AuthGuard from "../utils/AuthGuard";

export default function Layout() {


  useEffect(() => {

    requestNotificationPermission();

  }, []);


  return (
    <Provider store={store}>

      <PersistGate
        loading={null}
        persistor={persistor}
      >

        <AuthGuard>

          <Slot />

        </AuthGuard>

      </PersistGate>

    </Provider>
  );

}