import { useMemo } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

import styles from "@/components/ui/activity-page.styles";

export default function Activity() {

    const profile = useSelector((state: any) => state.user);
    const weekday = useSelector((state: any) => state.weekday);
    const sleepingSystem = useSelector((state: any) => state.sleeping);

    // -------------------------
    // workout calculation
    // -------------------------
    const workout = useMemo(() => {
        if (!weekday?.length) return 0;

        const total = weekday.reduce(
            (sum: number, item: any) => sum + (item.activityPercent || 0),
            0
        );

        return Math.round(total / weekday.length);
    }, [weekday]);

    // -------------------------
    // BMI calculation
    // -------------------------
    const bmi = useMemo(() => {
        const h = profile.height / 100;
        return profile.weight / (h * h);
    }, [profile]);

    const bodyForm = useMemo(() => {
        if (bmi < 18.5) return "لاغر";
        else if (bmi < 24.9) return "ایده آل";
        else if (bmi < 29.9) return "تپل";
        else return "چاق";
    }, [bmi]);

    // -------------------------
    // sleeping calculation
    // -------------------------
    const sleeping = useMemo(() => {
        const offered = sleepingSystem.offeredSleepingHour || 0;
        const user = sleepingSystem.userSleepingHour || 0;

        return offered < user ? "منظم" : "نامنظم";
    }, [
        sleepingSystem.offeredSleepingHour,
        sleepingSystem.userSleepingHour
    ]);


    // -------------------------
    // activity info
    // -------------------------
    const activityInfo = useMemo(() => {
        return {
            workout,
            sleeping,
            bodyForm,
        };
    }, [workout, sleeping, bodyForm]);

    // -------------------------
    // UI
    // -------------------------
    return (
        <View style={styles.page}>

            {/* chart */}
            <View style={styles.chart}>
                {weekday.map((day: any) => (
                    <View style={styles.day} key={day.id}>
                        <View style={styles.barWrapper}>
                            <View
                                style={[
                                    styles.bar,
                                    { height: `${day.activityPercent}%` },
                                ]}
                            />
                        </View>

                        <Text style={styles.dayText}>
                            {day.planfilename}
                        </Text>
                    </View>
                ))}
            </View>

            {/* workout */}
            <View style={styles.card}>
                <Text style={styles.leftText}>تمرین</Text>
                <Text style={styles.rightGreen}>
                    {activityInfo.workout}%
                </Text>
            </View>

            {/* body form */}
            <View style={styles.card}>
                <Text style={styles.leftText}>فرم بدنی</Text>
                <Text style={styles.rightGreen}>
                    {activityInfo.bodyForm}
                </Text>
            </View>

            {/* sleep */}
            <View style={styles.card}>
                <Text style={styles.leftText}>خواب</Text>
                <Text style={styles.rightGreen}>
                    {activityInfo.sleeping}
                </Text>
            </View>

        </View>
    );
}