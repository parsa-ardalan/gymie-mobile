import { workoutPlanStyles as styles } from '@/components/ui/workout-plan.styles';
import AddExerciseModal from '@/components/workouts/AddExerciseModal';
import ExerciseCard from '@/components/workouts/ExerciseCard';
import WorkoutProgress from '@/components/workouts/WorkoutProgress';
import { setWorkoutMoves, toggleDoneLocal } from '@/redux/workouts/workoutsSlice';
import {
  addExerciseToDay,
  deleteExercise,
  editExercise,
  getWorkouts,
  toggleExercise
} from '@/services/workouts.service';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import DeleteExerciseModal from '@/components/workouts/DeleteExerciseModal';
import EditExerciseModal from '@/components/workouts/EditExerciseModal';
import TimerModal from '@/components/workouts/TimerModal';

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

  // edit modal
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editExerciseName, setEditExerciseName] = useState('');
  const [editSetsInput, setEditSetsInput] = useState('');

  // delete modal
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<any>(null);

  // timer modal
  const [timerModalVisible, setTimerVisible] = useState(false); //open modal
  const [timerNumber, setTimerNumber] = useState(90); //1:30 minutes

  // functions
  const addNewMove = async () => {

    try {
      setLoading(true);

      const sets = setsInput
        .trim()
        .split(/\s+/)
        .map(Number);

      // 🔥 call service
      const res = await addExerciseToDay(
        workouts._id,
        dayIndex,
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
        console.error(res.message);
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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (index: number) => {

    const exercise = workoutList[index];

    setEditExerciseName(exercise.name);

    setEditSetsInput(
      exercise.sets?.join(' ') || ''
    );

    setSelectedExercise({
      ...exercise,
      index
    });


    setEditModalVisible(true);

  };


  const handleDelete = (index: number) => {

    const exercise = workoutList[index];

    setSelectedExercise({
      ...exercise,
      index
    });


    setDeleteModalVisible(true);

  };

  const editMove = async () => {

    try {

      setLoading(true);

      const sets = editSetsInput
        .trim()
        .split(/\s+/)
        .map(Number);


      const res = await editExercise(
        workouts._id,
        dayIndex,
        selectedExercise.index,
        editExerciseName,
        sets
      );


      if (!res.success) {

        console.error(res.message);
        return;

      }


      // update redux
      dispatch(
        setWorkoutMoves(res.data)
      );


      // close modal
      setEditModalVisible(false);


      // clear states
      setSelectedExercise(null);
      setEditExerciseName('');
      setEditSetsInput('');


    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  const deleteMove = async () => {

    try {

      setLoading(true);


      const res = await deleteExercise(
        workouts._id,
        dayIndex,
        selectedExercise.index
      );


      if (!res.success) {

        console.error(res.message);
        return;

      }


      // update redux
      dispatch(
        setWorkoutMoves(res.data)
      );


      // close modal
      setDeleteModalVisible(false);


      // clear selected
      setSelectedExercise(null);


    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  const checkMove = async (index: number) => {

    // 1) update local immediately
    dispatch(toggleDoneLocal({
      dayIndex,
      exerciseIndex: index
    }));

    // 2) open timer immediately
    setTimerVisible(true);

    // 3) request to backend
    const res = await toggleExercise(
      workouts._id,
      dayIndex,
      index
    );

    if (!res.success) {
      console.error(res.message);
      return;
    }

    // 4) sync redux with backend
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

              <View key={`${item.exerciseId}-${index}`}>
                <ExerciseCard
                  item={item}
                  index={index}
                  onDone={checkMove}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />

                <TimerModal visible={timerModalVisible} timer={timerNumber} onFinish={() => setTimerVisible(false)} />
              </ View>

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

      {/* add */}
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

      {/* edit */}
      <EditExerciseModal
        visible={editModalVisible}

        loading={loading}

        exerciseName={editExerciseName}

        setsInput={editSetsInput}

        setExerciseName={setEditExerciseName}

        setSetsInput={setEditSetsInput}

        onSave={editMove}

        onClose={() => {
          setEditModalVisible(false);
          setSelectedExercise(null);
        }}

      />

      {/* delete */}
      <DeleteExerciseModal
        visible={deleteModalVisible}

        loading={loading}

        exerciseName={selectedExercise?.name || ''}

        onDelete={deleteMove}

        onClose={() => {
          setDeleteModalVisible(false);
          setSelectedExercise(null);
        }}

      />

    </>

  );
}