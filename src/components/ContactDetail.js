import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Linking, TouchableOpacity, Alert } from 'react-native';

export default function ContactDetail({ route, navigation }) {
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

  const supprimerContact = () => {
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
            console.log("Tentative de suppression du contact avec l'id:", id);
            fetch(`https://proconnectapi-exaqapgkgkgad2cn.francecentral-01.azurewebsites.net/contact/${id}`, {
              method: 'DELETE',
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error('Erreur lors de la suppression du contact');
                }
                console.log("Contact supprimé avec succès");
                navigation.navigate('Contacts');
              })
              .catch((error) => {
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
            onPress={() => {
              const url = contact.linkedInProfile.startsWith('http') ? contact.linkedInProfile : `https://${contact.linkedInProfile}`;
              Linking.openURL(url);
            }}
          >
            <Text style={styles.linkedinButtonText}>in</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ height: 20 }} />

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
          <TouchableOpacity
            onPress={() => {
              const url = contact.companyWebsite.startsWith('http') ? contact.companyWebsite : `https://${contact.companyWebsite}`;
              Linking.openURL(url);
            }}
          >
            <Text style={[styles.detail, styles.link]}>Company Website</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Réseaux et Relations</Text>
        <Text style={styles.detail}>Relationship: {contact.relationship?.trim() !== '' ? contact.relationship : 'N/A'}</Text>
        <Text style={styles.detail}>Contacté: {contact.contacted !== undefined ? (contact.contacted ? 'Oui' : 'Non') : 'N/A'}</Text>
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 30 }}>
        <TouchableOpacity style={styles.deleteButton} onPress={supprimerContact}>
          <Text style={styles.deleteButtonText}>Supprimer le Contact</Text>
        </TouchableOpacity>
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
    width: 40,
    height: 40,
    backgroundColor: '#0077B5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkedinButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
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
  deleteButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
