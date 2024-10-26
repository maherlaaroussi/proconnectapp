import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function ContactList({ navigation }) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('https://proconnectapi-exaqapgkgkgad2cn.francecentral-01.azurewebsites.net/contact')
      .then((response) => response.json())
      .then((data) => setContacts(data));
  }, []);

  const supprimerContact = (id) => {
    fetch(`https://proconnectapi-exaqapgkgkgad2cn.francecentral-01.azurewebsites.net/contact/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setContacts(contacts.filter((contact) => contact.id !== id));
    });
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
          <TouchableOpacity
            onPress={() => navigation.navigate('Détails du Contact', { id: item.id })}
          >
            <View style={globalStyles.listItem}>
              <View>
                <Text style={globalStyles.listItemText}>
                  {item.firstName} {item.lastName}
                </Text>
                <Text style={{ color: '#666' }}>{item.email}</Text>
              </View>
              <TouchableOpacity
                style={globalStyles.deleteButton}
                onPress={() => supprimerContact(item.id)}
              >
                <Text style={globalStyles.deleteButtonText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
