import { useState } from "react";
import {
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import styles from "@/components/ui/account-page.styles";
import { logout, updateProfile } from "@/redux/profile/profileSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { Ionicons } from "@expo/vector-icons";

export default function Account() {

    const profile = useSelector((state: any) => state.user);

    if (!profile?._id) {
        console.log("User id not found", profile);
    }

    const dispatch = useDispatch();

    const [isEditable, setIsEditable] = useState(false);

    const [name, setName] = useState(profile.name);
    const [bio, setBio] = useState(profile.bio);
    const [age, setAge] = useState(String(profile.age));
    const [height, setHeight] = useState(String(profile.height));
    const [weight, setWeight] = useState(String(profile.weight));

    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleUpdateProfile = async () => {

        try {

            const response = await axios.put(
                `https://gymie-mobile.onrender.com/users/${profile._id}`,
                {
                    name,
                    bio,
                    age: Number(age),
                    height: Number(height),
                    weight: Number(weight),
                }
            );

            dispatch(updateProfile(response.data));

            setIsEditable(false);


        } catch (error) {

            console.log(
                "Update profile failed:",
                error
            );
        }

    };

    const handleLogout = () => {
        dispatch(logout());
        setShowLogoutModal(false);
        localStorage.clear()
    };

    console.log("PROFILE:", profile);

    return (

        <View style={styles.page}>

            {!isEditable ? (
                <View style={styles.profileBox}>
                    <Text style={styles.name}>{profile.name}</Text>
                    <Text style={styles.bio}>{profile.bio}</Text>
                </View>
            ) : (

                <View style={styles.editContainer}>
                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>نام کاربری</Text>
                        <TextInput value={name} onChangeText={setName} style={styles.input} />
                    </View>

                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>بیوگرافی</Text>
                        <TextInput value={bio} onChangeText={setBio} style={styles.input} />
                    </View>

                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>سن</Text>
                        <TextInput value={age} onChangeText={setAge} style={styles.input} keyboardType="numeric" />
                    </View>

                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>قد (cm)</Text>
                        <TextInput value={height} onChangeText={setHeight} style={styles.input} keyboardType="numeric" />
                    </View>

                    <View style={styles.fieldset}>
                        <Text style={styles.legend}>وزن (kg)</Text>
                        <TextInput value={weight} onChangeText={setWeight} style={styles.input} keyboardType="numeric" />
                    </View>

                    <TouchableOpacity style={styles.submitBtn} onPress={handleUpdateProfile}>
                        <Text style={styles.submitText}>تایید</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Edit Info */}
            <TouchableOpacity style={styles.rowBox} onPress={() => setIsEditable(true)}>
                <View style={styles.rowInner}>
                    <View style={styles.iconBox}>
                        <Ionicons name="create-outline" size={24} color="#000" style={styles.iconLarge} />
                    </View>
                    <View style={styles.contentBox}>
                        <Text style={styles.rowText}>ویرایش مشخصات</Text>
                    </View>
                </View>
            </TouchableOpacity>

            {/* Subscription */}
            <TouchableOpacity style={styles.rowBox} onPress={() => setShowSubscriptionModal(true)}>
                <View style={styles.rowInner}>
                    <View style={styles.iconBox}>
                        <Ionicons name="star-outline" size={24} color="#000" style={styles.iconLarge} />
                    </View>
                    <View style={styles.contentBox}>
                        <Text style={styles.rowText}>خرید اشتراک</Text>
                    </View>
                </View>
            </TouchableOpacity>

            {/* Logout */}
            <TouchableOpacity style={styles.LogoutrowBox} onPress={() => setShowLogoutModal(true)}>
                <View style={styles.rowInner}>
                    <View style={styles.iconBox}>
                        <Ionicons name="log-out-outline" size={24} color="#000" style={styles.LogouticonLarge} />
                    </View>
                    <View style={styles.contentBox}>
                        <Text style={styles.rowText}>خروج از حساب</Text>
                    </View>
                </View>
            </TouchableOpacity>

            {/*  ------------------modals ----------------- */}

            {/* Subscription Modal */}
            <Modal visible={showSubscriptionModal} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>هنوز اشتراکی نخریدی!</Text>
                        <TouchableOpacity style={styles.submitBtn} onPress={() => setShowSubscriptionModal(false)}>
                            <Text style={styles.submitText}>باشه</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Logout Modal */}
            <Modal visible={showLogoutModal} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>مطمئنی میخوای از حسابت خارج بشی؟</Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.btn, { backgroundColor: '#c70000' }]}
                                onPress={handleLogout}
                            >
                                <Text style={styles.submitText}>خروج</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.btn, { backgroundColor: '#333' }]}
                                onPress={() => setShowLogoutModal(false)}
                            >
                                <Text style={styles.submitText}>نه فعلا</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>

        </View>
    );
}
