import { useEffect, useState } from "react";
import {
    Text,
    TouchableOpacity,
    View
} from "react-native";

import styles from "@/components/ui/settings-page.styles";

import { Ionicons } from "@expo/vector-icons";

export default function Settings() {

    const [notificationStatus, setNotificationStatus] = useState("درخواست اجازه");

    useEffect(() => {
        // در RN باید با library کار کنی (مثل expo-notifications)
        setNotificationStatus("نامشخص");
    }, []);

    return (
        <View style={styles.page}>

            {/* language */}
            <View style={styles.rowBox}>
                <View style={styles.rowInner}>

                    <View style={styles.iconBox}>
                        <Ionicons
                            name="language-outline"
                            size={24}
                            color="#000"
                            style={styles.iconLarge}
                        />
                    </View>

                    <View style={styles.contentBox}>
                        <Text style={styles.rowText}>فارسی</Text>
                    </View>

                </View>
            </View>

            {/* theme */}
            <View style={styles.rowBox}>
                <View style={styles.rowInner}>

                    <View style={styles.iconBox}>
                        <Ionicons
                            name="moon-outline"
                            size={24}
                            color="#000"
                            style={styles.iconLarge}
                        />
                    </View>

                    <View style={styles.contentBox}>
                        <Text style={styles.rowText}>دارک</Text>
                    </View>

                </View>
            </View>

            {/* notifications */}
            <View style={styles.rowBox}>
                <View style={styles.rowInner}>

                    <View style={styles.iconBox}>
                        <Ionicons
                            name="notifications-outline"
                            size={24}
                            color="#000"
                            style={styles.iconLarge}
                        />
                    </View>

                    <View style={styles.contentBox}>
                        <TouchableOpacity>
                            <Text style={styles.rowText}>
                                {notificationStatus}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

            <Text style={styles.footer}>
                نوتیفیکیشن را از بخش{" "}
                <Text style={{ color: "#fff" }}>تنظیمات</Text> تغییر دهید
            </Text>

        </View>
    );
}   