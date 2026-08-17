import { StyleSheet } from 'react-native';

export const updatingStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#050505',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
    },

    content: {
        width: '100%',
        maxWidth: 420,
        alignItems: 'center',
    },

    // ─────────────────────────────────────
    // Icon
    // ─────────────────────────────────────

    iconWrapper: {
        width: 110,
        height: 110,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 34,
    },

    iconGlow: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFFFFF',
        opacity: 0.035,
    },

    iconCircle: {
        width: 76,
        height: 76,
        borderRadius: 38,

        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#101010',

        borderWidth: 1,
        borderColor: '#242424',

        shadowColor: '#FFFFFF',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 8,
    },

    // ─────────────────────────────────────
    // Text
    // ─────────────────────────────────────

    title: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: '700',
        letterSpacing: -0.7,
        textAlign: 'center',
        marginBottom: 14,
    },

    description: {
        color: '#858585',
        fontSize: 15,
        lineHeight: 25,
        fontWeight: '400',
        textAlign: 'center',
        maxWidth: 340,
    },

    // ─────────────────────────────────────
    // Status
    // ─────────────────────────────────────

    status: {
        marginTop: 28,

        flexDirection: 'row',
        alignItems: 'center',

        paddingHorizontal: 16,
        paddingVertical: 10,

        borderRadius: 999,

        backgroundColor: '#0D0D0D',

        borderWidth: 1,
        borderColor: '#1C1C1C',
    },

    dot: {
        width: 7,
        height: 7,
        borderRadius: 4,

        backgroundColor: '#FFFFFF',

        marginRight: 9,
        opacity: 0.8,
    },

    statusText: {
        color: '#777777',
        fontSize: 12,
        fontWeight: '500',
    },

    // ─────────────────────────────────────
    // Home Button
    // ─────────────────────────────────────

    homeButton: {
        marginTop: 34,

        height: 50,
        paddingHorizontal: 22,

        borderRadius: 14,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        gap: 9,

        backgroundColor: '#151515',

        borderWidth: 1,
        borderColor: '#292929',
    },

    homeButtonPressed: {
        opacity: 0.65,
        transform: [{ scale: 0.97 }],
    },

    homeButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
});