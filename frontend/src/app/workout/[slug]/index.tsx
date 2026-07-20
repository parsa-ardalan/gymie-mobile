import { workoutPlanStyles as styles } from '@/components/ui/workout-plan.styles';
import { setWorkoutMoves, toggleDoneLocal } from '@/redux/workouts/workoutsSlice';
import axios from 'axios';
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

  // workout data
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const dispatch = useDispatch();

  const workouts = useSelector((state: any) => state.workouts);
  const dayIndex = Number(slug);
  const workoutList = workouts.days?.[dayIndex]?.exercises || [];

  console.log(workoutList);


  //modal
  const [modalVisible, setModalVisible] = useState(false);
  const [exerciseName, setExerciseName] = useState('');
  const [setsInput, setSetsInput] = useState('');
  const [loading, setLoading] = useState(false);

  // workout functions
  const addNewMove = async () => {

    try {
      setLoading(true);

      const sets = setsInput.split(' ').map(Number);

      const res = await axios.post(

        `http://localhost:3000/workouts/${workouts._id}/day/${slug}/exercise`,
        {
          exerciseId: exerciseName,
          sets
        }
      );

      setModalVisible(false);
      setExerciseName('');
      setSetsInput('');

      // 🔥 sync with backend
      const userWorkouts = await axios.get(
        "http://localhost:3000/workouts"
      );

      dispatch(setWorkoutMoves(userWorkouts.data[0]));

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };


  return (

    <>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={styles.page}>

          {/* Progress */}
          <View style={styles.percentBox}>
            <Text style={styles.percentNumberText}>
              30%
            </Text>

            <View style={styles.percentBarBackground}>
              <View
                style={[
                  styles.percentBarFill,
                  { width: `${30}%` },
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
                      onPress={() => {
                        dispatch(
                          toggleDoneLocal({
                            dayIndex,
                            exerciseIndex: index
                          })
                        )
                      }}
                    >
                      <Text style={styles.doneButtonText}>
                        اتمام حرکت
                      </Text>
                    </Pressable>

                  ) : (

                    <Pressable
                      style={styles.successDoneButton}
                      onPress={() => {
                        dispatch(
                          toggleDoneLocal({
                            dayIndex,
                            exerciseIndex: index
                          })
                        )
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={styles.successDoneIcon}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
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

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={styles.addButtonText}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>

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