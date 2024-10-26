import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function ContactList({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    fetch('https://proconnectapi-exaqapgkgkgad2cn.francecentral-01.azurewebsites.net/contact')
      .then((response) => response.json())
      .then((data) => {
        setContacts(data);
        setFilteredContacts(data);
      });
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter((contact) => 
        contact.firstName.toLowerCase().includes(text.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(text.toLowerCase()) ||
        contact.email.toLowerCase().includes(text.toLowerCase()) ||
        contact.company.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  };

  return (
    <View style={globalStyles.container}>
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('Nouveau Contact')}
      >
        <Text style={globalStyles.buttonText}>Ajouter un Contact</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher un contact..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredContacts}
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
              <Text style={{ color: '#666', fontStyle: 'italic' }}>Société: {item.company ?? 'Non disponible'}</Text>
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
  searchInput: {
    padding: 10,
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
});
