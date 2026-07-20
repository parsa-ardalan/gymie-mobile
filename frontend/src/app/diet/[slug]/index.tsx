import DietMealCard from '@/components/diet/DietMealCard';
import { dietMealsStyles as styles } from '@/components/ui/diet-meals.styles';

import { useLocalSearchParams } from 'expo-router';
import {
  ScrollView,
  Text,
  View
} from 'react-native';

import { useSelector } from 'react-redux';

export default function DietMeal() {

  const { slug } = useLocalSearchParams();

  const diet = useSelector(
    (state: any) => state.diet
  );

  const day =
    diet.days?.find(
      (day: any) =>
        day.dayOfWeek === Number(slug)
    );


  if (!day) {

    return (

      <View style={styles.page}>

        <Text style={styles.dayTitle}>
          برنامه غذایی پیدا نشد
        </Text>

      </View>

    );

  }

  return (

    <ScrollView
      contentContainerStyle={
        styles.container
      }

    >

      <View
        style={styles.page}
      >

        <Text
          style={styles.dayTitle}
        >

          برنامه غذایی

        </Text>

        <Text
          style={styles.dayIndex}
        >

          روز {Number(slug) + 1}

        </Text>

        {
          day.meals.map(
            (
              meal: any,
              index: number
            ) => (

              <DietMealCard

                key={index}

                meal={meal}

                dayIndex={Number(slug)}

                mealIndex={index}

                dietId={diet._id}

              />

            )
          )
        }

      </View>

    </ScrollView>

  );
}