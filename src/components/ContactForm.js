import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function ContactForm({ navigation }) {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    // Ajoute d'autres champs si nécessaire
  });

  const creerContact = () => {
    fetch('https://proconnectapi-exaqapgkgkgad2cn.francecentral-01.azurewebsites.net/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    }).then(() => {
      navigation.navigate('Contacts');
    });
  };

  return (
    <View style={globalStyles.container}>
      <TextInput
        style={globalStyles.input}
        placeholder="Prénom"
        value={contact.firstName}
        onChangeText={(text) => setContact({ ...contact, firstName: text })}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Nom"
        value={contact.lastName}
        onChangeText={(text) => setContact({ ...contact, lastName: text })}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Email"
        value={contact.email}
        onChangeText={(text) => setContact({ ...contact, email: text })}
        keyboardType="email-address"
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Téléphone"
        value={contact.phoneNumber}
        onChangeText={(text) => setContact({ ...contact, phoneNumber: text })}
        keyboardType="phone-pad"
      />
      {/* Ajoute d'autres champs si nécessaire */}
      <TouchableOpacity style={globalStyles.button} onPress={creerContact}>
        <Text style={globalStyles.buttonText}>Créer</Text>
      </TouchableOpacity>
    </View>
  );
}