import { workoutPlanStyles as styles } from '@/components/ui/workout-plan.styles';

import { BlurView } from 'expo-blur';
import { useEffect, useState } from 'react';
import {
    Modal,
    Text,
    View
} from 'react-native';

import Svg, {
    Circle,
} from 'react-native-svg';

import { translations } from '@/localization';


type props = {
    visible: boolean,
    timer: number,
    onFinish: () => void
}


export default function TimerModal({ visible, timer, onFinish }: props) {

    const [remainingTime, setRemainingTime] = useState(timer);

    // timer
    useEffect(() => {

        if (!visible) {
            return;
        }

        setRemainingTime(timer);

        const interval = setInterval(() => {

            setRemainingTime((prev) => {

                if (prev <= 1) {
                    clearInterval(interval);

                    return 0;
                }

                return prev - 1;
            });

        }, 1000);

        return () => {
            clearInterval(interval);
        };

    }, [visible, timer]);

    // close modal
    useEffect(() => {

        if (visible && remainingTime === 0) {
            onFinish();
        }

    }, [remainingTime, visible]);

    const circleSize = 45;

    const strokeWidth = 3;

    const radius = (circleSize - strokeWidth) / 2;

    const circumference = 2 * Math.PI * radius;

    const progress = timer > 0 ? remainingTime / timer : 0;


    const strokeDashoffset = circumference * (1 - progress);

    const minutes = Math.floor(remainingTime / 60);

    const seconds = remainingTime % 60;

    const formattedTime = `${minutes}:${String(seconds).padStart(2, '0')}`;


    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
        >
            <BlurView
                intensity={50}
                tint="dark"
                style={styles.timerModal}
            >


                {/* Info - Right */}
                <View style={styles.infoSection}>

                    <Text style={styles.timerTitle}>
                       {translations.workouts.plan.restText}
                    </Text>

                </View>

                {/* Timer - Left */}
                <View style={styles.timerSection}>

                    <View style={styles.timerCircle}>

                        <Svg
                            width={circleSize}
                            height={circleSize}
                        >

                            {/* Background */}

                            <Circle
                                cx={circleSize / 2}
                                cy={circleSize / 2}
                                r={radius}
                                stroke="#2A2A2A"
                                strokeWidth={strokeWidth}
                                fill="none"
                            />

                            {/* Progress */}
                            <Circle
                                cx={circleSize / 2}
                                cy={circleSize / 2}
                                r={radius}
                                stroke="#2196F3"
                                strokeWidth={strokeWidth}
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                transform={`
                            rotate(-90 ${circleSize / 2} ${circleSize / 2})
                        `}
                            />

                        </Svg>

                        <View style={styles.timerNumberContainer}>

                            <Text style={styles.timerNumber}>
                                {formattedTime}
                            </Text>

                        </View>

                    </View>

                </View>

            </BlurView>
        </Modal>
    );
}