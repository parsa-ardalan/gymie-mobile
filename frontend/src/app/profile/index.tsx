import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

import styles from "@/components/ui/profile-page.styles";
import { translations } from "@/localization";

import { Ionicons } from "@expo/vector-icons";

export default function Profile() {

    const profile = useSelector((state: any) => state.user);
    const router = useRouter();

    return (
        <View style={styles.page}>

            <View style={styles.card}>

                {/* profile section */}
                <View style={styles.profileSection}>

                    <Image
                        source={require("@/assets/icons/profile.png")}
                        style={styles.avatar}
                    />

                    <Text style={styles.name}>
                        {profile.name}
                    </Text>

                    <Text style={styles.bio}>
                        {profile.bio}
                    </Text>

                </View>

                {/* stats grid */}
                <View style={styles.grid}>

                    <View style={styles.boxBlue}>
                        <Text style={styles.numberBlue}>
                            {profile.age}
                        </Text>

                        <Text style={styles.label}>
                            {translations.profile.age}
                        </Text>
                    </View>

                    <View style={styles.boxBlue}>
                        <Text style={styles.numberBlue}>
                            {profile.weight}
                        </Text>

                        <Text style={styles.label}>
                            {translations.profile.weight}
                        </Text>
                    </View>

                    <View style={styles.boxBlue}>
                        <Text style={styles.numberBlue}>
                            {profile.height}
                        </Text>

                        <Text style={styles.label}>
                            {translations.profile.height}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.boxPurple}
                        onPress={() => router.push("/profile/account")}
                    >
                        <Text style={styles.numberPurple}>
                            <Ionicons
                                name="log-out-outline"
                                size={20}
                                color="#a855f7"
                            />
                        </Text>

                        <Text style={styles.label}>
                            {translations.profile.account}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.boxOrange}>
                        <Text style={styles.numberOrange}>
                            {16}
                        </Text>

                        <Text style={styles.label}>
                            {translations.profile.activeDays}
                        </Text>
                    </View>

                </View>

                {/* button */}
                <View style={styles.buttonWrapper}>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push("/profile/activity")}
                    >
                        <Text style={styles.buttonText}>
                            {translations.profile.weeklyActivity}
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    );
}
