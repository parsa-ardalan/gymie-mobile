import { workoutPlanStyles as styles } from '@/components/ui/workout-plan.styles';
import { addPercent } from '@/redux/percent/percentSlice';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


type Props = {
    dayIndex: number;
};


export default function WorkoutProgress({
    dayIndex
}: Props) {

    const dispatch = useDispatch();

    const workouts = useSelector((state: any) => state.workouts);
    const moves = workouts.days[dayIndex]?.exercises || [];
    const totalMoves = moves.length;

    const doneMoves =
        moves.filter(
            (move: any) => move.isDone === true
        ).length;


    const percentage =
        totalMoves > 0
            ? Math.round((doneMoves / totalMoves) * 100)
            : 0;

    useEffect(() => {
        dispatch(
            addPercent({
                day: dayIndex,
                percentNumber: percentage,
            })
        );
    }, [percentage, dayIndex, dispatch]);

    return (

        <View style={styles.percentBox}>

            <Text style={styles.percentNumberText}>
                {percentage}%
            </Text>


            <View style={styles.percentBarBackground}>

                <View
                    style={[
                        styles.percentBarFill,
                        {
                            width: `${percentage}%`
                        }
                    ]}
                />

            </View>

        </View>

    );

}