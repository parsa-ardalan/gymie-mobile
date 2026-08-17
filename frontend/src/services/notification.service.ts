import * as Notifications from "expo-notifications";

import { en } from "@/localization/en";
import { fa } from "@/localization/fa";

import type { Lang } from "@/localization";

// GET NOTIFICATION TRANSLATIONS

function getNotificationTranslations(
    language: Lang
) {
    return language === "fa"
        ? fa
        : en;
}


// NOTIFICATION HANDLER

Notifications.setNotificationHandler({

    handleNotification: async () => ({

        shouldShowBanner: true,

        shouldShowList: true,

        shouldPlaySound: true,

        shouldSetBadge: false,

    }),

});


// REQUEST PERMISSION

export async function requestNotificationPermission() {

    const { status: existingStatus } =
        await Notifications.getPermissionsAsync();


    let finalStatus =
        existingStatus;


    if (existingStatus !== "granted") {

        const { status } =
            await Notifications.requestPermissionsAsync();

        finalStatus = status;

    }


    if (finalStatus !== "granted") {


        return false;

    }


    return true;

}


// CANCEL ALL NOTIFICATIONS

export async function cancelAllNotifications() {

    await Notifications.cancelAllScheduledNotificationsAsync();

}


// SLEEP NOTIFICATION

export async function scheduleSleepNotification(
    bedTime: string
) {
    const [hour, minute] =
        bedTime
            .split(":")
            .map(Number);

    await Notifications.scheduleNotificationAsync({

        content: {

            title: "Good Night 🌙",

            body: "It's time to sleep.",

        },

        trigger: {

            type:
                Notifications
                    .SchedulableTriggerInputTypes
                    .DAILY,

            hour,

            minute,

        },

    });
}


// WAKE NOTIFICATION

export async function scheduleWakeNotification(
    wakeTime: string
) {
    const [hour, minute] =
        wakeTime
            .split(":")
            .map(Number);

    await Notifications.scheduleNotificationAsync({

        content: {

            title: "Good Morning ☀️",

            body: "It's time to wake up.",

        },

        trigger: {

            type:
                Notifications
                    .SchedulableTriggerInputTypes
                    .DAILY,

            hour,

            minute,

        },

    });
}