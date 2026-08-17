import { StyleSheet } from "react-native";

export default StyleSheet.create({

    page: {
        flex: 1,
        backgroundColor: "#000",
        paddingTop: 32,
        paddingHorizontal: 32,
    },


    chartWrapper: {
        marginBottom: 12,
    },


    chart: {
        height: 180,
        borderRadius: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 10,

        shadowColor: "#ffffff",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2,
    },

    percentText: {
        color: "#ffffff",
        fontSize: 12,
        marginBottom: 5
    },


    day: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
    },

    // workout

    workoutBox: {
        flexDirection: "row",
        width: "100%",
        height: 100,

        marginTop: 12,
        gap: 12
    },

    bodyBox: {
        flex: 1,
        height: "100%",
        borderRadius: 12,
        padding: 10,

        shadowColor: "#a855f7",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 2,
    },

    bodyTitle: {
        color: "#ffffff",
        textAlign: "center",
        fontSize: 12,
        marginTop: 10

    },

    bodyText: {
        color: "#a855f7",
        textAlign: "center",
        fontSize: 16,
        marginTop: 14
    },

    // routine

    routineBox: {
        flexDirection: "row",
        width: "100%",
        height: 80,

        marginTop: 12,
        gap: 12
    },

    sleepingBox: {
        flex: 1,
        height: "100%",
        borderRadius: 12,
        padding: 10,

        shadowColor: "#3b82f6",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 2,
    },

    nutritionBox: {
        flex: 1,
        height: "100%",
        borderRadius: 12,
        padding: 10,

        shadowColor: "#ffffff",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 2,
    },

    routineTitle: {
        color: "#ffffff",
        fontSize: 12,
    },

    sleepingTextBad: {
        color: "#ca2323ff",
        fontSize: 14,
        textAlign: "center",
        marginTop: 10
    },

    sleepingTextGood: {
        color: "#22c55e",
        fontSize: 14,
        textAlign: "center",
        marginTop: 10
    },

    calorieNumber: {
        color: "#ffffff",
        fontSize: 16,
        textAlign: "center",
        marginTop: 10
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


    card: {
        height: 80,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        justifyContent: "space-between",
        marginTop: 12,

        shadowColor: "#ffffff",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2,
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