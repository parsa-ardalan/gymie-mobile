import { useEffect, useState } from "react";
import {
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import styles from "@/components/ui/settings-page.styles";
import profile from "@/data/profile/profile.json";

export default function Settings() {
    const [isEditable, setIsEditable] = useState(false);

    const [name, setName] = useState(profile.name);
    const [bio, setBio] = useState(profile.bio);

    const [notificationStatus, setNotificationStatus] = useState("درخواست اجازه");

    useEffect(() => {
        // در RN باید با library کار کنی (مثل expo-notifications)
        setNotificationStatus("نامشخص");
    }, []);

    return (
        <View style={styles.page}>

            {/* profile */}
            {!isEditable ? (
                <View style={styles.profileBox}>

                    <Text style={styles.name}>{name}</Text>

                    <Text style={styles.bio}>{bio}</Text>

                    <View style={styles.editRow}>
                        <TouchableOpacity onPress={() => setIsEditable(true)}>
                            <Image
                                source={require("@/assets/icons/edit.png")}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>

                </View>
            ) : (
                <View style={styles.editContainer}>

                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>نام کاربری</Text>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            style={styles.input}
                            placeholder="نام"
                            placeholderTextColor="#aaa"
                        />
                    </View>

                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>بیوگرافی شخصی</Text>
                        <TextInput
                            value={bio}
                            onChangeText={setBio}
                            style={styles.input}
                            placeholder="بیو"
                            placeholderTextColor="#aaa"
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={() => setIsEditable(false)}
                    >
                        <Text style={styles.submitText}>تایید</Text>
                    </TouchableOpacity>

                </View>
            )}

            {/* language */}
            <View style={styles.rowBox}>
                <View style={styles.rowInner}>

                    <View style={styles.iconBox}>
                        <Image
                            source={require("@/assets/icons/logo.jpeg")}
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
                        <Image
                            source={require("@/assets/icons/logo.jpeg")}
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
                        <Image
                            source={require("@/assets/icons/logo.jpeg")}
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