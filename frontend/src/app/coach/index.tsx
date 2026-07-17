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

import Svg, { Path } from "react-native-svg";

import styles from "@/components/ui/coach-page.styles";
import botanswers from "@/data/chat/botanswers.json";

export default function Coach() {
    const [messages, setMessages] = useState([
        { id: 1, sender: "user", content: "جیمی آنلاینه.. باهاش چت کن" },
        {
            id: 2,
            sender: "bot",
            content: "سلام... من جیمی هستم. مربی هوش مصنوعی تو",
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
            router.replace("/"); // fallback
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

    const renderItem = ({ item }) => {
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
                        <Text style={styles.headerTitle}>جیمی</Text>
                        <Text style={styles.headerStatus}>online</Text>
                    </View>
                </View>

                <View style={styles.headerSide}>
                    <Pressable style={styles.backBtn} onPress={handleBack}>
                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <Path
                                d="M15.75 19.5 8.25 12l7.5-7.5"
                                stroke="white"
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>
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
                        placeholder="پیام..."
                        placeholderTextColor="#888"
                        style={styles.input}
                        onSubmitEditing={sendMessage}
                        returnKeyType="send"
                    />
                </View>

                <Pressable style={styles.sendBtn} onPress={sendMessage}>
                    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
                        <Path
                            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                            stroke="white"
                            strokeWidth={1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </Svg>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}