import { useEffect, useState } from "react";
import {
    Text,
    TouchableOpacity,
    View
} from "react-native";

import styles from "@/components/ui/settings-page.styles";

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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={styles.iconLarge}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                        </svg>

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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={styles.iconLarge}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                        </svg>

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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={styles.iconLarge}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                        </svg>

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