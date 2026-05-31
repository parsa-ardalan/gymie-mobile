import { workoutPageStyles as styles } from '@/components/ui/workout-page.styles';
import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

type WeekdayItem = {
    id: string | number;
    name: string;
};

type RootState = {
    weekday: WeekdayItem[];
};

export default function Workout() {
    const router = useRouter();
    const weekday = useSelector((state: RootState) => state.weekday);

    const handleNavigate = (dayName: string) => {
        router.push({
            pathname: '/workout/[slug]',
            params: {
                slug: 'day',
                weekday: dayName,
            },
        });
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.page}>
                {weekday.map((w) => (
                    <Pressable
                        key={w.id}
                        style={styles.card}
                        onPress={() => handleNavigate(w.name)}
                    >
                        <View style={styles.cardContent}>
                            <View style={styles.iconContainer}>
                                <Image
                                    source={require('@/assets/icons/workout.png')}
                                    style={styles.icon}
                                    resizeMode="contain"
                                />
                            </View>

                            <View style={styles.titleContainer}>
                                <Text style={styles.title} numberOfLines={1}>
                                    {w.name}
                                </Text>
                            </View>
                        </View>
                    </Pressable>
                ))}
            </View>
        </ScrollView>
    );
}
