import { dietMealsStyles as styles } from '@/components/ui/diet-meals.styles';
import {
    addIngredient,
    removeIngredient,
    updateIngredient
} from '@/services/diet.service';

import {
    addIngredientLocal,
    removeIngredientLocal,
    updateIngredientLocal
} from '@/redux/diet/dietSlice';

import { useState } from 'react';
import {
    Pressable,
    Text,
    TextInput,
    View
} from 'react-native';

import { useDispatch } from 'react-redux';

import { Ionicons } from '@expo/vector-icons';


type Props = {
    meal: any;
    dayIndex: number;
    mealIndex: number;
    dietId: string;
};


export default function DietMealCard({
    meal,
    dayIndex,
    mealIndex,
    dietId
}: Props) {


    const dispatch = useDispatch();


    const [open, setOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState("");
    const [activeIngredient, setActiveIngredient] = useState<number | null>(null);

    const mealTitle =
        meal.mealName === "breakfast"
            ? "صبحانه"
            : meal.mealName === "lunch"
                ? "ناهار"
                : "شام";



    // ➕ افزودن ماده غذایی
    const handleAddIngredient = async () => {

        const newIngredient = `ماده ${meal.ingredients.length + 1}`;


        // optimistic update
        dispatch(
            addIngredientLocal({
                dayIndex,
                mealIndex,
                ingredient: newIngredient
            })
        );


        try {

            await addIngredient(
                dietId,
                dayIndex,
                meal.mealName,
                newIngredient
            );


        } catch (error) {

            console.log("ADD INGREDIENT ERROR:", error);

        }

    };

    // ✏️ شروع ویرایش
    const startEdit = (
        index: number,
        value: string
    ) => {

        setEditingIndex(index);

        setEditValue(value);

        setActiveIngredient(null);

    };

    // ✅ تایید ویرایش
    const confirmEdit = async (
        index: number
    ) => {


        dispatch(
            updateIngredientLocal({
                dayIndex,
                mealIndex,
                ingredientIndex: index,
                ingredient: editValue
            })
        );


        try {

            await updateIngredient(
                dietId,
                dayIndex,
                meal.mealName,
                index,
                editValue
            );


        } catch (error) {

            console.log("UPDATE INGREDIENT ERROR:", error);

        }


        setEditingIndex(null);

        setEditValue("");

        setActiveIngredient(null);

    };

    // 🗑 حذف ماده غذایی
    const handleRemoveIngredient = async (
        index: number
    ) => {


        setActiveIngredient(null);


        dispatch(
            removeIngredientLocal({
                dayIndex,
                mealIndex,
                ingredientIndex: index
            })
        );


        try {

            await removeIngredient(
                dietId,
                dayIndex,
                meal.mealName,
                index
            );


        } catch (error) {

            console.log("REMOVE INGREDIENT ERROR:", error);

        }

    };


    // باز و بسته کردن دکمه‌ها
    const toggleActions = (
        index: number
    ) => {

        setActiveIngredient(
            activeIngredient === index
                ? null
                : index
        );

    };

    return (

        <View style={styles.mealBox}>

            <Pressable
                style={styles.mealHeader}
                onPress={() => setOpen(!open)}
            >

                <Text style={styles.mealTitle}>
                    {mealTitle}
                </Text>

                {/* up / down array */}
                <Text style={styles.arrow}>

                    {
                        open
                            ? (
                                <Ionicons
                                    name="chevron-up"
                                    size={20}
                                    color="white"
                                />
                            )
                            : (
                                <Ionicons
                                    name="chevron-down"
                                    size={20}
                                    color="white"
                                />
                            )
                    }

                </Text>

            </Pressable>

            {
                open && (


                    <View style={styles.ingredientsBox}>


                        {
                            meal.ingredients.map(
                                (
                                    ingredient: string,
                                    index: number
                                ) => (

                                    <View
                                        key={`${ingredient}-${index}`}
                                        style={styles.ingredientRow}
                                    >


                                        {
                                            editingIndex === index
                                                ?

                                                <View style={{ width: '100%' }}>


                                                    {/* ingredient text */}
                                                    <TextInput
                                                        value={editValue}
                                                        onChangeText={setEditValue}
                                                        style={styles.ingredientInput}
                                                        autoFocus
                                                    />


                                                    <View style={styles.actions}>

                                                        {/* success */}
                                                        <Pressable
                                                            style={styles.successButton}
                                                            onPress={() => confirmEdit(index)}
                                                        >
                                                            <Ionicons
                                                                name="checkmark-circle-outline"
                                                                size={20}
                                                                color="currentColor"
                                                                style={styles.SuccessButtonIcon}
                                                            />
                                                        </Pressable>

                                                    </View>

                                                </View>


                                                :


                                                <View style={{ width: '100%' }}>

                                                    {/* ingredient text */}
                                                    <Pressable

                                                        onPress={() =>
                                                            toggleActions(index)
                                                        }

                                                    >

                                                        <Text style={styles.ingredientText}>
                                                            {ingredient}
                                                        </Text>

                                                    </Pressable>


                                                    {
                                                        activeIngredient === index && (

                                                            <View style={styles.actions}>


                                                                {/* edit button */}
                                                                <Pressable
                                                                    style={styles.editButton}
                                                                    onPress={() => startEdit(index, ingredient)}
                                                                >
                                                                    <Ionicons
                                                                        name="create-outline"
                                                                        size={18}
                                                                        color="currentColor"
                                                                        style={styles.editButtonIcon}
                                                                    />
                                                                </Pressable>


                                                                {/* delete button */}
                                                                <Pressable
                                                                    style={styles.deleteButton}
                                                                    onPress={() => handleRemoveIngredient(index)}
                                                                >
                                                                    <Ionicons
                                                                        name="trash-outline"
                                                                        size={18}
                                                                        color="currentColor"
                                                                        style={styles.deleteButtonIcon}
                                                                    />
                                                                </Pressable>

                                                            </View>

                                                        )
                                                    }

                                                </View>

                                        }


                                    </View>

                                )
                            )
                        }


                        <Pressable

                            style={styles.addButton}

                            onPress={handleAddIngredient}

                        >

                            <Text style={styles.addText}>

                                + افزودن ماده غذایی

                            </Text>

                        </Pressable>

                    </View>

                )
            }

        </View>

    );

}