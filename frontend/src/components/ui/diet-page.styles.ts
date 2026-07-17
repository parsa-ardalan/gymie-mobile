import { StyleSheet } from 'react-native';

export const dietPageStyles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },

  page: {
    flex: 1,
    paddingTop: 32,
  },

  infoCard: {
    width: '100%',
    borderRadius: 16,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: '#ffffff22',
    padding: 16,
    marginBottom: 28,
  },

  infoText: {
    color: '#ffffff',
    fontSize: 13,
    lineHeight: 26,
    textAlign: 'right',
  },

  mealsWrapper: {
    width: '100%',
    gap: 28,
  },

  section: {
    width: '100%',
  },

  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'right',
  },

  mealsList: {
    paddingLeft: 2,
    paddingRight: 8,
    gap: 16,
  },

  mealCard: {
    width: 120,
    height: 130,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addMealCard: {
    borderStyle: 'dashed',
    borderColor: '#ffffff66',
  },

  addMealPlus: {
    color: '#ffffff',
    fontSize: 32,
    marginBottom: 10,
  },

  addMealText: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
  },

  mealIconWrapper: {
    width: '100%',
    height: '65%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mealIcon: {
    width: 38,
    height: 38,
  },

  mealNameWrapper: {
    width: '100%',
    height: '35%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mealName: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    textAlign: 'center',
  },

  tipBox: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginTop: 28,
    marginBottom: 20,
  },

  tipText: {
    width: '100%',
    textAlign: 'center',
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    lineHeight: 22,
  },
});
