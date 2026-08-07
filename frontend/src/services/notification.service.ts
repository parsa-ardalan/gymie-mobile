import * as Notifications from "expo-notifications";


// تنظیم رفتار نمایش نوتیف
Notifications.setNotificationHandler({

    handleNotification: async () => ({

        shouldShowBanner: true,

        shouldShowList: true,

        shouldPlaySound: true,

        shouldSetBadge: false,

    }),

});


// گرفتن permission
export async function requestNotificationPermission() {


    const { status: existingStatus } =
        await Notifications.getPermissionsAsync();



    let finalStatus = existingStatus;



    if (existingStatus !== "granted") {


        const { status } =
            await Notifications.requestPermissionsAsync();


        finalStatus = status;
    }



    if (finalStatus !== "granted") {


        console.log(
            "Notification permission denied"
        );


        return false;

    }

    return true;

}


// حذف تمام نوتیف های قبلی
export async function cancelAllNotifications() {


    await Notifications.cancelAllScheduledNotificationsAsync();

}


// ساخت نوتیف خواب
export async function scheduleSleepNotification(
    bedTime: string
) {


    const [hour, minute] =
        bedTime
            .split(":")
            .map(Number);



    await Notifications.scheduleNotificationAsync({

        content: {

            title:
                "🌙 وقت خواب",

            body:
                "کم کم برای خواب آماده شو",

        },


        trigger: {

            type: Notifications.SchedulableTriggerInputTypes.DAILY,

            hour,

            minute,

        },

    });

}



// ساخت نوتیف صبح
export async function scheduleWakeNotification(
    wakeTime: string
) {


    const [hour, minute] =
        wakeTime
            .split(":")
            .map(Number);



    await Notifications.scheduleNotificationAsync({

        content: {

            title:
                "☀️ صبح بخیر",

            body:
                "روزت رو پر انرژی شروع کن",

        },


        trigger: {

            type: Notifications.SchedulableTriggerInputTypes.DAILY,

            hour,

            minute,

        },

    });
}