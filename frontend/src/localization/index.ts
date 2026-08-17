import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";

import { en } from "./en";
import { fa } from "./fa";

export type Lang = "fa" | "en";

/*
 * ==========================================
 * SYSTEM LANGUAGE
 * ==========================================
 */

const systemLanguage =
    getLocales()[0]?.languageCode;

const defaultLanguage: Lang =
    systemLanguage === "fa"
        ? "fa"
        : "en";

/*
 * ==========================================
 * LANGUAGE STATE
 * ==========================================
 */

let currentLanguage: Lang =
    defaultLanguage;

export let language: Lang =
    currentLanguage;

export let translations =
    language === "fa"
        ? fa
        : en;

/*
 * ==========================================
 * WEB DIRECTION
 * ==========================================
 */

const applyWebDirection = (
    lang: Lang
) => {
    // This code only runs on Web.
    if (
        typeof document === "undefined"
    ) {
        return;
    }

    const direction =
        lang === "fa"
            ? "rtl"
            : "ltr";

    /*
     * HTML
     */
    document.documentElement.setAttribute(
        "dir",
        direction
    );

    document.documentElement.setAttribute(
        "lang",
        lang
    );

    document.documentElement.style.direction =
        direction;

    /*
     * BODY
     */
    if (document.body) {
        document.body.setAttribute(
            "dir",
            direction
        );

        document.body.style.direction =
            direction;
    }

    /*
     * ROOT
     */
    const root =
        document.getElementById("root");

    if (root) {
        root.setAttribute(
            "dir",
            direction
        );

        root.style.direction =
            direction;
    }

};

/*
 * ==========================================
 * LOAD LANGUAGE
 * ==========================================
 */

export const loadLanguage =
    async (): Promise<Lang> => {
        try {
            const saved =
                await AsyncStorage.getItem(
                    "app_language"
                );

            /*
             * Use saved language if valid.
             * Otherwise use system language.
             */

            if (
                saved === "fa" ||
                saved === "en"
            ) {
                currentLanguage = saved;
            } else {
                currentLanguage =
                    defaultLanguage;
            }

            /*
             * Update global language
             */

            language =
                currentLanguage;

            /*
             * Update translations
             */

            translations =
                currentLanguage === "fa"
                    ? fa
                    : en;

            /*
             * IMPORTANT:
             *
             * Apply Web direction during
             * language initialization.
             *
             * This happens BEFORE the app
             * finishes its startup process.
             */

            applyWebDirection(
                currentLanguage
            );


            return currentLanguage;

        } catch (error) {
            console.error(
                "[Localization] LOAD ERROR:",
                error
            );

            /*
             * Fallback to system language
             */

            currentLanguage =
                defaultLanguage;

            language =
                currentLanguage;

            translations =
                currentLanguage === "fa"
                    ? fa
                    : en;

            applyWebDirection(
                currentLanguage
            );

            return currentLanguage;
        }
    };

/*
 * ==========================================
 * SET LANGUAGE
 * ==========================================
 */

export const setLanguage =
    async (lang: Lang): Promise<void> => {
        try {
            /*
             * Validate language
             */

            if (
                lang !== "fa" &&
                lang !== "en"
            ) {
                return;
            }

            /*
             * Update memory
             */

            currentLanguage = lang;

            language = lang;

            /*
             * Update translations
             */

            translations =
                lang === "fa"
                    ? fa
                    : en;

            /*
             * Persist language
             */

            await AsyncStorage.setItem(
                "app_language",
                lang
            );

            /*
             * Apply Web direction immediately
             */

            applyWebDirection(lang);


        } catch (error) {
            console.error(
                "[Localization] SET ERROR:",
                error
            );

            throw error;
        }
    };