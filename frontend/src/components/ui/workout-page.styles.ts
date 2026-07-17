import { StyleSheet } from 'react-native';

export const workoutPageStyles = StyleSheet.create({
    container: {
        paddingBottom: 24,
        backgroundColor: '#000000',
    },

    page: {
        width: '100%',
        paddingTop: 32,
        backgroundColor: '#000000',
    },

    card: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        marginTop: 20,
        borderRadius: 12,
        shadowColor: '#ffffff',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2,
    },

    cardContent: {
        width: '80%',
        height: '100%',
        flexDirection: 'row',
    },

    iconContainer: {
        width: '25%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    icon: {
        width: 35,
        height: 35,
    },

    titleContainer: {
        width: '75%',
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    title: {
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'left',
    },
});
