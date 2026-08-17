import { workoutPageStyles as styles } from '@/components/ui/workout-page.styles';
import { useEffect, useRef } from 'react';
import {
    Animated,
    Pressable,
    ScrollView,
    View,
} from 'react-native';


export default function WeekdaySkeleton() {

    const days = [0, 1, 2, 3, 4, 5, 6];

    const opacity = useRef(
        new Animated.Value(0.4)
    ).current;


    useEffect(() => {

        Animated.loop(

            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),

                Animated.timing(opacity, {
                    toValue: 0.4,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])

        ).start();


        return () => {
            opacity.stopAnimation();
        };

    }, []);


    return (
        <ScrollView
            contentContainerStyle={styles.container}
        >

            <View style={styles.page}>

                {days.map((day) => (

                    <Animated.View
                        key={day}
                        style={{
                            opacity,
                        }}
                    >

                        <Pressable style={styles.card} />

                    </Animated.View>

                ))}

            </View>

        </ScrollView>
    );
}