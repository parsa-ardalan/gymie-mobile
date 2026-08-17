import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setWorkoutMoves } from '@/redux/workouts/workoutsSlice';
import { getWorkouts } from '@/services/workouts.service';

import { setDiet } from '@/redux/diet/dietSlice';
import { getDiet } from '@/services/diet.service';

import { updateSleeping } from "@/redux/sleeping/sleepingSlice";
import { getSleeping } from "@/services/sleeping.service";


export default function GetAPI() {

    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    useEffect(() => {

        const fetchData = async () => {

            try {

                if (!user?._id) return;


                const user_id = user._id;


                const [
                    workouts,
                    diet,
                    sleeping
                ] = await Promise.all([

                    getWorkouts(user_id),

                    getDiet(user_id),

                    getSleeping(user_id),

                ]);


                // workouts
                if (
                    workouts.success &&
                    workouts.data
                ) {

                    dispatch(
                        setWorkoutMoves(
                            workouts.data
                        )
                    );

                }


                // diet
                if (
                    diet.success &&
                    diet.data
                ) {

                    dispatch(
                        setDiet(
                            diet.data
                        )
                    );

                }


                // sleeping
                if (
                    sleeping.success &&
                    sleeping.data
                ) {

                    dispatch(
                        updateSleeping(
                            sleeping.data
                        )
                    );

                }


            } catch (error) {

                console.log(
                    "GET API ERROR:",
                    error
                );

            }

        };

        fetchData();

    }, [user?._id]);


    return null;
}