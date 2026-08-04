import { workoutPlanStyles as styles } from '@/components/ui/workout-plan.styles';
import {
    Modal,
    Pressable,
    Text,
    View
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

            <View style={styles.modalOverlay}>


                <View style={styles.modalContainer}>


                    <Text style={styles.modalTitle}>
                        حذف حرکت
                    </Text>



                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 14,
                            lineHeight: 24,
                            writingDirection: 'rtl',
                        }}
                    >

                        آیا مطمئن هستید که می‌خواهید
                        {' '}
                        {exerciseName}
                        {' '}
                        را حذف کنید؟

                    </Text>




                    <View style={styles.modalButtons}>


                        <Pressable

                            onPress={onDelete}

                            style={{
                                ...styles.saveBtn,
                                backgroundColor: '#ff000020'
                            }}

                            disabled={loading}

                        >

                            <Text

                                style={{
                                    ...styles.saveText,
                                    color: '#ff4b4b'
                                }}

                            >

                                {
                                    loading
                                        ? '...'
                                        : 'حذف'
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