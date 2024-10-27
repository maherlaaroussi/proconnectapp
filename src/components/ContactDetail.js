import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Linking, TouchableOpacity } from 'react-native';

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
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{contact.firstName?.trim() !== '' ? contact.firstName : 'N/A'} {contact.lastName?.trim() !== '' ? contact.lastName : 'N/A'}</Text>
        {contact.linkedInProfile?.trim() !== '' && (
          <TouchableOpacity
            style={styles.linkedinButton}
            onPress={() => Linking.openURL(contact.linkedInProfile)}
          >
            <Text style={styles.linkedinButtonText}>LinkedIn</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Informations Générales</Text>
        <Text style={styles.detail}>Email: {contact.email?.trim() !== '' ? contact.email : 'N/A'}</Text>
        <Text style={styles.detail}>Téléphone: {contact.phoneNumber?.trim() !== '' ? contact.phoneNumber : 'N/A'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Informations Professionnelles</Text>
        <Text style={styles.detail}>Opportunity: {contact.opportunity?.trim() !== '' ? contact.opportunity : 'N/A'}</Text>
        <Text style={styles.detail}>Position: {contact.position?.trim() !== '' ? contact.position : 'N/A'}</Text>
        <Text style={styles.detail}>Company: {contact.company?.trim() !== '' ? contact.company : 'N/A'}</Text>
        {contact.companyWebsite?.trim() !== '' && (
          <Text style={[styles.detail, styles.link]} onPress={() => Linking.openURL(contact.companyWebsite)}>
            Company Website
          </Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Réseaux et Relations</Text>
        <Text style={styles.detail}>Relationship: {contact.relationship?.trim() !== '' ? contact.relationship : 'N/A'}</Text>
        <Text style={styles.detail}>Contacté: {contact.contacted !== undefined ? (contact.contacted ? 'Oui' : 'Non') : 'N/A'}</Text>
      </View>
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
  nameContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linkedinButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#0077B5',
    borderRadius: 5,
  },
  linkedinButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
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
  link: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
});
