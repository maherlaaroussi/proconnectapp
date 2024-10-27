import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function ContactList({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);

  const fetchContacts = () => {
    fetch('https://proconnectapi-exaqapgkgkgad2cn.francecentral-01.azurewebsites.net/contact')
      .then((response) => response.json())
      .then((data) => {
        setContacts(data);
        setFilteredContacts(data);
      });
  };

  useEffect(() => {
    fetchContacts();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchContacts();
    });
    return unsubscribe;
  }, [navigation]);

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
      <Text style={styles.totalContactsText}>Nombre total de contacts: {filteredContacts.length}</Text>
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
                {item.firstName && item.firstName.trim() !== '' ? item.firstName : 'N/A'} {item.lastName && item.lastName.trim() !== '' ? item.lastName : 'N/A'}
              </Text>
              <Text style={{ color: '#666' }}>{item.email && item.email.trim() !== '' ? item.email : 'N/A'}</Text>
            </TouchableOpacity>
            <View style={styles.additionalInfoContainer}>
              <Text style={styles.additionalInfo}>{item.company && item.company.trim() !== '' ? item.company : 'N/A'}</Text>
              <Text style={styles.additionalInfo}>{item.phoneNumber && item.phoneNumber.trim() !== '' ? item.phoneNumber : 'N/A'}</Text>
            </View>
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
  totalContactsText: {
    fontSize: 12,
    marginBottom: 10,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  additionalInfoContainer: {
    marginLeft: 10,
    alignItems: 'flex-end',
  },
  additionalInfo: {
    color: '#666',
    fontStyle: 'italic',
  },
});
