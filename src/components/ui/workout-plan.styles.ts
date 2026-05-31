import { StyleSheet } from 'react-native';

export const workoutPlanStyles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingBottom: 24,
        backgroundColor: '#000000',
    },

    page: {
        width: '100%',
        minHeight: '100%',
        backgroundColor: '#000000',
        paddingTop: 32
    },

    workSection: {
        width: '100%',
    },

    percentBox: {
        width: '100%',
        height: 64,
        flexDirection: 'row',
        writingDirection: "ltr"
    },

    percentNumberWrapper: {
        width: '20%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    percentNumberText: {
        fontSize: 18,
        color: '#ffffff',
    },

    percentBarWrapper: {
        width: '75%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    percentBarBackground: {
        width: '100%',
        height: 12,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.1)',
    },

    percentBarFill: {
        height: '100%',
        borderRadius: 12,
        backgroundColor: '#22c55e',
        transitionDuration: 500,
    },

    movementCard: {
        width: '100%',
        marginTop: 20,
        padding: 20,
        borderRadius: 12,
        backgroundColor: 'transparent',

        shadowColor: '#ffffff',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 3,
    },

    movementCardDone: {
        width: '100%',
        marginTop: 20,
        padding: 20,
        borderRadius: 12,
        backgroundColor: 'transparent',

        shadowColor: '#0e3d03ff',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.90,
        shadowRadius: 3,
        elevation: 3,
    },

    movementNameWrapper: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    movementName: {
        fontSize: 16,
        color: '#ffffff',
    },

    setRow: {
        width: '100%',
        height: 48,
        marginTop: 20,
        flexDirection: 'row',
    },

    setCountWrapper: {
        width: '20%',
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    setCountText: {
        fontSize: 14,
        color: '#ffffff',
    },

    setValuesWrapper: {
        width: '80%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 12,
    },

    setValueText: {
        fontSize: 14,
        color: '#ffffff',
    },

    buttonWrapper: {
        width: '100%',
        height: 56,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    doneButton: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(59,130,246,0.1)',
    },

    doneButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#ffffff',
    },

    successButton: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },

    successIcon: {
        width: 30,
        height: 30,
    },

    recoveryPage: {
        width: '100%',
        minHeight: 600,
        alignItems: 'center',
        justifyContent: 'center',
    },

    recoveryCard: {
        width: '80%',
        marginTop: 128,
        paddingHorizontal: 20,
        borderRadius: 12,

        shadowColor: '#ffffff',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 3,
    },

    recoveryIconWrapper: {
        width: '100%',
        height: 112,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
    },

    recoveryIcon: {
        width: 50,
        height: 50,
    },

    recoveryTitleWrapper: {
        width: '100%',
        height: 96,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    recoveryTitle: {
        marginVertical: 8,
        fontSize: 20,
        textAlign: 'center',
        color: '#ffffff',
    },

    recoverySubtitle: {
        fontSize: 12,
        lineHeight: 24,
        textAlign: 'center',
        color: 'rgba(255,255,255,0.5)',
    },

    recoveryLinksRow: {
        width: '100%',
        height: 80,
        paddingHorizontal: 12,
        flexDirection: 'row',
    },

    recoveryLinkItem: {
        width: '33.3333%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    recoveryLinkIcon: {
        width: 35,
        height: 35,
    },

    notFoundContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
    },

    notFoundText: {
        fontSize: 16,
        color: '#ffffff',
    },
});
