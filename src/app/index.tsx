import { homePageStyles as styles } from '@/components/ui/home-page.styles';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

type HighlightItem = {
  id: number;
  name: string;
  icon: any;
  url: string;
};

type ActivityItem = {
  id: number;
  name: string;
  icon: any;
  href: string;
};

export default function HomePage() {
  const router = useRouter();

  const welcomeText = [
    'برنامه امروزت چیه؟',
    'میخوای باهم تمرین کنیم؟',
    'حالت چطوره؟ رو مود ورزش هستی؟',
    'میبینم ک میخوای ورزش کنی!',
  ];

  const highlights: HighlightItem[] = [
    {
      id: 0,
      name: 'settings',
      icon: require('@/assets/icons/settings.png'),
      url: '/settings',
    },
    {
      id: 1,
      name: 'sleep',
      icon: require('@/assets/icons/sleeping.png'),
      url: '/sleeping',
    },
    {
      id: 2,
      name: 'profile',
      icon: require('@/assets/icons/profile.png'),
      url: '/profile',
    },
    {
      id: 3,
      name: 'learn',
      icon: require('@/assets/icons/blogs.png'),
      url: '/blogs',
    },
  ];

  const activity: ActivityItem[] = [
    {
      id: 0,
      name: 'برنامه تمرینی',
      icon: require('@/assets/icons/workout.png'),
      href: '/workout',
    },
    {
      id: 1,
      name: 'رژیم غذایی',
      icon: require('@/assets/icons/diet.png'),
      href: '/diet',
    },
  ];

  const randomIndex = useMemo(
    () => Math.floor(Math.random() * welcomeText.length),
    []
  );

  const handleNavigate = (path: string) => {
    router.push(path as any);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.page}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.welcomeContainer}>
        <View style={styles.logoSection}>
          <Image
            source={require('@/assets/icons/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.title}>سلام! خوش اومدی</Text>
          <Text style={styles.subtitle}>{welcomeText[randomIndex]}</Text>
        </View>
      </View>

      <View style={styles.highlightsContainer}>
        {highlights.map((item) => (
          <Pressable
            key={item.id}
            style={styles.highlightItem}
            onPress={() => handleNavigate(item.url)}
          >
            <View style={styles.highlightIconWrapper}>
              <Image
                source={item.icon}
                style={styles.highlightIcon}
                resizeMode="contain"
              />
            </View>
          </Pressable>
        ))}
      </View>

      <View style={styles.activitySection}>
        {activity.map((tab) => (
          <Pressable
            key={tab.id}
            style={styles.activityCard}
            onPress={() => handleNavigate(tab.href)}
          >
            <View style={styles.activityCardContent}>
              <View style={styles.activityIconContainer}>
                <Image
                  source={tab.icon}
                  style={styles.activityIcon}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.activityTitleContainer}>
                <Text style={styles.activityTitle} numberOfLines={1}>
                  {tab.name}
                </Text>
              </View>
            </View>
          </Pressable>
        ))}

        <Pressable
          style={styles.aiCoachCard}
          onPress={() => handleNavigate('/coach')}
        >
          <View style={styles.activityCardContent}>
            <View style={styles.activityIconContainer}>
              <Image
                source={require('@/assets/icons/profile.png')}
                style={styles.activityIcon}
                resizeMode="contain"
              />
            </View>

            <View style={styles.activityTitleContainer}>
              <Text style={styles.aiCoachTitle} numberOfLines={1}>
                مربی هوش مصنوعی
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}
