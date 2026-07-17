import { StyleSheet } from "react-native";

export default StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 32,
  },

  /* ================= ROW BOX ================= */

  rowBox: {
    width: "100%",
    height: 80,
    marginTop: 20,
    borderRadius: 16,
    shadowColor: "#fff",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  rowInner: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },

  iconBox: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
  },

  contentBox: {
    width: "75%",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },

  iconLarge: {
    width: 25,
    height: 25,
    color: "#fff",
  },

  rowText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 14,
  },

  /* ================= FOOTER ================= */

  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    padding: 10,
  },
});