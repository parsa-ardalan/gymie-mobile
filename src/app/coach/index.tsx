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

    const sendMessage = () => {
        const rand = Math.floor(Math.random() * botanswers.length);

        if (!input.trim()) return;

        const newUserMessage = {
            id: Date.now(),
            sender: "user",
            content: input,
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInput("");

        setTimeout(() => {
            const botReply = {
                id: Date.now() + 1,
                sender: "bot",
                content: botanswers[rand],
            };

            setMessages((prev) => [...prev, botReply]);
        }, 800);
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
                    <Pressable style={styles.backBtn} onPress={() => router.back()}>
                        <Text style={styles.backText}>{"<"}</Text>
                    </Pressable>
                </View>
            </View>

            {/* CHAT */}
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.chatContainer}
                renderItem={({ item }) =>
                    item.sender === "user" ? (
                        <View style={styles.userMessage}>
                            <Text style={styles.userText}>{item.content}</Text>
                        </View>
                    ) : (
                        <View style={styles.botMessage}>
                            <Text style={styles.botText}>{item.content}</Text>
                        </View>
                    )
                }
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
                    />
                </View>

                <Pressable style={styles.sendBtn} onPress={sendMessage}>
                    <Text style={styles.sendText}>➤</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}