// components/workouts/AddExerciseModal.tsx

import { workoutPlanStyles as styles } from '@/components/ui/workout-plan.styles';
import {
    Modal,
    Pressable,
    Text,
    TextInput,
    View
} from 'react-native';


type Props = {
  visible: boolean;
  loading: boolean;
  exerciseName: string;
  setsInput: string;

  setExerciseName: (value: string) => void;
  setSetsInput: (value: string) => void;

  onSave: () => void;
  onClose: () => void;
};


export default function AddExerciseModal({
  visible,
  loading,
  exerciseName,
  setsInput,

  setExerciseName,
  setSetsInput,

  onSave,
  onClose,

}: Props) {


  return (

    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >

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

              onPress={onSave}

              style={styles.saveBtn}

              disabled={loading}

            >

              <Text style={styles.saveText}>

                {
                  loading
                    ? '...'
                    : 'تایید'
                }

              </Text>

            </Pressable>



            <Pressable

              onPress={onClose}

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

  );

}