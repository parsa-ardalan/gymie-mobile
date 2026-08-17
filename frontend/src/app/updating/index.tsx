import { updatingStyles } from '@/components/ui/updating-page.styles';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function UpdatingScreen() {
    const handleGoHome = () => {
        router.replace('/');
    };

    return (
        <View style={updatingStyles.container}>
            <View style={updatingStyles.content}>

                <View style={updatingStyles.iconWrapper}>
                    <View style={updatingStyles.iconGlow} />

                    <View style={updatingStyles.iconCircle}>
                        <Ionicons
                            name="construct-outline"
                            size={34}
                            color="#FFFFFF"
                        />
                    </View>
                </View>

                <Text style={updatingStyles.title}>
                    در حال آپدیت...
                </Text>

                <Text style={updatingStyles.description}>
                    این بخش در حال به‌روزرسانی است و به‌زودی
                    با امکانات جدید در دسترس شما قرار می‌گیرد.
                </Text>

                <View style={updatingStyles.status}>
                    <View style={updatingStyles.dot} />

                    <Text style={updatingStyles.statusText}>
                        به‌زودی در دسترس خواهد بود
                    </Text>
                </View>

                <Pressable
                    onPress={handleGoHome}
                    style={({ pressed }) => [
                        updatingStyles.homeButton,
                        pressed && updatingStyles.homeButtonPressed,
                    ]}
                >
                    <Ionicons
                        name="home-outline"
                        size={18}
                        color="#FFFFFF"
                    />

                    <Text style={updatingStyles.homeButtonText}>
                        بازگشت به خانه
                    </Text>
                </Pressable>

            </View>
        </View>
    );
}
