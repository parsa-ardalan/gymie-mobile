import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import styles from "@/components/ui/sleeping-page.styles";
import { changeSuggestedTime, updateSleeping as updateSleepingRedux } from "@/redux/sleeping/sleepingSlice";
import { updateSleeping as updateSleepingApi } from "@/services/sleeping.service";
import { useDispatch, useSelector } from "react-redux";

import {
    cancelAllNotifications,
    scheduleSleepNotification,
    scheduleWakeNotification
} from "@/services/notification.service";


export default function Sleeping() {


    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);

    const radius = 90;
    const circumference = 2 * Math.PI * radius;

    // suggested sleeping hour

    const bmi =
        user.weight /
        Math.pow(user.height / 100, 2);


    const suggestedSleepingHour =
        Number(
            (
                7
                +
                (user.age < 20 ? 1 : user.age <= 30 ? 0.5 : 0)
                +
                (bmi < 18.5 ? 0.5 : 0)
                +
                (user.weight > 60 ? ((user.weight - 60) / 20) * 0.1 : 0)
            )
                .toFixed(1)
        );

    dispatch(changeSuggestedTime(suggestedSleepingHour));


    const sleepingRedux = useSelector(
        (state: any) => state.sleeping
    );

    useEffect(() => {
        
        if (
            !sleepingRedux?.bedTime ||
            !sleepingRedux?.wakeTime
        ) {
            return;
        }


        const setupNotifications = async () => {

            await cancelAllNotifications();
            await scheduleSleepNotification(sleepingRedux.bedTime);
            await scheduleWakeNotification(sleepingRedux.wakeTime);

            console.log(
                "Notifications updated:",
                sleepingRedux.bedTime,
                sleepingRedux.wakeTime
            );
        };

        setupNotifications();

    }, [
        sleepingRedux?.bedTime,
        sleepingRedux?.wakeTime
    ]);

    // local input states
    const [bedTimeInput, setBedTimeInput] = useState(
        sleepingRedux?.bedTime || ""
    );

    const [wakeTimeInput, setWakeTimeInput] = useState(
        sleepingRedux?.wakeTime || ""
    );

    /*
        اصلاح ساعت ورودی
        examples:

        6:00   => 06:00
        7      => 07:00
        24:00  => 00:00
        99:99  => 23:59
    */

    const normalizeTime = (
        value: string
    ) => {


        if (!value) {
            return "00:00";
        }


        // فقط عدد و :
        let clean =
            value
                .replace(/[^0-9:]/g, "");


        let parts =
            clean.split(":");


        let hour =
            Number(parts[0]) || 0;


        let minute =
            Number(parts[1]) || 0;



        // اصلاح دقیقه
        if (minute > 59) {
            minute = 59;
        }


        // اصلاح ساعت
        if (hour >= 24) {

            hour = 0;

        }


        return (
            String(hour).padStart(2, "0")
            +
            ":"
            +
            String(minute).padStart(2, "0")
        );

    };


    const calculateSleepHours = () => {


        if (
            !sleepingRedux?.bedTime ||
            !sleepingRedux?.wakeTime
        ) {
            return 0;
        }


        const [bedH, bedM] =
            sleepingRedux.bedTime
                .split(":")
                .map(Number);


        const [wakeH, wakeM] =
            sleepingRedux.wakeTime
                .split(":")
                .map(Number);



        if (
            Number.isNaN(bedH) ||
            Number.isNaN(bedM) ||
            Number.isNaN(wakeH) ||
            Number.isNaN(wakeM)
        ) {
            return 0;
        }



        let bedMinutes =
            bedH * 60 + bedM;


        let wakeMinutes =
            wakeH * 60 + wakeM;



        if (wakeMinutes < bedMinutes) {

            wakeMinutes += 24 * 60;

        }


        return Number(
            (
                (wakeMinutes - bedMinutes)
                /
                60
            )
                .toFixed(1)
        );


    };


    const sleepHours =
        calculateSleepHours();


    const progress =
        Math.min(
            sleepHours / 24,
            1
        );


    // save bedtime
    const saveBedTime = async () => {


        const fixedTime =
            normalizeTime(
                bedTimeInput
            );


        setBedTimeInput(
            fixedTime
        );


        dispatch(
            updateSleepingRedux({
                ...sleepingRedux,
                bedTime: fixedTime
            })
        );



        const result =
            await updateSleepingApi(
                sleepingRedux.user_id,
                {
                    bedTime: fixedTime
                }
            );



        if (!result.success) {

            console.log(
                "PATCH bedTime error:",
                result.message
            );

        }

    };


    // save waketime
    const saveWakeTime = async () => {


        const fixedTime =
            normalizeTime(
                wakeTimeInput
            );



        setWakeTimeInput(
            fixedTime
        );



        dispatch(
            updateSleepingRedux({
                ...sleepingRedux,
                wakeTime: fixedTime
            })
        );



        const result =
            await updateSleepingApi(
                sleepingRedux.user_id,
                {
                    wakeTime: fixedTime
                }
            );



        if (!result.success) {

            console.log(
                "PATCH wakeTime error:",
                result.message
            );

        }


    };


    return (

        <View style={styles.page}>


            {/* sleeping box */}
            <View style={styles.card}>


                <View style={styles.badge}>

                    <Text style={styles.badgeText}>
                        خواب شبانه
                    </Text>

                </View>



                <Text style={styles.infoText}>
                    کیفیت خواب شبانه یکی از مهم ترین ارکان سلامتیه و نقش مهمی در ریکاوری بدن داره.
                    من بر اساس برنامه تمرینی و مشخصات بدنیت، مقدار خواب مورد نیازت رو محاسبه کردم تا منظم تر استراحت کنی.
                </Text>



                <View style={styles.divider} />



                <View style={styles.row}>


                    <View>

                        <Text style={styles.label}>
                            تایم خواب پیشنهادی
                        </Text>

                    </View>



                    <View style={styles.valueBox}>

                        <Text style={styles.value}>
                            {suggestedSleepingHour} ساعت
                        </Text>

                    </View>

                </View>

            </View>


            {/* schedule inputs */}
            <View style={styles.inputs}>

                {/* sleeping time */}
                <View style={styles.inputBox}>


                    <Text style={styles.inputLabel}>
                        تایم خوابیدن
                    </Text>


                    <View style={styles.timeInputWrapper}>


                        <TextInput

                            value={bedTimeInput}

                            onChangeText={setBedTimeInput}

                            onBlur={saveBedTime}

                            placeholder="23:00"

                            placeholderTextColor="rgba(255,255,255,0.3)"

                            style={styles.timeInput}

                            keyboardType="numeric"

                        />

                    </View>

                </View>


                {/* wakeup time */}
                <View style={styles.inputBox}>


                    <Text style={styles.inputLabel}>
                        تایم بیداری
                    </Text>



                    <View style={styles.timeInputWrapper}>


                        <TextInput

                            value={wakeTimeInput}

                            onChangeText={setWakeTimeInput}

                            onBlur={saveWakeTime}

                            placeholder="07:00"

                            placeholderTextColor="rgba(255,255,255,0.3)"

                            style={styles.timeInput}

                            keyboardType="numeric"

                        />


                    </View>

                </View>

            </View>


            {/* schedule chart */}
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



                    <Circle

                        cx="110"

                        cy="110"

                        r={radius}

                        stroke="#3b82f6"

                        strokeWidth={10}

                        fill="transparent"

                        strokeDasharray={circumference}

                        strokeDashoffset={
                            circumference * (1 - progress)
                        }

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