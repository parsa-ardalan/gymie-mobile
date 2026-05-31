import { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

import styles from "@/components/ui/activity-page.styles";

export default function Activity() {
    const profile = useSelector((state: any) => state.user);
    const weekday = useSelector((state: any) => state.weekday);

    const activityInfo = {
        workout: 87,
        sleeping: "منظم",
    };

    const [bodyForm, setBodyForm] = useState("");

    const bmi = useMemo(() => {
        const h = profile.height / 100;
        return profile.weight / (h * h);
    }, [profile]);

    useEffect(() => {
        if (bmi < 18.5) setBodyForm("لاغر");
        else if (bmi < 24.9) setBodyForm("ایده آل");
        else if (bmi < 29.9) setBodyForm("تپل");
        else setBodyForm("چاق");
    }, [bmi]);

    return (
        <View style={styles.page}>

            {/* chart */}
            <View style={styles.chart}>
                {weekday.map((day: any) => (
                    <View style={styles.day} key={day.id}>

                        {/* bar */}
                        <View style={styles.barWrapper}>
                            <View
                                style={[
                                    styles.bar,
                                    { height: `${day.activityPercent}%` },
                                ]}
                            />
                        </View>

                        {/* label */}
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
                    {bodyForm}
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