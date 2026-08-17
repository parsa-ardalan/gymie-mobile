import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    Alert,
    AppState,
    Linking,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import styles from "@/components/ui/settings-page.styles";
import { translations } from "@/localization";

export default function NotificationBox() {
    const [enabled, setEnabled] = useState(false);

    /*
     * ==========================================
     * CHECK PERMISSION
     * ==========================================
     */

    const checkPermission = useCallback(async () => {
        try {
            const { status } =
                await Notifications.getPermissionsAsync();

            setEnabled(status === "granted");

        } catch (error) {
            console.log(
                "Permission check error:",
                error
            );
        }
    }, []);

    /*
     * ==========================================
     * INITIAL CHECK
     * ==========================================
     */

    useEffect(() => {
        checkPermission();
    }, [checkPermission]);

    /*
     * ==========================================
     * CHECK WHEN RETURNING FROM SETTINGS
     * ==========================================
     */

    useEffect(() => {
        const subscription =
            AppState.addEventListener(
                "change",
                (state) => {
                    if (state === "active") {
                        checkPermission();
                    }
                }
            );

        return () => {
            subscription.remove();
        };
    }, [checkPermission]);

    /*
     * ==========================================
     * OPEN SETTINGS
     * ==========================================
     */

    const openSettings = useCallback(() => {
        Linking.openSettings();
    }, []);

    /*
     * ==========================================
     * SETTINGS ALERT
     * ==========================================
     */

    const showSettingsAlert = useCallback(() => {
        Alert.alert(
            translations.settings.notifications,

            translations.settings
                .enableFromDeviceSettings,

            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text:
                        translations
                            .settings
                            .openSettings,

                    onPress: openSettings,
                },
            ]
        );
    }, [openSettings]);

    /*
     * ==========================================
     * REQUEST PERMISSION
     * ==========================================
     */

    const requestPermission =
        useCallback(async () => {
            try {
                const {
                    status,
                    canAskAgain,
                } =
                    await Notifications.requestPermissionsAsync();

                if (status === "granted") {
                    setEnabled(true);
                    return;
                }

                setEnabled(false);

                if (!canAskAgain) {
                    showSettingsAlert();
                }

            } catch (error) {
                console.log(
                    "Permission request error:",
                    error
                );
            }
        }, [showSettingsAlert]);

    /*
     * ==========================================
     * HANDLE PRESS
     * ==========================================
     */

    const handlePress = useCallback(
        async () => {
            try {
                const {
                    status,
                    canAskAgain,
                } =
                    await Notifications.getPermissionsAsync();

                /*
                 * Already enabled
                 *
                 * We cannot revoke system permission
                 * programmatically.
                 *
                 * Open device settings instead.
                 */

                if (status === "granted") {
                    setEnabled(true);
                    openSettings();
                    return;
                }

                /*
                 * Permission permanently denied
                 */

                if (
                    status === "denied" &&
                    !canAskAgain
                ) {
                    setEnabled(false);
                    showSettingsAlert();
                    return;
                }

                /*
                 * Ask for permission
                 */

                await requestPermission();

            } catch (error) {
                console.log(
                    "Notification press error:",
                    error
                );
            }
        },
        [
            openSettings,
            requestPermission,
            showSettingsAlert,
        ]
    );

    /*
     * ==========================================
     * UI STATE
     * ==========================================
     */

    const iconName = enabled
        ? "notifications"
        : "notifications-off";

    const iconColor = enabled
        ? "#8B7CFF"
        : "#92929D";

    /*
     * فعلاً از کلیدهای موجود localization استفاده می‌کنیم.
     */

    const statusText = enabled
        ? translations.settings.openSettings
        : translations.settings.enableFromDeviceSettings;

    /*
     * ==========================================
     * UI
     * ==========================================
     */

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={handlePress}
        >
            <View style={styles.left}>

                {/* Icon */}

                <View style={styles.iconBox}>
                    <Ionicons
                        name={iconName}
                        size={20}
                        color={iconColor}
                    />
                </View>

                {/* Text */}

                <View style={styles.textBox}>

                    <Text style={styles.title}>
                        {
                            translations
                                .settings
                                .notifications
                        }
                    </Text>

                </View>

            </View>
        </TouchableOpacity>
    );
}
