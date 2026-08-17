import { BlurView } from 'expo-blur';
import {
    Modal,
    Pressable,
    Text,
    View,
} from 'react-native';

import { noInternetStyles as styles } from '@/components/ui/no-internet.styles';

import { translations } from '@/localization';

type Props = {
    visible: boolean;
    onRetry: () => void;
    onExit: () => void;
};

export default function NoInternetModal({
    visible,
    onRetry,
    onExit,
}: Props) {

    return (

        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >

            <BlurView
                intensity={60}
                tint="dark"
                style={{ flex: 1 }}
            >

                <View style={styles.modalOverlay}>

                    <View style={styles.modalContainer}>

                        <Text style={styles.modalTitle}>
                            {translations.noInternet.title}
                        </Text>

                        <Text style={styles.modalMessage}>
                            {translations.noInternet.message}
                        </Text>

                        <View style={styles.modalButtons}>

                            <Pressable
                                onPress={onRetry}
                                style={styles.retryBtn}
                            >

                                <Text style={styles.retryText}>
                                    {translations.noInternet.retry}
                                </Text>

                            </Pressable>

                            <Pressable
                                onPress={onExit}
                                style={styles.exitBtn}
                            >

                                <Text style={styles.exitText}>
                                    {translations.noInternet.exit}
                                </Text>

                            </Pressable>

                        </View>

                    </View>

                </View>

            </BlurView>

        </Modal>
    );
}