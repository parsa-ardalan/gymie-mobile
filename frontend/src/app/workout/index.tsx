import { workoutPageStyles as styles } from '@/components/ui/workout-page.styles';
import { translations } from '@/localization';

import { useRouter } from 'expo-router';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View
} from 'react-native';

import { useSelector } from 'react-redux';

import WeekdaySkeleton from "@/components/skeletons/Weekday";

export default function Workout() {

  const router = useRouter();

  const workouts = useSelector(
    (state: any) => state.workouts
  );

  if (!workouts._id) {

    return (
      <WeekdaySkeleton />
    )
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >

      <View style={styles.page}>

        {workouts.days.map((day: any) => (

          <Pressable
            key={day.dayOfWeek}
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: '/workout/[slug]',
                params: {
                  slug: String(day.dayOfWeek),
                },
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
                  {translations.workouts.days[day.dayOfWeek]}
                </Text>

              </View>

            </View>

          </Pressable>

        ))}

      </View>

    </ScrollView>
  );
}