import { workoutPlanStyles as styles } from '@/components/ui/workout-plan.styles';
import AddExerciseModal from '@/components/workouts/AddExerciseModal';
import ExerciseCard from '@/components/workouts/ExerciseCard';
import WorkoutProgress from '@/components/workouts/WorkoutProgress';
import { setWorkoutMoves, toggleDoneLocal } from '@/redux/workouts/workoutsSlice';
import { addExerciseToDay, getWorkouts, toggleExercise } from '@/services/workouts.service';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function Plan() {

  const { slug } = useLocalSearchParams<{ slug: string }>();
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.user)
  const workouts = useSelector((state: any) => state.workouts);
  const dayIndex = Number(slug);
  const workoutList = workouts.days?.[dayIndex]?.exercises || [];

  // modal
  const [modalVisible, setModalVisible] = useState(false);
  const [exerciseName, setExerciseName] = useState('');
  const [setsInput, setSetsInput] = useState('');
  const [loading, setLoading] = useState(false);

  // functions
  const addNewMove = async () => {

    try {
      setLoading(true);

      const sets = setsInput.split(' ').map(Number);

      // 🔥 call service
      const res = await addExerciseToDay(
        workouts._id,
        parseInt(slug),
        exerciseName,
        sets
      );

      if (res.success) {
        dispatch(
          setWorkoutMoves(
            res.data
          )
        );
      }

      if (!res.success) {
        console.log(res.message);
        return;
      }

      // reset UI
      setModalVisible(false);
      setExerciseName('');
      setSetsInput('');

      //sync 
      const updated = await getWorkouts(user._id);

      if (updated.success && updated.data?.length) {
        dispatch(setWorkoutMoves(updated.data));
      }

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const checkMove = async (index: number) => {

    // 1) update local redux immediately
    dispatch(toggleDoneLocal({
      dayIndex,
      exerciseIndex: index
    }));


    // 2) request to backend
    const res = await toggleExercise(
      workouts._id,
      dayIndex,
      index
    );


    if (!res.success) {
      console.log(res.message);
      return;
    }


    // 3) sync redux with backend response
    dispatch(
      setWorkoutMoves(res.data)
    );

  };


  return (

    <>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={styles.page}>

          {/* Progress */}
          <WorkoutProgress dayIndex={dayIndex} />

          {/* Exercises */}
          {
            workoutList.map((item: any, index: number) => (

              <ExerciseCard
                key={`${item.exerciseId}-${index}`}
                item={item}
                index={index}
                onDone={checkMove}
              />

            ))
          }

          {/* Add */}
          <Pressable
            onPress={() => setModalVisible(true)}
            style={styles.addButton}
          >
            <Ionicons
              name="add"
              size={20}
              color="#09ff00ff"
            />
          </Pressable>

        </View>

      </ScrollView>

      {/* Modal */}
      <AddExerciseModal
        visible={modalVisible}
        loading={loading}
        exerciseName={exerciseName}
        setsInput={setsInput}
        setExerciseName={setExerciseName}
        setSetsInput={setSetsInput}
        onSave={addNewMove}
        onClose={() => setModalVisible(false)}
      />

    </>

  );
}