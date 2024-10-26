import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function ContactList({ navigation }) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('https://proconnectapi-exaqapgkgkgad2cn.francecentral-01.azurewebsites.net/contact')
      .then((response) => response.json())
      .then((data) => setContacts(data));
  }, []);

  const supprimerContact = (id) => {
    Alert.alert(
      "Supprimer Contact",
      "Êtes-vous sûr de vouloir supprimer ce contact ?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Supprimer",
          onPress: () => {
            fetch(`https://proconnectapi-exaqapgkgkgad2cn.francecentral-01.azurewebsites.net/contact/${id}`, {
              method: 'DELETE',
            }).then(() => {
              setContacts(contacts.filter((contact) => contact.id !== id));
              Alert.alert("Contact supprimé", "Le contact a été supprimé avec succès.", [
                { text: "OK" }
              ]);
            }).catch((error) => {
              console.error("Erreur lors de la suppression:", error);
              Alert.alert("Erreur", "Une erreur est survenue lors de la suppression du contact.", [
                { text: "OK" }
              ]);
            });
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={globalStyles.container}>
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('Nouveau Contact')}
      >
        <Text style={globalStyles.buttonText}>Ajouter un Contact</Text>
      </TouchableOpacity>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <TouchableOpacity
              style={styles.detailsContainer}
              onPress={() => navigation.navigate('Détails du Contact', { id: item.id })}
            >
              <Text style={styles.listItemText}>
                {item.firstName} {item.lastName}
              </Text>
              <Text style={{ color: '#666' }}>{item.email}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => supprimerContact(item.id)}
            >
              <Text style={styles.deleteButtonText}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailsContainer: {
    flex: 1,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
