import { dietPageStyles as styles } from '@/components/ui/diet-page.styles';
import { useRouter } from 'expo-router';
import {
    Image,
    Pressable,
    ScrollView,
    Text,
    View
} from 'react-native';
import { useSelector } from 'react-redux';

import NutritionBox from "@/components/diet/NutritionBox";
import WeekdaySkeleton from '@/components/skeletons/Weekday';

import { translations } from '@/localization';
import { useEffect, useState } from 'react';

let nutritionModalShown = false;

export default function Diet() {

    const router = useRouter();

    const diet = useSelector(
        (state: any) => state.diet
    );

    const [isModalVisible, setVisible] = useState(
        !nutritionModalShown
    );

    useEffect(() => {
        nutritionModalShown = true;
    }, []);

    if (!diet._id) {
        return (
            <WeekdaySkeleton />
        );
    }

    const daysName = translations.diet.days;


    return (

        <ScrollView
            contentContainerStyle={styles.page}
            showsVerticalScrollIndicator={false}
        >

            <NutritionBox visible={isModalVisible} onClose={() => { setVisible(false) }} />

            {diet.days?.map((day: any) => (

                <Pressable
                    key={day.dayOfWeek}
                    style={styles.card}
                    onPress={() =>
                        router.push({
                            pathname: '/diet/[slug]',
                            params: {
                                slug: String(day.dayOfWeek)
                            },
                        })
                    }
                >

                    <View style={styles.cardContent}>

                        <View style={styles.iconContainer}>

                            <Image
                                source={require('@/assets/icons/diet.png')}
                                style={styles.icon}
                            />

                        </View>

                        <View style={styles.titleContainer}>

                            <Text style={styles.title}>
                                {daysName[day.dayOfWeek]}
                            </Text>

                        </View>

                    </View>

                </Pressable>
            ))}

        </ScrollView>
    );
}