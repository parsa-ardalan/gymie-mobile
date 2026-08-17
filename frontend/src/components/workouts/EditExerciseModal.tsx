import { workoutPlanStyles as styles } from '@/components/ui/workout-plan.styles';
import { translations } from '@/localization';
import { BlurView } from 'expo-blur';
import {
    Modal,
    Pressable,
    Text,
    TextInput,
    View,
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

export default function EditExerciseModal({
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

            <BlurView
                intensity={60}
                tint="dark"
                style={{ flex: 1 }}
            >

                <View style={styles.modalOverlay}>

                    <View style={styles.modalContainer}>

                        <Text style={styles.modalTitle}>
                            {translations.workouts.plan.editExercise}
                        </Text>

                        <TextInput
                            placeholder={translations.workouts.plan.exerciseName}
                            placeholderTextColor="#666"
                            value={exerciseName || ""}
                            onChangeText={setExerciseName}
                            style={styles.input}
                        />

                        <TextInput
                            placeholder={translations.workouts.plan.setsPlaceholder}
                            placeholderTextColor="#666"
                            value={setsInput || ""}
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
                                    {loading
                                        ? translations.workouts.plan.loading
                                        : translations.workouts.plan.save}
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