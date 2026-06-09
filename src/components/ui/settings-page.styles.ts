import { StyleSheet } from "react-native";

export default StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 32,
  },

  /* ================= PROFILE ================= */

  profileBox: {
    width: "100%",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#fff",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  name: {
    fontSize: 20,
    color: "#fff",
    textAlign: "right",
  },

  bio: {
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    marginTop: 10,
    lineHeight: 22,
    textAlign: "right",
  },

  editRow: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 10,
  },

  icon: {
    width: 20,
    height: 20,
    tintColor: "#fff",
  },

  /* ================= EDIT MODE ================= */

  editContainer: {
    width: "100%",
    gap: 16,
  },

  fieldset: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingTop: 10,
    height: 80,
    justifyContent: "center",
  },

  legend: {
    position: "absolute",
    top: -10,
    right: 12,
    backgroundColor: "#000",
    paddingHorizontal: 8,
    fontSize: 12,
    color: "#aaa",
  },

  input: {
    width: "100%",
    height: "100%",
    color: "#fff",
    fontSize: 16,
    textAlign: "right",
  },

  submitBtn: {
    width: "100%",
    height: 48,
    borderRadius: 12,
    backgroundColor: "rgba(34,197,94,0.1)", // green-500/10
    alignItems: "center",
    justifyContent: "center",
  },

  submitText: {
    color: "#fff",
    fontSize: 14,
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