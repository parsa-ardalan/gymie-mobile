import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Text, TextInput, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import styles from "@/components/ui/sleeping-page.styles";
import profile from "@/data/profile/profile.json";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function Sleeping() {
    const [goToBed, setGoToBed] = useState("23:00");
    const [wakeUp, setWakeUp] = useState("07:00");

    const progressAnim = useRef(new Animated.Value(0)).current;

    const radius = 90;
    const circumference = 2 * Math.PI * radius;

    const age = profile.age;
    const trainingDaysPerWeek = 4;

    const baseSleepHours = 7;
    const ageAdjustment = age < 25 ? 0.5 : 0;
    const trainingAdjustment = trainingDaysPerWeek * 0.3;

    const totalSleepHours =
        baseSleepHours + ageAdjustment + trainingAdjustment;

    // -------------------------------
    // ✅ SAFE TIME PARSER (anti-crash)
    // -------------------------------
    const toMinutes = (t) => {
        if (!t || typeof t !== "string") return 0;

        const parts = t.split(":");
        if (parts.length !== 2) return 0;

        let h = Number(parts[0]);
        let m = Number(parts[1]);

        if (isNaN(h)) h = 0;
        if (isNaN(m)) m = 0;

        h = Math.max(0, Math.min(23, h));
        m = Math.max(0, Math.min(59, m));

        return h * 60 + m;
    };

    // -------------------------------
    // ✅ CORE LOGIC (fix midnight bug)
    // -------------------------------
    const actualSleepingTime = useMemo(() => {
        const bed = toMinutes(goToBed);
        const wake = toMinutes(wakeUp);

        let diff = wake - bed;

        // اگر رد از نیمه‌شب شد
        if (diff < 0) {
            diff = 1440 + diff;
        }

        return diff / 60;
    }, [goToBed, wakeUp]);

    // -------------------------------
    // ✅ SAFE PERCENTAGE
    // -------------------------------
    const percentage = useMemo(() => {
        if (!actualSleepingTime || isNaN(actualSleepingTime)) return 0;

        return Math.min(
            100,
            Math.max(0, (actualSleepingTime / 24) * 100)
        );
    }, [actualSleepingTime]);

    // -------------------------------
    // ✅ SMOOTH ANIMATION (no jump bug)
    // -------------------------------
    useEffect(() => {
        progressAnim.stopAnimation();

        Animated.timing(progressAnim, {
            toValue: percentage,
            duration: 600,
            useNativeDriver: false,
        }).start();
    }, [percentage]);

    const strokeDashoffset = progressAnim.interpolate({
        inputRange: [0, 100],
        outputRange: [circumference, 0],
    });

    return (
        <View style={styles.page}>

            <View style={styles.card}>

                {/* HEADER BADGE */}
                <View style={styles.badge}>
                    <Text style={styles.badgeText}> خواب شبانه </Text>
                </View>

                {/* DESCRIPTION */}
                <Text style={styles.infoText}>
                    کیفیت خواب تو مستقیماً به فعالیت روزانه، تغذیه و سطح استرست بستگی داره.
                    بدن تو هر روز نیاز متفاوتی به ریکاوری داره.
                </Text>

                {/* DIVIDER */}
                <View style={styles.divider} />

                {/* RECOMMENDATION ROW */}
                <View style={styles.row}>
                    <View>
                        <Text style={styles.label}>تایم خواب پیشنهادی</Text>
                        <Text style={styles.subLabel}>بر اساس سن و فعالیت روزانه</Text>
                    </View>

                    <View style={styles.valueBox}>
                        <Text style={styles.value}>{totalSleepHours} ساعت </Text>
                    </View>
                </View>

            </View>

            {/* INPUTS */}
            <View style={styles.inputs}>
                <View style={styles.inputBox}>
                    <Text style={styles.inputLabel}>تایم خوابیدن</Text>

                    <View style={styles.timeInputWrapper}>
                        <TextInput
                            value={goToBed}
                            onChangeText={setGoToBed}
                            placeholder="23:00"
                            placeholderTextColor="rgba(255,255,255,0.3)"
                            style={styles.timeInput}
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                <View style={styles.inputBox}>
                    <Text style={styles.inputLabel}>تایم بیداری</Text>

                    <View style={styles.timeInputWrapper}>
                        <TextInput
                            value={wakeUp}
                            onChangeText={setWakeUp}
                            placeholder="07:00"
                            placeholderTextColor="rgba(255,255,255,0.3)"
                            style={styles.timeInput}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
            </View>

            {/* CIRCLE */}
            <View style={styles.circleWrapper}>
                <Svg width={220} height={220}>
                    <Circle
                        cx="110"
                        cy="110"
                        r={radius}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth={10}
                        fill="transparent"
                    />

                    <AnimatedCircle
                        cx="110"
                        cy="110"
                        r={radius}
                        stroke="#3b82f6"
                        strokeWidth={10}
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        transform="rotate(-90 110 110)"
                    />
                </Svg>

                <View style={styles.circleText}>
                    <Text style={styles.circleValue}>
                        {actualSleepingTime.toFixed(1)}
                    </Text>
                    <Text style={styles.circleLabel}>ساعت</Text>
                </View>
            </View>

        </View>
    );
}