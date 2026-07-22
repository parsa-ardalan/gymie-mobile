import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import styles from "@/components/ui/blogs-page.styles";
import { updateBlogs } from "@/redux/blogs/blogsSlice";
import { useDispatch } from "react-redux";

interface Blog {
    _id: string;
    title: string;
    blogText: string;
    minTime: number;
}

export default function Blogs() {

    const router = useRouter();
    const dispatch = useDispatch();

    const [blogs, setBlogs] = useState<Blog[]>([]);

    const getBlogs = async () => {

        try {
            const res = await axios.get("http://localhost:3000/blogs");
            setBlogs(res.data);
            dispatch(updateBlogs(res.data))
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getBlogs();
    }, []);

    return (
        <View style={styles.page}>
            <FlatList
                data={blogs}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}

                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() =>
                            router.push({

                                pathname: '/blogs/[slug]',

                                params: {
                                    slug: item._id
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
                            <Text style={styles.time}>
                                {item.minTime} دقیقه
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}