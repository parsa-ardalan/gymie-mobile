import { StyleSheet } from 'react-native';

export const noInternetStyles = StyleSheet.create({

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },

    modalContainer: {
        width: '100%',
        maxWidth: 380,
        backgroundColor: '#111111',
        borderRadius: 20,
        padding: 24,
    },

    modalTitle: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 12,
    },

    modalMessage: {
        color: '#aaaaaa',
        fontSize: 14,
        lineHeight: 22,
        textAlign: 'center',
        marginBottom: 24,
    },

    modalButtons: {
        gap: 10,
    },

    retryBtn: {
        height: 48,
        borderRadius: 12,
        shadowColor: "blue",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    retryText: {
        color: '#245edbff',
        fontSize: 15,
        fontWeight: '700',
    },

    exitBtn: {
        height: 48,
        borderRadius: 12,
        shadowColor: "red",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    exitText: {
        color: 'red',
        fontSize: 15,
        fontWeight: '700',
    },

});

