import { dietPageStyles as styles } from '@/components/ui/diet-page.styles';

import { Modal, Pressable, Text, View } from "react-native";
import { useSelector } from 'react-redux';

import { translations } from '@/localization';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

type Props = {
    visible: boolean,
    onClose: () => void
}

export default function NutritionBox({ visible, onClose }: Props) {

    const user = useSelector((state: any) => state.user);

    const age = Number(user?.age || 0);
    const height = Number(user?.height || 0);
    const weight = Number(user?.weight || 0);

    const isAdult = age >= 18;

    const bmi =
        isAdult && height > 0 && weight > 0
            ? weight / Math.pow(height / 100, 2)
            : 0;


    let weightStatus:
        | 'underweight'
        | 'normal'
        | 'overweight'
        | 'obese'
        | 'unknown' = 'unknown';

    if (isAdult && bmi > 0) {

        if (bmi < 18.5) {
            weightStatus = 'underweight';

        } else if (bmi < 25) {
            weightStatus = 'normal';

        } else if (bmi < 30) {
            weightStatus = 'overweight';

        } else {
            weightStatus = 'obese';
        }
    }

    const bmr =
        isAdult && age > 0 && height > 0 && weight > 0
            ? (10 * weight) + (6.25 * height) - (5 * age) + 5
            : 0;


    const activityMultiplier = 1.55;

    const tdee = bmr * activityMultiplier;

    let calories = 0;

    if (tdee > 0) {

        switch (weightStatus) {

            case 'underweight':
                calories = tdee + 300;
                break;

            case 'normal':
                calories = tdee;
                break;

            case 'overweight':
            case 'obese':
                calories = tdee - 300;
                break;

            default:
                calories = tdee;
        }
    }

    calories = Math.max(0, Math.round(calories));

    // Protein

    const protein =
        isAdult && weight > 0
            ? Math.round(weight * 1.6)
            : 0;

    // Fat

    const fat =
        isAdult && weight > 0
            ? Math.round(weight * 0.8)
            : 0;

    // Carbohydrates

    const proteinCalories = protein * 4;
    const fatCalories = fat * 9;

    const remainingCalories =
        calories - proteinCalories - fatCalories;

    const carbohydrates =
        remainingCalories > 0
            ? Math.round(remainingCalories / 4)
            : 0;

    const info = [
        {
            id: 0,
            title: translations.diet.calorieTitle,
            value: calories
        },
        {
            id: 1,
            title: translations.diet.proteinTitle,
            value: protein
        },
        {
            id: 2,
            title: translations.diet.carbohydratesTitle,
            value: carbohydrates
        }
    ];

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            statusBarTranslucent
        >
            <View style={styles.modalContainer}>

                {/* Blur کل صفحه */}
                <BlurView
                    intensity={80}
                    tint="dark"
                    style={styles.blurBackground}
                />

                {/* Nutrition Box */}
                <View style={styles.nutritionBox}>

                    {/* Close */}
                    <View style={{ width: "100%", height: 40, flexDirection: "row" }}>

                        <Pressable
                            onPress={onClose}
                        >
                            <Ionicons
                                name="close"
                                size={24}
                                color="#fff"
                            />
                        </Pressable>

                    </View>


                    <Text style={styles.boxText}>
                        {translations.diet.boxTitle}
                    </Text>

                    <View style={styles.infoBox}>
                        {
                            info.map((item: any) => (
                                <View
                                    style={styles.infoItem}
                                    key={item.id}
                                >
                                    <Text style={styles.itemTitle}>
                                        {item.title}
                                    </Text>

                                    <Text style={styles.itemValue}>
                                        {item.value}g
                                    </Text>
                                </View>
                            ))
                        }
                    </View>

                </View>

            </View>
        </Modal>
    )
}