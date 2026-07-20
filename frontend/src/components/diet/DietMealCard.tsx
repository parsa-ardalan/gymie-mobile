import { addIngredientApi, removeIngredientApi, updateIngredientApi } from '@/api/dietApi';
import { dietMealsStyles as styles } from '@/components/ui/diet-meals.styles';

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


    const mealTitle =

        meal.mealName === 'breakfast'

            ? 'صبحانه'

            :

            meal.mealName === 'lunch'

                ? 'ناهار'

                :

                'شام';


    const addIngredient = async () => {
        
        const newIngredient = `ماده ${meal.ingredients.length + 1}`;
        // redux (optimistic)
        dispatch(
            addIngredientLocal({
                dayIndex,
                mealIndex,
                ingredient: newIngredient
            })
        );

        try {
            await addIngredientApi(
                dietId,
                dayIndex,
                meal.mealName,
                newIngredient
            );
        } catch (e) {
            console.log("ADD ERROR", e);
        }
    };

    const startEdit = (index: number, value: string) => {
        setEditingIndex(index);
        setEditValue(value);
        setActiveIngredient(null);
    };

    const confirmEdit = async (index: number) => {

        dispatch(
            updateIngredientLocal({
                dayIndex,
                mealIndex,
                ingredientIndex: index,
                ingredient: editValue
            })
        );

        try {
            await updateIngredientApi(
                dietId,
                dayIndex,
                meal.mealName,
                index,
                editValue
            );
        } catch (e) {
            console.log("UPDATE ERROR", e);
        }

        setEditingIndex(null);
        setEditValue("");
        setActiveIngredient(null);
    };

    const removeIngredient = async (index: number) => {

        setActiveIngredient(null);

        dispatch(
            removeIngredientLocal({
                dayIndex,
                mealIndex,
                ingredientIndex: index
            })
        );

        try {
            await removeIngredientApi(
                dietId,
                dayIndex,
                meal.mealName,
                index
            );
        } catch (e) {
            console.log("DELETE ERROR", e);
        }
    };


    // buttons modal
    const [activeIngredient, setActiveIngredient] = useState<number | null>(null);

    const toggleActions = (index: number) => {

        if (activeIngredient === index) {

            setActiveIngredient(null);

        } else {

            setActiveIngredient(index);

        }

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
                            ?
                            (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ color: "white", width: 20, height: 20 }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                </svg>

                            )
                            :
                            (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ color: "white", width: 20, height: 20 }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>

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
                                                            onPress={() =>
                                                                confirmEdit(index)
                                                            }
                                                        >

                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                                                stroke="currentColor"
                                                                style={styles.SuccessButtonIcon}
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                            </svg>

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

                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none" viewBox="0 0 24 24"
                                                                        strokeWidth={1.5} stroke="currentColor"
                                                                        style={styles.editButtonIcon}
                                                                    >
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                                    </svg>

                                                                </Pressable>


                                                                {/* delete button */}
                                                                <Pressable

                                                                    style={styles.deleteButton}

                                                                    onPress={() =>
                                                                        removeIngredient(index)
                                                                    }

                                                                >

                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none" viewBox="0 0 24 24"
                                                                        strokeWidth={1.5} stroke="currentColor"
                                                                        style={styles.deleteButtonIcon}
                                                                    >
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                    </svg>


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

                            onPress={addIngredient}

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