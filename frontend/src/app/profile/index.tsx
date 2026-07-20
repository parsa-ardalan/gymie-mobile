import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

import styles from "@/components/ui/profile-page.styles";

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

                    <Text style={styles.name}>{profile.name}</Text>

                    <Text style={styles.bio}>
                        {profile.bio}
                    </Text>

                </View>

                {/* stats grid */}
                <View style={styles.grid}>

                    <View style={styles.boxBlue}>
                        <Text style={styles.numberBlue}>{profile.age}</Text>
                        <Text style={styles.label}>سن</Text>
                    </View>

                    <View style={styles.boxBlue}>
                        <Text style={styles.numberBlue}>{profile.weight}</Text>
                        <Text style={styles.label}>وزن</Text>
                    </View>

                    <View style={styles.boxBlue}>
                        <Text style={styles.numberBlue}>{profile.height}</Text>
                        <Text style={styles.label}>قد</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.boxPurple}
                        onPress={() => router.push("/profile/account")}

                    >
                        <Text style={styles.numberPurple}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '20px', height: '20px', color: '#a855f7'}}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                            </svg>
                        </Text>

                        <Text style={styles.label}>حساب کاربری</Text>

                    </TouchableOpacity>

                    <View style={styles.boxOrange}>
                        <Text style={styles.numberOrange}>
                            {profile.dayStreak}
                        </Text>
                        <Text style={styles.label}>روزهای فعال</Text>
                    </View>

                </View>

                {/* button */}
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push("/profile/activity")}
                    >
                        <Text style={styles.buttonText}>
                            فعالیت هفتگی
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View >
    );
}