import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function ContactDetail({ route }) {
  const { id } = route.params;
  const [contact, setContact] = useState(null);

  useEffect(() => {
    fetch(`https://proconnectapi-exaqapgkgkgad2cn.francecentral-01.azurewebsites.net/contact/${id}`)
      .then((response) => response.json())
      .then((data) => setContact(data));
  }, []);

  if (!contact) {
    return (
      <View style={globalStyles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>
        {contact.firstName} {contact.lastName}
      </Text>
      <Text style={{ marginVertical: 5 }}>Email: {contact.email}</Text>
      <Text style={{ marginVertical: 5 }}>Téléphone: {contact.phoneNumber}</Text>
      {/* Ajoute d'autres informations selon tes besoins */}
    </View>
  );
}
