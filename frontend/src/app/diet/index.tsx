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


export default function Diet() {

  const router = useRouter();

  const daysName = [
    'شنبه',
    'یکشنبه',
    'دوشنبه',
    'سه‌شنبه',
    'چهارشنبه',
    'پنجشنبه',
    'جمعه'
  ];


  const diet = useSelector(
    (state: any) => state.diet
  );



  return (

    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.page}>


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


      </View>

    </ScrollView>

  );
}