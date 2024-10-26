// src/styles/globalStyles.js
import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    color: COLORS.text,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {
    color: COLORS.text,
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#FF4D4D', // Rouge plus clair pour le bouton supprimer
    padding: 5,
    borderRadius: 3,
  },
  deleteButtonText: {
    color: COLORS.background,
    fontSize: 14,
  },
});
