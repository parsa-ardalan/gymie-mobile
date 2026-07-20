import { StyleSheet } from 'react-native';

export const workoutPlanStyles = StyleSheet.create({

    container: {
        flexGrow: 1,
        backgroundColor: '#050505',
    },

    page: {
        flex: 1,
        paddingTop: 24,
        paddingBottom: 24
    },

    workSection: {
        gap: 18,
    },

    // 🔥 Progress
    percentBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 10,
    },

    percentNumberText: {
        fontSize: 16,
        fontWeight: '100',
        color: 'white',
        width: 50,
    },

    percentBarBackground: {
        flex: 1,
        height: 10,
        borderRadius: 8,
        backgroundColor: 'rgba(255,255,255,0.06)',
        overflow: 'hidden',
    },

    percentBarFill: {
        height: '100%',
        borderRadius: 8,
        backgroundColor: '#09ff00ff',
    },

    // 🧊 Card (Glass Style)
    movementCard: {
        borderRadius: 14,
        padding: 14,
        marginTop: 24,

        shadowColor: '#ffffff',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2,
    },

    movementCardDone: {
        shadowColor: '#09ff00ff',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2,
    },

    movementName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },

    setRow: {
        marginTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    setCountText: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.5)',
    },

    setValuesWrapper: {
        flexDirection: 'row',
    },

    setValueText: {
        fontSize: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        color: '#fff',
    },

    // 🎯 Done Button
    doneButton: {
        marginTop: 24,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: 'rgba(59,130,246,0.18)',
    },

    doneButtonText: {
        fontSize: 14,
        fontWeight: '800',
        color: '#60a5fa',
    },

    successDoneButton: {
        marginTop: 24,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },

    successDoneIcon: {
        width: 28,
        height: 28,
        color: "#09ff00ff"
    },

    //Add Button
    addButton: {

        height: 48,
        width: 48,
        borderRadius: '100%',

        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',

        marginTop: 24,

        shadowColor: '#09ff00ff',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2,
    },

    addButtonText: {
        width: 20, height: 20,
        color: '#09ff00ff',
    },

    // ✅ Success icon
    successIcon: {
        marginTop: 32,
        alignSelf: 'center',
        width: 24,
        height: 24,
        opacity: 0.9,
        color: '#09ff00ff'
    },

    // MODAL
    modalOverlay: {
        flex: 1,
        backgroundColor: "#0000006e",
        backdropFilter: "blur(10px)",
        justifyContent: 'center',
        padding: 24,
    },

    modalContainer: {

        borderRadius: 24,
        padding: 24,
        gap: 18,

        shadowColor: '#ffffff',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2,
    },

    modalTitle: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
        letterSpacing: 0.5,
        marginBottom: 10,
    },

    input: {
        color: '#fff',
        paddingVertical: 14,
        paddingHorizontal: 14,
        borderRadius: 14,

        fontSize: 14,
        writingDirection: "rtl",

        shadowColor: '#ffffff',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2,
    },

    modalButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 6,
    },

    saveBtn: {
        flex: 1,
        backgroundColor: '#09ff0017',
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
    },

    saveText: {
        fontWeight: '600',
        color: '#30f139ff',
        fontSize: 14,
    },

    cancelBtn: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
    },

    cancelText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 14,
    },
});