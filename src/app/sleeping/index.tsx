import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Text, TextInput, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";

import styles from "@/components/ui/sleeping-page.styles";
import {
    changeBedTime,
    changeWakeTime,
    setSleepingHour,
    setUserSleepingHour
} from "@/redux/sleeping/sleepingSlice";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function Sleeping() {

    const profile = useSelector((state: any) => state.user)

    const dispatch = useDispatch();
    const sleepingInfo = useSelector((state: any) => state.sleeping);

    const progressAnim = useRef(new Animated.Value(0)).current;

    const radius = 90;
    const circumference = 2 * Math.PI * radius;

    const [goToBed, setGoToBed] = useState(sleepingInfo.bedTime);
    const [wakeUp, setWakeUp] = useState(sleepingInfo.wakeTime);

    const age = profile.age;
    const trainingDaysPerWeek = 4;

    const totalSleepHours = useMemo(() => {
        const base = 7;
        const ageAdj = age < 25 ? 0.5 : 0;
        const trainingAdj = trainingDaysPerWeek * 0.3;

        return base + ageAdj + trainingAdj;
    }, [age]);

    // -------------------------
    // offered sleep (Redux)
    // -------------------------
    useEffect(() => {
        dispatch(setSleepingHour(totalSleepHours));
    }, [dispatch, totalSleepHours]);

    const toMinutes = (t: string) => {
        if (!t) return 0;

        const [h, m] = t.split(":").map(Number);
        if (isNaN(h) || isNaN(m)) return 0;

        return h * 60 + m;
    };

    // -------------------------
    // actual sleep
    // -------------------------
    const actualSleepingTime = useMemo(() => {
        const bed = toMinutes(goToBed);
        const wake = toMinutes(wakeUp);

        let diff = wake - bed;
        if (diff < 0) diff += 1440;

        return diff / 60;
    }, [goToBed, wakeUp]);

    // -------------------------
    // FIX: Redux sync (IMPORTANT)
    // -------------------------
    useEffect(() => {
        dispatch(setUserSleepingHour(actualSleepingTime));
    }, [sleepingInfo.bedTime, sleepingInfo.wakeTime]);

    // -------------------------
    // percentage
    // -------------------------
    const percentage = useMemo(() => {
        return Math.min(
            100,
            Math.max(0, (actualSleepingTime / 24) * 100)
        );
    }, [actualSleepingTime]);

    useEffect(() => {
        progressAnim.stopAnimation();

        Animated.timing(progressAnim, {
            toValue: percentage,
            duration: 600,
            useNativeDriver: false,
        }).start();
    }, [percentage]);

    // -------------------------
    // sync inputs with redux (cleaned)
    // -------------------------
    useEffect(() => {
        setGoToBed(sleepingInfo.bedTime);
    }, [sleepingInfo.bedTime]);

    useEffect(() => {
        setWakeUp(sleepingInfo.wakeTime);
    }, [sleepingInfo.wakeTime]);

    const strokeDashoffset = progressAnim.interpolate({
        inputRange: [0, 100],
        outputRange: [circumference, 0],
    });

    return (
        <View style={styles.page}>

            <View style={styles.card}>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}> خواب شبانه </Text>
                </View>

                <Text style={styles.infoText}>
                    کیفیت خواب تو مستقیماً به فعالیت روزانه، تغذیه و سطح استرست بستگی داره.
                    بدن تو هر روز نیاز متفاوتی به ریکاوری داره.
                </Text>

                <View style={styles.divider} />

                <View style={styles.row}>
                    <View>
                        <Text style={styles.label}>تایم خواب پیشنهادی</Text>
                        <Text style={styles.subLabel}>بر اساس سن و فعالیت روزانه</Text>
                    </View>

                    <View style={styles.valueBox}>
                        <Text style={styles.value}>
                            {sleepingInfo.offeredSleepingHour} ساعت
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.inputs}>
                <View style={styles.inputBox}>
                    <Text style={styles.inputLabel}>تایم خوابیدن</Text>

                    <View style={styles.timeInputWrapper}>
                        <TextInput
                            value={goToBed}
                            onChangeText={(text) => {
                                setGoToBed(text);
                                dispatch(changeBedTime(text));
                            }}
                            placeholder={sleepingInfo.bedTime}
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
                            onChangeText={(text) => {
                                setWakeUp(text);
                                dispatch(changeWakeTime(text));
                            }}
                            placeholder={sleepingInfo.wakeTime}
                            placeholderTextColor="rgba(255,255,255,0.3)"
                            style={styles.timeInput}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
            </View>

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