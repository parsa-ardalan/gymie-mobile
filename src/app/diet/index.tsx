import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { FlatList, Image, Pressable, ScrollView, Text, View } from 'react-native';

import breakfast from '@/data/diet/breakfast.json';
import dinner from '@/data/diet/dinner.json';
import lunch from '@/data/diet/lunch.json';

import { dietPageStyles as styles } from '@/components/ui/diet-page.styles';
import { useSelector } from 'react-redux';

type MealItem = {
  id?: string | number;
  name: string;
  ingradient: string[];
};

export default function Diet() {

  const profile = useSelector((state: any) => state.user)

  const router = useRouter();

  const calories = useMemo(() => {
    return (10 * profile.weight + 6.25 * profile.height - 5 * profile.age) * 1.7;
  }, []);

  const protein = useMemo(() => {
    return profile.weight * 1.6;
  }, []);

  const infoText = useMemo(() => {
    return `با توجه به مشخصات فردیت، باید روزانه ${calories.toFixed(0)} کالری و ${protein.toFixed(0)} گرم پروتئین مصرف کنی... توجه داشته باش اگر کالری بیشتری دریافت کنی چاق میشی، اگر کمتر دریافت کنی، چربی میسوزونی.`;
  }, [calories, protein]);

  const athleteNutritionFacts = useMemo(
    () => [
      'پروتئین برای ترمیم و رشد عضلات ضروری است',
      'هر ۱ گرم پروتئین = ۴ کالری',
      'عضله بیشتر یعنی متابولیسم بالاتر',
      'تمرین قدرتی به حفظ و رشد عضله کمک می‌کند',
      'کربوهیدرات سوخت اصلی تمرین شدید است',
      'گلیکوژن شکل ذخیره کربوهیدرات در عضلات است',
      'وعده‌های پرپروتئین سیری طولانی‌تر ایجاد می‌کنند',
      'تخم‌مرغ منبع کامل اسیدهای آمینه است',
      'پروتئین وی سریع جذب می‌شود',
      'کازئین آهسته جذب می‌شود و برای قبل خواب مناسب است',
      'کمبود پروتئین می‌تواند باعث تحلیل عضله شود',
      'خواب کافی برای ریکاوری عضلات مهم است',
      'آب کافی برای عملکرد ورزشی بهتر ضروری است',
      'آب کافی به حفظ عملکرد ورزشی کمک می‌کند',
      'عضله حتی در حالت استراحت هم کالری می‌سوزاند',
      'ماهی‌های چرب دارای امگا‑۳ برای کاهش التهاب هستند',
      'حبوبات منبع پروتئین و فیبر برای انرژی پایدارند',
      'موز منبع خوب پتاسیم برای عملکرد عضلات است',
      'سیب‌زمینی یکی از سیرکننده‌ترین منابع کربوهیدرات است',
      'خوردن روزانه یک سیب می‌تواند به فیبر و سلامت بدن کمک کند',
      'کاهش شدید کالری می‌تواند قدرت و عملکرد را کم کند',
      'پروتئین کافی کمک می‌کند در رژیم عضله حفظ شود',
    ],
    []
  );

  const randomText = useMemo(() => {
    const rand = Math.floor(Math.random() * athleteNutritionFacts.length);
    return athleteNutritionFacts[rand];
  }, [athleteNutritionFacts]);

  const handleMealPress = (meal: MealItem) => {
    router.push({
      pathname: '/diet/[slug]',
      params: {
        slug: meal.name,
        name: meal.name,
        ingradient: JSON.stringify(meal.ingradient),
      },
    });
  };

  const renderMealSection = (title: string, data: MealItem[]) => {
    const listData = [
      ...data,
      {
        id: 'add-new',
        name: 'افزودن وعده جدید',
        ingradient: [],
      },
    ];

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>

        <FlatList
          horizontal
          data={listData}
          keyExtractor={(item, index) => String(item.id ?? index)}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.mealsList}
          renderItem={({ item }) => {
            const isAddCard = item.id === 'add-new';

            if (isAddCard) {
              return (
                <View style={[styles.mealCard, styles.addMealCard]}>
                  <Text style={styles.addMealPlus}>+</Text>
                  <Text style={styles.addMealText}>افزودن وعده جدید</Text>
                </View>
              );
            }

            return (
              <Pressable
                style={styles.mealCard}
                onPress={() => handleMealPress(item)}
              >
                <View style={styles.mealIconWrapper}>
                  <Image
                    source={require('@/assets/icons/diet.png')}
                    style={styles.mealIcon}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.mealNameWrapper}>
                  <Text style={styles.mealName} numberOfLines={1}>
                    {item.name}
                  </Text>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.page}>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>{infoText}</Text>
        </View>

        <View style={styles.mealsWrapper}>
          {renderMealSection('', breakfast as MealItem[])}
          {renderMealSection('', lunch as MealItem[])}
          {renderMealSection('', dinner as MealItem[])}
        </View>

        <View style={styles.tipBox}>
          <Text style={styles.tipText}>{randomText}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
