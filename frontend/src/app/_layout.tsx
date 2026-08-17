import NoInternetModal from '@/components/common/NoInternetModal';
import {
  language,
  loadLanguage,
} from '@/localization';
import { Slot } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  BackHandler,
  I18nManager,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '../redux/store';
import {
  requestNotificationPermission,
} from '../services/notification.service';

import AuthGuard from '../utils/AuthGuard';
import { checkInternet } from '../utils/checkInternet';

export default function Layout() {
  const [isInitialized, setIsInitialized] = useState(false);

  const [isCheckingInternet, setIsCheckingInternet] =
    useState(true);

  const [isOffline, setIsOffline] =
    useState(false);

  // Initial Setup
  useEffect(() => {
    const initializeApp = async () => {
      await loadLanguage();

      const isRTL = language === 'fa';

      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);

      setIsInitialized(true);

      requestNotificationPermission();
      handleCheckInternet();
    };

    initializeApp();
  }, []);

  // Check Internet
  const handleCheckInternet = async () => {
    setIsCheckingInternet(true);

    const connected = await checkInternet();

    setIsOffline(!connected);
    setIsCheckingInternet(false);
  };

  // Retry Internet
  const handleRetry = () => {
    handleCheckInternet();
  };

  // Exit App
  const handleExit = () => {
    if (Platform.OS === 'android') {
      BackHandler.exitApp();
      return;
    }

    if (Platform.OS === 'web') {
      window.close();
    }
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        <View style={styles.container}>
          <AuthGuard>
            <Slot />
          </AuthGuard>
        </View>

        <NoInternetModal
          visible={
            !isCheckingInternet &&
            isOffline
          }
          onRetry={handleRetry}
          onExit={handleExit}
        />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});