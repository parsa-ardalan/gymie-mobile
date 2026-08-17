import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router } from "expo-router";

import { useState } from "react";
import {
    Text,
    View
} from "react-native";

import styles from "@/components/ui/settings-page.styles";

// boxes
import LanguageBox, {
    Lang,
} from "@/components/settings/LanguageBox";

import NotificationBox from "@/components/settings/NotificationBox";
import ThemeBox from "@/components/settings/ThemeBox";

export default function Settings() {
    const [isChangingLanguage, setIsChangingLanguage] =
        useState(false);

    const handleLanguageChange = (selected: Lang) => {
        setIsChangingLanguage(true);

        /*
         * LanguageBox has already:
         *
         * 1. saved the language
         * 2. updated localization
         * 3. updated RTL/LTR
         *
         * Parent is now responsible for:
         *
         * 4. showing the modal
         * 5. navigating to Home
         */

        setTimeout(() => {
            router.replace("/");

            /*
             * Keep the modal visible long enough
             * for the navigation transition.
             */
            setTimeout(() => {
                setIsChangingLanguage(false);
            }, 400);
        }, 300);
    };

    return (
        <View style={styles.page}>

            {/* Language */}

            <LanguageBox
                onLanguageChange={handleLanguageChange}
            />

            {/* Theme */}

            <ThemeBox />

            {/* Notifications */}

            <NotificationBox />

            {/* =========================================
                LANGUAGE CHANGE MODAL
               ========================================= */}

            {isChangingLanguage && (
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,

                        justifyContent: 'center',
                        alignItems: 'center',

                        zIndex: 9999,
                        elevation: 9999,

                    }}
                >
                    {/* Blur Background */}
                    <BlurView
                        intensity={40}
                        tint="dark"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                        }}
                    />

                    {/* Content */}
                    <View
                        style={{
                            alignItems: 'center',
                        }}
                    >
                        <Ionicons
                            name="language-outline"
                            size={28}
                            color="#fff"
                            style={{
                                marginBottom: 10,
                            }}
                        />

                        <Text
                            style={{
                                color: '#fff',
                                fontSize: 16,
                                fontWeight: '600',
                            }}
                        >
                            Changing language...
                        </Text>
                    </View>
                </View>
            )}

        </View>
    );
}