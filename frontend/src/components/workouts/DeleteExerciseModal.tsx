import { workoutPlanStyles as styles } from '@/components/ui/workout-plan.styles';
import { translations } from '@/localization';
import { BlurView } from 'expo-blur';
import {
  Modal,
  Pressable,
  Text,
  View,
} from 'react-native';

type Props = {
  visible: boolean;
  loading: boolean;

  exerciseName: string;

  onDelete: () => void;
  onClose: () => void;
};

export default function DeleteExerciseModal({
  visible,
  loading,

  exerciseName,

  onDelete,
  onClose,
}: Props) {

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >

      <BlurView
        intensity={60}
        tint="dark"
        style={{ flex: 1 }}
      >

        <View style={styles.modalOverlay}>

          <View style={styles.modalContainer}>

            <Text style={styles.modalTitle}>
              {translations.workouts.plan.deleteExercise}
            </Text>

            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                lineHeight: 24,
              }}
            >
              {translations.workouts.plan.deleteConfirmation.replace(
                '{exercise}',
                exerciseName
              )}
            </Text>

            <View style={styles.modalButtons}>

              <Pressable
                onPress={onDelete}
                style={{
                  ...styles.saveBtn,
                  backgroundColor: '#ff000020',
                }}
                disabled={loading}
              >

                <Text
                  style={{
                    ...styles.saveText,
                    color: '#ff4b4b',
                  }}
                >
                  {loading
                    ? translations.workouts.plan.loading
                    : translations.workouts.plan.delete}
                </Text>

              </Pressable>

              <Pressable
                onPress={onClose}
                style={styles.cancelBtn}
              >

                <Text style={styles.cancelText}>
                  {translations.workouts.plan.cancel}
                </Text>

              </Pressable>

            </View>

          </View>

        </View>

      </BlurView>

    </Modal>
  );
}