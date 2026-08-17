import { Ionicons } from "@expo/vector-icons";
import {
    I18nManager,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useEffect, useState } from "react";

import styles from "@/components/ui/settings-page.styles";

import {
    loadLanguage,
    setLanguage,
    translations,
} from "@/localization";

export type Lang = "fa" | "en";

type LanguageBoxProps = {
    onLanguageChange: (language: Lang) => void;
};

export default function LanguageBox({
    onLanguageChange,
}: LanguageBoxProps) {
    const [lang, setLang] = useState<Lang>("en");

    const [open, setOpen] = useState(false);

    useEffect(() => {
        let mounted = true;

        const initialize = async () => {
            try {
                /*
                 * loadLanguage:
                 *
                 * - reads AsyncStorage
                 * - updates localization state
                 * - restores Web direction
                 */

                const savedLanguage =
                    await loadLanguage();

                if (!mounted) {
                    return;
                }

                setLang(savedLanguage);

            } catch (error) {
                console.error(
                    "LANGUAGE INITIALIZATION ERROR:",
                    error
                );
            }
        };

        initialize();

        return () => {
            mounted = false;
        };
    }, []);


    const changeLanguage = async (
        selected: Lang
    ) => {
        if (selected === lang) {
            setOpen(false);
            return;
        }

        const isRTL = selected === "fa";

        try {
            /*
             * Close dropdown immediately.
             */

            setOpen(false);

            /*
             * 1. Save + apply language
             */

            await setLanguage(selected);

            /*
             * 2. Update RTL / LTR
             */

            if (I18nManager.isRTL !== isRTL) {
                I18nManager.allowRTL(isRTL);
                I18nManager.forceRTL(isRTL);
            }

            /*
             * 3. Update local language state
             */

            setLang(selected);

            /*
             * 4. Notify Parent
             *
             * Parent now handles:
             * - Changing language modal
             * - navigation to Home
             */

            onLanguageChange(selected);

        } catch (error) {
            console.error(
                "LANGUAGE CHANGE ERROR:",
                error
            );
        }
    };

    const getLabel = () => {
        return lang === "fa"
            ? translations.settings.persian
            : translations.settings.english;
    };

    return (
        <View style={styles.rowBox}>

            {/* Header */}

            <TouchableOpacity
                style={styles.rowInner}
                activeOpacity={0.8}
                onPress={() =>
                    setOpen((prev) => !prev)
                }
            >
                {/* Icon */}
                <View style={styles.iconBox}>
                    <Ionicons
                        name="language-outline"
                        size={22}
                        style={styles.iconLarge}
                    />
                </View>

                {/* Content */}
                <View style={styles.contentBox}>
                    <Text style={styles.title}>
                        {translations.settings.language}
                    </Text>
                </View>

                {/* Current Language */}
                <View style={styles.valueBox}>
                    <Text style={styles.valueText}>
                        {getLabel()}
                    </Text>

                    <Ionicons
                        name={
                            open
                                ? "chevron-up"
                                : "chevron-down"
                        }
                        size={16}
                        color="#8E8E93"
                    />
                </View>

            </TouchableOpacity>

            {/* =========================================
                DROPDOWN
               ========================================= */}

            {open && (
                <View style={styles.dropdown}>

                    {/* Persian */}
                    <TouchableOpacity
                        style={[
                            styles.option,
                            lang === "fa" &&
                            styles.selectedOption,
                        ]}
                        activeOpacity={0.7}
                        onPress={() =>
                            changeLanguage("fa")
                        }
                    >
                        <View
                            style={
                                styles.optionContent
                            }
                        >
                            <Text
                                style={
                                    styles.optionText
                                }
                            >
                                {
                                    translations
                                        .settings
                                        .persian
                                }
                            </Text>

                            <Text
                                style={
                                    styles.optionSubText
                                }
                            >
                                {
                                    translations
                                        .settings
                                        .english
                                }
                            </Text>
                        </View>

                        {lang === "fa" && (
                            <Ionicons
                                name="checkmark"
                                size={18}
                                color="#7C6CFF"
                            />
                        )}
                    </TouchableOpacity>

                    {/* English */}
                    <TouchableOpacity
                        style={[
                            styles.option,
                            lang === "en" &&
                            styles.selectedOption,
                        ]}
                        activeOpacity={0.7}
                        onPress={() =>
                            changeLanguage("en")
                        }
                    >
                        <View
                            style={
                                styles.optionContent
                            }
                        >
                            <Text
                                style={
                                    styles.optionText
                                }
                            >
                                {
                                    translations
                                        .settings
                                        .english
                                }
                            </Text>

                            <Text
                                style={
                                    styles.optionSubText
                                }
                            >
                                {
                                    translations
                                        .settings
                                        .persian
                                }
                            </Text>
                        </View>

                        {lang === "en" && (
                            <Ionicons
                                name="checkmark"
                                size={18}
                                color="#7C6CFF"
                            />
                        )}
                    </TouchableOpacity>

                </View>
            )}
        </View>
    );
}
