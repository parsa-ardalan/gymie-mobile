import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { mealPageStyles as styles } from '@/components/ui/meal-page.styles';

export default function Meal() {
  const params = useLocalSearchParams<{
    slug?: string;
    name?: string;
    ingradient?: string;
  }>();

  const mealName = useMemo(() => {
    return typeof params.name === 'string' ? params.name : 'بدون نام';
  }, [params.name]);

  const ingredients = useMemo(() => {
    if (typeof params.ingradient !== 'string') return [];

    try {
      const parsed = JSON.parse(params.ingradient);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [params.ingradient]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.page}>
        <View style={styles.headerCard}>
          <Text style={styles.title}>{mealName}</Text>
        </View>

        <View style={styles.ingredientsWrapper}>
          {ingredients.map((ing, index) => (
            <View style={styles.ingredientCard} key={`${String(ing)}-${index}`}>
              <Text style={styles.ingredientText}>{String(ing)}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
