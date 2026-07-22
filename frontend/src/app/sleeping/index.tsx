import { Text, TextInput, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import styles from "@/components/ui/sleeping-page.styles";
import { updateSleeping } from "@/redux/sleeping/sleepingSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Sleeping() {

    const dispatch = useDispatch();

    const radius = 90;
    const circumference = 2 * Math.PI * radius;

    const sleepingRedux = useSelector(
        (state: any) => state.sleeping
    );

    useEffect(() => {

        const getSleeping = async () => {
            try {
                const res = await axios.get("http://localhost:3000/sleeping");

                // اگر آرایه بود
                const data = Array.isArray(res.data) ? res.data[0] : res.data;

                dispatch(updateSleeping(data));
            } catch (err) {
                console.log("GET sleeping error:", err);
            }
        };

        getSleeping();

    }, []);

    const calculateSleepHours = () => {

        if (!sleepingRedux?.bedTime || !sleepingRedux?.wakeTime) return 0;

        const [bedH, bedM] = sleepingRedux.bedTime.split(":").map(Number);
        const [wakeH, wakeM] = sleepingRedux.wakeTime.split(":").map(Number);

        let bedMinutes = bedH * 60 + bedM;
        let wakeMinutes = wakeH * 60 + wakeM;

        if (wakeMinutes < bedMinutes) {
            wakeMinutes += 24 * 60;
        }

        return Number(((wakeMinutes - bedMinutes) / 60).toFixed(1));
    };

    const sleepHours = calculateSleepHours();
    const progress = sleepHours / 24; // هدف 8 ساعت

    const editBedTime = async (value: string) => {

        dispatch(updateSleeping({
            ...sleepingRedux,
            bedTime: value
        }));

        try {
            await axios.patch("http://localhost:3000/sleeping", {
                user_id: sleepingRedux.user_id,
                bedTime: value
            });
        } catch (err) {
            console.log("PATCH bedTime error:", err);
        }
    };

    const editWakeTime = async (value: string) => {

        dispatch(updateSleeping({
            ...sleepingRedux,
            wakeTime: value
        }));

        try {
            await axios.patch("http://localhost:3000/sleeping", {
                user_id: sleepingRedux.user_id,
                wakeTime: value
            });
        } catch (err) {
            console.log("PATCH wakeTime error:", err);
        }
    };


    return (

        <View style={styles.page}>

            <View style={styles.card}>

                <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                        خواب شبانه
                    </Text>
                </View>

                <Text style={styles.infoText}>
                    کیفیت خواب تو مستقیماً به فعالیت روزانه، تغذیه و سطح استرست بستگی داره.
                    بدن تو هر روز نیاز متفاوتی به ریکاوری داره.
                </Text>

                <View style={styles.divider} />

                <View style={styles.row}>

                    <View>
                        <Text style={styles.label}>
                            تایم خواب پیشنهادی
                        </Text>

                        <Text style={styles.subLabel}>
                            بر اساس سن و فعالیت روزانه
                        </Text>
                    </View>

                    <View style={styles.valueBox}>
                        <Text style={styles.value}>
                            8 ساعت
                        </Text>
                    </View>

                </View>

            </View>


            {/* INPUTS */}
            <View style={styles.inputs}>

                {/* BED TIME */}
                <View style={styles.inputBox}>

                    <Text style={styles.inputLabel}>
                        تایم خوابیدن
                    </Text>

                    <View style={styles.timeInputWrapper}>
                        <TextInput
                            value={sleepingRedux?.bedTime || ""}
                            onChangeText={editBedTime}
                            placeholder="23:00"
                            placeholderTextColor="rgba(255,255,255,0.3)"
                            style={styles.timeInput}
                            keyboardType="numeric"
                        />
                    </View>

                </View>

                {/* WAKE TIME */}
                <View style={styles.inputBox}>

                    <Text style={styles.inputLabel}>
                        تایم بیداری
                    </Text>

                    <View style={styles.timeInputWrapper}>
                        <TextInput
                            value={sleepingRedux?.wakeTime || ""}
                            onChangeText={editWakeTime}
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

                    {/* background */}
                    <Circle
                        cx="110"
                        cy="110"
                        r={radius}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth={10}
                        fill="transparent"
                    />

                    {/* progress */}
                    <Circle
                        cx="110"
                        cy="110"
                        r={radius}
                        stroke="#3b82f6"
                        strokeWidth={10}
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference * (1 - progress)}
                        strokeLinecap="round"
                        transform="rotate(-90 110 110)"
                    />

                </Svg>

                <View style={styles.circleText}>
                    <Text style={styles.circleValue}>
                        {sleepHours}
                    </Text>

                    <Text style={styles.circleLabel}>
                        ساعت
                    </Text>
                </View>

            </View>

        </View>
    );
}