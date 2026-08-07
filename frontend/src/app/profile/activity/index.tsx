import { Text, View } from "react-native";
import { useSelector } from "react-redux";

import styles from "@/components/ui/activity-page.styles";

export default function Activity() {

    const profile = useSelector((state: any) => state.user);
    const weekPercent = useSelector((state: any) => state.percent);
    const sleepingSystem = useSelector((state: any) => state.sleeping);


    // -------------------------
    // workout percentage
    // -------------------------
    const workoutPercent = weekPercent?.length
        ? Math.round(
            weekPercent.reduce(
                (sum: number, day: any) =>
                    sum + (day.percentage || 0),
                0
            ) / weekPercent.length
        )
        : 0;


    // -------------------------
    // BMI
    // -------------------------
    const height = profile?.height || 0;
    const weight = profile?.weight || 0;

    const bmi = height > 0
        ? weight / Math.pow(height / 100, 2)
        : 0;


    const bodyForm =
        bmi === 0
            ? "-"
            : bmi < 18.5
                ? "لاغر"
                : bmi < 24.9
                    ? "ایده آل"
                    : bmi < 29.9
                        ? "تپل"
                        : "چاق";


    // -------------------------
    // Sleep
    // -------------------------

    const sleepingData = useSelector((state: any) => state.sleeping)
    const offeredSleepingHour = sleepingData.suggestedHour;

    console.log(offeredSleepingHour)

    const userSleepHour =
        (sleepingSystem?.sleepDuration || 0) / 60;


    const sleeping =
        userSleepHour >= offeredSleepingHour
            ? "منظم"
            : "نامنظم";

    return (
        <View style={styles.page}>

            {/* Chart */}
            <View style={styles.chart}>

                {weekPercent.map((day: any) => (

                    <View
                        style={styles.day}
                        key={day.day}
                    >

                        <View style={styles.barWrapper}>
                            <View
                                style={[
                                    styles.bar,
                                    {
                                        height: `${day.percentage}%`
                                    },
                                ]}
                            />
                        </View>


                        <Text style={styles.dayText}>
                            {day.day}
                        </Text>

                    </View>

                ))}

            </View>


            {/* Workout */}
            <View style={styles.card}>
                <Text style={styles.leftText}>
                    تمرین
                </Text>

                <Text style={styles.rightGreen}>
                    {workoutPercent}%
                </Text>
            </View>


            {/* Body */}
            <View style={styles.card}>
                <Text style={styles.leftText}>
                    فرم بدنی
                </Text>

                <Text style={styles.rightGreen}>
                    {bodyForm}
                </Text>
            </View>


            {/* Sleep */}
            <View style={styles.card}>
                <Text style={styles.leftText}>
                    خواب
                </Text>

                <Text style={styles.rightGreen}>
                    {sleeping}
                </Text>
            </View>


        </View>
    );
}