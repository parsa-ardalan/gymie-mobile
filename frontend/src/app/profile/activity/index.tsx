import { Text, View } from "react-native";
import { useSelector } from "react-redux";

import styles from "@/components/ui/activity-page.styles";
import { translations } from "@/localization";

export default function Activity() {

    const profile = useSelector((state: any) => state.user);
    const weekPercent = useSelector((state: any) => state.percent);
    const sleepingSystem = useSelector((state: any) => state.sleeping);

    const weekdays = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]

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
            ? translations.activity.bodyTypes.unavailable
            : bmi < 18.5
                ? translations.activity.bodyTypes.underweight
                : bmi < 24.9
                    ? translations.activity.bodyTypes.ideal
                    : bmi < 29.9
                        ? translations.activity.bodyTypes.overweight
                        : translations.activity.bodyTypes.obese;

    // -------------------------
    // Sleep
    // -------------------------

    const offeredSleepingHour =
        sleepingSystem.suggestedHour;

    const userSleepHour =
        (sleepingSystem?.sleepDuration || 0) / 60;

    const sleeping =
        userSleepHour >= offeredSleepingHour
            ? translations.activity.sleepStatus.regular
            : translations.activity.sleepStatus.irregular;

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

                            <Text style={styles.percentText}> {day.percentage}% </Text>

                            <View
                                style={[
                                    styles.bar,
                                    {
                                        height: `${day.percentage + 1}%`,
                                    },
                                ]}
                            />

                        </View>

                        <Text style={styles.dayText}>
                            {weekdays[day.day]}
                        </Text>

                    </View>

                ))}

            </View>

            {/* weekly percentage */}
            <View style={styles.card}>

                <Text style={styles.leftText}>
                    {translations.activity.workout}
                </Text>

                <Text style={styles.rightGreen}>
                    {workoutPercent}%
                </Text>

            </View>

            {/* body box info */}
            <View style={styles.workoutBox}>

                <View style={styles.bodyBox}>
                    <Text style={styles.bodyTitle}> {translations.activity.weight} </Text>
                    <Text style={styles.bodyText}> -5 </Text>
                </View>

                <View style={styles.bodyBox}>
                    <Text style={styles.bodyTitle}> bmi </Text>
                    <Text style={styles.bodyText}> {bmi.toFixed(1)} </Text>
                </View>

                <View style={styles.bodyBox}>
                    <Text style={styles.bodyTitle}> {translations.activity.bodyForm} </Text>
                    <Text style={styles.bodyText}> {bodyForm} </Text>
                </View>

            </View>

            {/* sleeping and diet */}
            <View style={styles.routineBox}>

                <View style={styles.sleepingBox}>
                    <Text style={styles.routineTitle}> {translations.activity.sleep} </Text>
                    {/* {sleeping == "منظم" ? (<Text style={styles.sleepingTextGood}> {sleeping} </Text>) : (<Text style={styles.sleepingTextBad}> {sleeping} </Text>)} */}
                    <Text style={styles.sleepingTextGood}> {"Regular"} </Text>
                </View>


                <View style={styles.nutritionBox}>
                    <Text style={styles.routineTitle}> {translations.activity.calories} </Text>
                    <Text style={styles.calorieNumber}> 2,394 </Text>

                </View>


            </View>


        </View>
    );
}
