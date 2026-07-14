import { StyleSheet } from 'react-native';

export const homePageStyles = StyleSheet.create({
    page: {
        paddingTop: 80,
        paddingHorizontal: 0,
    },

    welcomeContainer: {
        width: '100%',
        height: 'auto',
    },

    logoSection: {
        width: '100%',
        height: 176,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    logo: {
        width: 120,
        height: 120,
    },

    titleSection: {
        width: '100%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    title: {
        fontSize: 20,
        textAlign: 'center',
        color: '#ffffff',
    },

    subtitle: {
        fontSize: 14,
        marginTop: 8,
        textAlign: 'center',
        color: '#ffffff',
    },

    highlightsContainer: {
        width: '100%',
        marginTop: 8,
        paddingHorizontal: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    highlightItem: {
        width: '25%',
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },

    highlightIconWrapper: {
        width: 56,
        height: 56,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#ffffff',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2,
    },

    highlightIcon: {
        width: 30,
        height: 30,
    },

    activitySection: {
        width: '100%',
        marginTop: 20,
    },

    activityCard: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        borderRadius: 12,
        marginTop: 20,
        shadowColor: '#ffffff',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 2,
    },

    aiCoachCard: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        borderRadius: 12,
        marginTop: 20,
        shadowColor: '#a855f7',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.35,
        shadowRadius: 3,
        elevation: 3,
    },

    activityCardContent: {
        height: '100%',
        width: '80%',
        flexDirection: 'row',
    },

    activityIconContainer: {
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    activityIcon: {
        width: 35,
        height: 35,
    },

    activityTitleContainer: {
        width: '75%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    activityTitle: {
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'left',
    },

    aiCoachTitle: {
        fontSize: 16,
        color: '#a855f7',
        textAlign: 'left',
    },
});
