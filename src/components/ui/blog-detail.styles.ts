import { StyleSheet } from "react-native";

export default StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 32,
  },

  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#111",
    shadowColor: "#fff",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  title: {
    fontSize: 18,
    color: "#fff",
    lineHeight: 26,
  },

  timeBox: {
    width: 160,
    height: 40,
    marginTop: 16,
    borderRadius: 12,
    backgroundColor: "#111",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 6,
  },

  timeLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
  },

  timeValue: {
    fontSize: 12,
    color: "#fff",
  },

  contentBox: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#111",
  },

  content: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    lineHeight: 22,
  },
});