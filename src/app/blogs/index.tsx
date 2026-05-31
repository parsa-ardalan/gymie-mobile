import { useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import styles from "@/components/ui/blogs-page.styles";
import blogs from "@/data/blogs/blogs.json";

export default function Blogs() {
    const router = useRouter();

    return (
        <View style={styles.page}>
            <FlatList
                data={blogs}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}   // ✅ اینو اضافه کن
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() =>
                            router.push({
                                pathname: "/blogs/[slug]",
                                params: {
                                    slug: item.title,
                                    blogID: item.id,
                                },
                            })
                        }
                    >
                        {/* title */}
                        <View style={styles.titleBox}>
                            <Text style={styles.title} numberOfLines={1}>
                                {item.title}
                            </Text>
                        </View>

                        {/* content */}
                        <View style={styles.contentBox}>
                            <Text style={styles.content} numberOfLines={3}>
                                {item.blogText}
                            </Text>
                        </View>

                        {/* footer */}
                        <View style={styles.footer}>
                            <Text style={styles.time}>{item.minTime} دقیقه</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}