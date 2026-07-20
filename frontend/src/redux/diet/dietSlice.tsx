import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type Meal = {
    mealName: string;
    ingredients: string[];
};


type Day = {
    dayOfWeek: number;
    meals: Meal[];
};


type DietState = {
    _id: string | null;
    user_id: string | null;
    days: Day[];
};


const initialState: DietState = {

    _id: null,

    user_id: null,

    days: [],

};



const dietSlice = createSlice({

    name: "diet",

    initialState,


    reducers: {


        setDiet: (
            _,
            action: PayloadAction<DietState>
        ) => {

            return action.payload;

        },



        addIngredientLocal: (

            state,

            action: PayloadAction<{
                dayIndex: number;
                mealIndex: number;
                ingredient: string;
            }>

        ) => {


            const {
                dayIndex,
                mealIndex,
                ingredient
            } = action.payload;



            const meal =
                state.days?.[dayIndex]
                    ?.meals?.[mealIndex];



            if (meal) {

                meal.ingredients.push(
                    ingredient
                );

            }

        },



        removeIngredientLocal: (

            state,

            action: PayloadAction<{
                dayIndex: number;
                mealIndex: number;
                ingredientIndex: number;
            }>

        ) => {


            const {
                dayIndex,
                mealIndex,
                ingredientIndex
            } = action.payload;



            const meal =
                state.days?.[dayIndex]
                    ?.meals?.[mealIndex];



            if (meal) {

                meal.ingredients.splice(
                    ingredientIndex,
                    1
                );

            }

        },



        updateIngredientLocal: (

            state,

            action: PayloadAction<{
                dayIndex:number;
                mealIndex:number;
                ingredientIndex:number;
                ingredient:string;
            }>

        ) => {


            const {
                dayIndex,
                mealIndex,
                ingredientIndex,
                ingredient
            } = action.payload;



            const meal =
                state.days?.[dayIndex]
                    ?.meals?.[mealIndex];



            if(meal){

                meal.ingredients[ingredientIndex] =
                    ingredient;

            }

        },


    }

});




export const {

    setDiet,

    addIngredientLocal,

    removeIngredientLocal,

    updateIngredientLocal


} = dietSlice.actions;



export default dietSlice.reducer;