import { workoutPageStyles as styles } from '@/components/ui/workout-page.styles';
import { setWorkoutMoves } from '@/redux/workouts/workoutsSlice';
import { getWorkouts } from '@/services/workouts.service'; // ✅
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function Workout() {

  const router = useRouter();
  const dispatch = useDispatch();
  const hasFetched = useRef(false);

  useEffect(() => {

    if (hasFetched.current) return;

    const fetchWorkouts = async () => {
      const result = await getWorkouts();

      if (result.success && result.data?.length) {

        dispatch(setWorkoutMoves(result.data[0]));

      } else {

        console.log(
          "WORKOUT FETCH ERROR:",
          "message" in result ? result.message : "خطای نامشخص"
        );

      }
    };

    fetchWorkouts();
    hasFetched.current = true;

  }, []);

  const daysName = [
    'شنبه', 'یکشنبه', 'دوشنبه',
    'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'
  ];

  const workouts = useSelector((state: any) => state.workouts);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.page}>

        {workouts.days.map((day: any) => (
          <Pressable
            key={day.dayOfWeek}
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: '/workout/[slug]',
                params: { slug: String(day.dayOfWeek) },
              })
            }
          >
            <View style={styles.cardContent}>

              <View style={styles.iconContainer}>
                <Image
                  source={require('@/assets/icons/workout.png')}
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

      </View>
    </ScrollView>
  );
}