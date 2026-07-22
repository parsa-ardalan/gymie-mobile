import { Text, View } from "react-native";

import styles from "@/components/ui/blog-detail.styles";

import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";

export default function BlogDetail() {

  const { slug } = useLocalSearchParams();

  const blogs = useSelector((state: any) => state.blogs);
  const blog = blogs.find((blog: any) => blog._id == slug);

  return (
    <View style={styles.page}>

      {/* title */}
      <View style={styles.card}>
        <Text style={styles.title}>
         { blog.title}
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