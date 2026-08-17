import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import styles from "@/components/ui/settings-page.styles";
import { translations } from "@/localization";

export default function ThemeBox() {
    return (
        <View style={styles.card}>
            <View style={styles.left}>
                <View style={styles.iconBox}>
                    <Ionicons name="moon-outline" size={20} color="#8B7CFF" />
                </View>

                <View style={styles.textBox}>
                    <Text style={styles.title}>
                        {translations.settings.theme}
                    </Text>

                </View>
            </View>
        </View>
    );
}