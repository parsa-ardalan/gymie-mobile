import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { setWorkoutMoves } from '@/redux/workouts/workoutsSlice';
import { getWorkouts } from '@/services/workouts.service';

import { setDiet } from '@/redux/diet/dietSlice';
import { getDiet } from '@/services/diet.service';

import { updateSleepingRedux } from "@/redux/sleeping/sleepingSlice";
import { getSleeping } from "@/services/sleeping.service";

export default function GetAPI() {

    const hasFetched = useRef(false);
    const dispatch = useDispatch();

    useEffect(() => {

        const fetchData = async () => {

            try {

                const [workouts, diet, sleeping] = await Promise.all([
                    getWorkouts(),
                    getDiet(),
                    getSleeping(),
                ]);

                // 🟡 logs
                console.log("WORKOUTS:", workouts.data);
                console.log("DIET:", diet.data);
                console.log("SLEEPING:", sleeping.data);

                // 🟢 workouts
                if (workouts.success && workouts.data?.length) {
                    dispatch(setWorkoutMoves(workouts.data));
                }

                // 🟢 diet
                if (diet.success && diet.data?.length) {
                    dispatch(setDiet(diet.data));
                }

                // 🟢 sleeping
                if (sleeping.success) {
                    dispatch(updateSleepingRedux(sleeping.data));
                }

            } catch (error) {
                console.log("GET API ERROR:", error);
            }

        };

        fetchData();

    }, []);

    return null;
}