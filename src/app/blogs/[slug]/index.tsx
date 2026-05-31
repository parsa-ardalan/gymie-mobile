import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

import styles from "@/components/ui/blog-detail.styles";
import blogs from "@/data/blogs/blogs.json";

export default function BlogDetail() {
  const { blogID } = useLocalSearchParams();

  const blog = blogs.find((b: any) => String(b.id) === String(blogID));

  if (!blog) {
    return (
      <View style={styles.page}>
        <Text style={styles.title}>Blog not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.page}>

      {/* title */}
      <View style={styles.card}>
        <Text style={styles.title}>
          {blog.title}
        </Text>
      </View>

      {/* reading time */}
      <View style={styles.timeBox}>
        <Text style={styles.timeLabel}>تایم مطالعه:</Text>
        <Text style={styles.timeValue}>{blog.minTime} دقیقه</Text>
      </View>

      {/* content */}
      <View style={styles.contentBox}>
        <Text style={styles.content}>
          {blog.blogText}
        </Text>
      </View>

    </View>
  );
}