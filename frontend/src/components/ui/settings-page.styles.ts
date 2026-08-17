import { I18nManager, Platform, StyleSheet } from "react-native";

/* ================= TOKENS ================= */
const COLORS = {
  bg: "#0F1115",
  card: "#1A1D23",
  primary: "#8B7CFF",
  text: "#F5F5F7",
  subtext: "#92929D",
};

const SPACING = {
  sm: 8,
  md: 12,
  lg: 16,
};

const RADIUS = {
  md: 14,
  lg: 18,
};

const isRTL = I18nManager.isRTL;

/* ================= STYLES ================= */
export default StyleSheet.create({
  /* ===== PAGE ===== */
  page: {
    flex: 1,
    paddingTop: 56,
    paddingHorizontal: 32,
  },

  /* ===== CARD ===== */
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingVertical: SPACING.md,

    borderRadius: RADIUS.lg,

    marginBottom: SPACING.md,

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
      },
    }),
  },

  /* ===== LEFT SIDE ===== */
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    minWidth: 0,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    backgroundColor: "rgba(139,124,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  /* ===== TEXT ===== */
  textBox: {
    flex: 1,
    minWidth: 0,
    marginStart: SPACING.md, // 👈 مهم برای RTL
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    textAlign: "auto",
    paddingHorizontal: 10,
  },

  status: {
    fontSize: 12,
    color: COLORS.subtext,
    marginTop: 2,
    textAlign: "auto",
  },

  /* ===== LANGUAGE BOX ===== */
  rowBox: {
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    overflow: "hidden",
  },

  rowInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  contentBox: {
    flex: 1,
    marginStart: 12,
  },

  valueBox: {
    flexDirection: isRTL ? "row-reverse" : "row", // 👈 مهم
    alignItems: "center",
  },

  valueText: {
    fontSize: 13,
    color: COLORS.subtext,
    marginHorizontal: 4,
  },

  /* ===== DROPDOWN ===== */
  dropdown: {
    paddingHorizontal: 14,
    paddingVertical: 6,
  },

  option: {
    flexDirection: isRTL ? "row-reverse" : "row", // 👈 مهم
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },

  optionContent: {
    flexDirection: "column",
    alignItems: isRTL ? "flex-end" : "flex-start", // 👈 مهم برای متن
  },

  optionText: {
    fontSize: 14,
    color: COLORS.text,
    textAlign: isRTL ? "right" : "left",
  },

  optionSubText: {
    fontSize: 12,
    color: COLORS.subtext,
    marginTop: 2,
    textAlign: isRTL ? "right" : "left",
  },

  selectedOption: {
    opacity: 0.6,
  },

  /* ===== ACTION ===== */
  action: {
    marginStart: SPACING.md,
    padding: 6,
  },

  iconLarge: {
    color: COLORS.primary,
  },
});