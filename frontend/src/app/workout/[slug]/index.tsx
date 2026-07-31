import { workoutPlanStyles as styles } from '@/components/ui/workout-plan.styles';
import { addPercent } from '@/redux/percent/percentSlice';
import { setWorkoutMoves, toggleDoneLocal } from '@/redux/workouts/workoutsSlice';
import { addExerciseToDay, getWorkouts } from '@/services/workouts.service';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function Plan() {

  const { slug } = useLocalSearchParams<{ slug: string }>();
  const dispatch = useDispatch();

  const workouts = useSelector((state: any) => state.workouts);
  const dayIndex = Number(slug);
  const workoutList = workouts.days?.[dayIndex]?.exercises || [];

  // percent codes
  const weekPercent = useSelector((state: any) => state.percent);
  const dayPercent = weekPercent[slug];
  const movePercent = workoutList.length > 0 ? 100 / workoutList.length : 0;


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
        slug,
        exerciseName,
        sets
      );

      if (!res.success) {
        console.log(res.message);
        return;
      }

      // reset UI
      setModalVisible(false);
      setExerciseName('');
      setSetsInput('');

      // 🔥 sync دوباره
      const updated = await getWorkouts();

      if (updated.success && updated.data?.length) {
        dispatch(setWorkoutMoves(updated.data[0]));
      }

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const checkMove = (item: any, index: number) => {

    // check move
    dispatch(toggleDoneLocal({
      dayIndex,
      exerciseIndex: index
    }))

    // add day percent
    dispatch(addPercent({
      dayIndex: parseInt(slug),
      percentNumber: movePercent
    }))

    console.log(workoutList)

  }


  return (

    <>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={styles.page}>

          {/* Progress */}
          <View style={styles.percentBox}>
            <Text style={styles.percentNumberText}>
              {dayPercent.percentage}%
            </Text>

            <View style={styles.percentBarBackground}>
              <View
                style={[
                  styles.percentBarFill,
                  { width: `${dayPercent.percentage}%` },
                ]}
              />
            </View>
          </View>

          {/* Exercises */}
          {workoutList.map((item: any, index: number) => (

            // move box
            <View
              key={`${item.exerciseId}-${index}`}
              style={[
                styles.movementCard,
                item.isDone && styles.movementCardDone,
              ]}
            >
              <Text style={styles.movementName}>
                {item.exerciseId}
              </Text>

              <View style={styles.setRow}>
                <Text style={styles.setCountText}>
                  {item.sets.length} ست
                </Text>

                <View style={styles.setValuesWrapper}>
                  {item.sets.map((set: number, i: number) => (
                    <Text key={i} style={styles.setValueText}>
                      {set}
                    </Text>
                  ))}
                </View>
              </View>

              <>

                {
                  !item.isDone ? (

                    <Pressable
                      style={styles.doneButton}
                      onPress={() => { checkMove(item, index) }}>
                      <Text style={styles.doneButtonText}>
                        اتمام حرکت
                      </Text>
                    </Pressable>

                  ) : (

                    <Pressable
                      style={styles.successDoneButton}
                    >
                      <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color="currentColor"
                        style={styles.successDoneIcon}
                      />
                    </Pressable>
                  )
                }

              </>


            </View>
          ))}

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
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>

            <Text style={styles.modalTitle}>
              حرکت جدید
            </Text>

            <TextInput
              placeholder="نام حرکت"
              placeholderTextColor="#666"
              value={exerciseName}
              onChangeText={setExerciseName}
              style={styles.input}
            />

            <TextInput
              placeholder="12 10 8"
              placeholderTextColor="#666"
              value={setsInput}
              onChangeText={setSetsInput}
              style={styles.input}
            />

            <View style={styles.modalButtons}>

              <Pressable
                onPress={addNewMove}
                style={styles.saveBtn}
                disabled={loading}
              >
                <Text style={styles.saveText}>
                  {loading ? '...' : 'تایید'}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => { setModalVisible(false) }}
                style={styles.cancelBtn}
              >
                <Text style={styles.cancelText}>
                  انصراف
                </Text>
              </Pressable>

            </View>

          </View>
        </View>
      </Modal>

    </>

  );
}