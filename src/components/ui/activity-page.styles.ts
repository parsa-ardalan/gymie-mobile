import { StyleSheet } from "react-native";

export default StyleSheet.create({

    page: {
        flex: 1,
        backgroundColor: "#000",
        paddingTop: 32,
        gap: 12,
    },

    /* CHART */
    chart: {
        height: 180,
        borderRadius: 16,
        backgroundColor: "#111",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 10,
        writingDirection: "ltr"
    },

    day: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
    },

    barWrapper: {
        height: "75%",
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
    },

    bar: {
        width: 10,
        backgroundColor: "#3b82f6",
        borderRadius: 0,
    },

    dayText: {
        height: "25%",
        fontSize: 12,
        color: "#fff",
        textAlign: "center",
        marginTop: 4,
    },

    /* CARDS */
    card: {
        height: 80,
        borderRadius: 12,
        backgroundColor: "#111",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        justifyContent: "space-between",
    },

    leftText: {
        color: "#fff",
        fontSize: 14,
    },

    rightGreen: {
        color: "#22c55e",
        fontSize: 14,
    },
});