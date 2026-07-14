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
import { useDispatch, useSelector } from "react-redux";

export default function Account() {

    const profile = useSelector((state: any) => state.user);
    const dispatch = useDispatch();

    const [isEditable, setIsEditable] = useState(false);

    const [name, setName] = useState(profile.name);
    const [bio, setBio] = useState(profile.bio);
    const [age, setAge] = useState(String(profile.age));
    const [height, setHeight] = useState(String(profile.height));
    const [weight, setWeight] = useState(String(profile.weight));

    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleUpdateProfile = () => {

        dispatch(updateProfile({
            name,
            bio,
            age: Number(age),
            height: Number(height),
            weight: Number(weight),
        }));

        setIsEditable(false);
    };

    const handleLogout = () => {
        dispatch(logout());
        setShowLogoutModal(false);
    };

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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={styles.iconLarge}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={styles.iconLarge}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={styles.LogouticonLarge}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>
                    </View>
                    <View style={styles.contentBox}>
                        <Text style={styles.LogoutrowText}>خروج از حساب کاربری</Text>
                    </View>
                </View>
            </TouchableOpacity>

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
