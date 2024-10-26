import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';

export default function ContactDetail({ route }) {
  const { id } = route.params;
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://proconnectapi-exaqapgkgkgad2cn.francecentral-01.azurewebsites.net/contact/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données du contact');
        }
        return response.json();
      })
      .then((data) => {
        setContact(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF0000" />
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erreur : {error}</Text>
      </View>
    );
  }

  if (!contact) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Impossible de charger les détails du contact.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Nom: {contact.firstName ?? 'Non disponible'} {contact.lastName ?? 'Non disponible'}</Text>
      <Text style={styles.detail}>Email: {contact.email ?? 'Non disponible'}</Text>
      <Text style={styles.detail}>Téléphone: {contact.phoneNumber ?? 'Non disponible'}</Text>
      <Text style={styles.detail}>Opportunity: {contact.opportunity ?? 'Non disponible'}</Text>
      <Text style={styles.detail}>LinkedIn Profile: {contact.linkedInProfile ?? 'Non disponible'}</Text>
      <Text style={styles.detail}>Relationship: {contact.relationship ?? 'Non disponible'}</Text>
      <Text style={styles.detail}>Contacted: {contact.contacted !== undefined ? (contact.contacted ? 'Oui' : 'Non') : 'Non disponible'}</Text>
      <Text style={styles.detail}>Position: {contact.position ?? 'Non disponible'}</Text>
      <Text style={styles.detail}>Company: {contact.company ?? 'Non disponible'}</Text>
      <Text style={styles.detail}>Company Website: {contact.companyWebsite ?? 'Non disponible'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginVertical: 5,
  },
});
