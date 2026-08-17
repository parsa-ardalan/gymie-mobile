import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "@/components/ui/coach-page.styles";
import { translations } from "@/localization";

export default function Coach() {

    const botanswers = translations.coach.botAnswers;

    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: "user",
            content: translations.coach.initialUserMessage,
        },
        {
            id: 2,
            sender: "bot",
            content: translations.coach.initialBotMessage,
        },
    ]);

    const [input, setInput] = useState("");
    const flatListRef = useRef(null);

    useEffect(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    // ✅ FIX: back handler
    const handleBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace("/");
        }
    };

    const sendMessage = () => {
        if (!input.trim()) return;

        const newUserMessage = {
            id: Date.now(),
            sender: "user",
            content: input.trim(),
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInput("");

        const rand = Math.floor(Math.random() * botanswers.length);

        setTimeout(() => {
            const botReply = {
                id: Date.now() + 1,
                sender: "bot",
                content: botanswers[rand],
            };

            setMessages((prev) => [...prev, botReply]);
        }, 700);
    };

    const renderItem = ({ item }: any) => {
        const isUser = item.sender === "user";

        return (
            <View
                style={isUser ? styles.userMessage : styles.botMessage}
            >
                <Text style={isUser ? styles.userText : styles.botText}>
                    {item.content}
                </Text>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.page}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            {/* HEADER */}
            <View style={styles.header}>

                <View style={styles.headerSide}>
                    <View style={styles.avatarCircle}>
                        <Image
                            source={require("@/assets/icons/profile.png")}
                            style={styles.avatarIcon}
                        />
                    </View>
                </View>

                <View style={styles.headerCenter}>
                    <View style={styles.headerBox}>

                        <Text style={styles.headerTitle}>
                            {translations.coach.name}
                        </Text>

                        <Text style={styles.headerStatus}>
                            {translations.coach.status}
                        </Text>

                    </View>
                </View>

                <View style={styles.headerSide}>
                    <Pressable
                        style={styles.backBtn}
                        onPress={handleBack}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={18}
                            color="white"
                        />
                    </Pressable>
                </View>

            </View>

            {/* CHAT */}
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.chatContainer}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />

            {/* INPUT */}
            <View style={styles.inputContainer}>

                <View style={styles.inputWrapper}>

                    <TextInput
                        value={input}
                        onChangeText={setInput}
                        placeholder={translations.coach.inputPlaceholder}
                        placeholderTextColor="#888"
                        style={styles.input}
                        onSubmitEditing={sendMessage}
                        returnKeyType="send"
                    />

                </View>

                <Pressable
                    style={styles.sendBtn}
                    onPress={sendMessage}
                >
                    <Ionicons
                        name="send"
                        size={16}
                        color="white"
                    />
                </Pressable>

            </View>

        </KeyboardAvoidingView>
    );
}
