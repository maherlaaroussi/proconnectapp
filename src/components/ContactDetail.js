import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Linking, TouchableOpacity } from 'react-native';

export default function ContactDetail({ route, navigation }) {
  const { id } = route.params;
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteTimeout, setDeleteTimeout] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(`https://proconnectapi-exaqapgkgkgad2cn.francecentral-01.azurewebsites.net/contact/${id}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données du contact');
        }
        const data = await response.json();
        setContact(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  const handleDeletePress = () => {
    if (deleteConfirm) {
      supprimerContactAPI();
    } else {
      setDeleteConfirm(true);
      const timeout = setTimeout(() => {
        setDeleteConfirm(false);
      }, 5000);
      setDeleteTimeout(timeout);
    }
  };

  const supprimerContactAPI = async () => {
    try {
      console.log("Tentative de suppression du contact avec l'id:", id);
      const response = await fetch(`https://proconnectapi-exaqapgkgkgad2cn.francecentral-01.azurewebsites.net/contact/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du contact');
      }
      console.log("Contact supprimé avec succès");
      navigation.navigate('Contacts');
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de la suppression du contact.", [
        { text: "OK" }
      ]);
    } finally {
      clearTimeout(deleteTimeout);
      setDeleteConfirm(false);
    }
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
    <View style={styles.flexContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{contact.firstName?.trim() !== '' ? contact.firstName : 'N/A'} {contact.lastName?.trim() !== '' ? contact.lastName : 'N/A'}</Text>
        </View>

        <View style={{ height: 20 }} />

        <View style={styles.section}>
          <Text style={styles.header}>Informations générales</Text>
          <Text style={styles.detail}>Email: {contact.email?.trim() !== '' ? contact.email : 'N/A'}</Text>
          <Text style={styles.detail}>Téléphone: {contact.phoneNumber?.trim() !== '' ? contact.phoneNumber : 'N/A'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Informations professionnelles</Text>
          <Text style={styles.detail}>Opportunity: {contact.opportunity?.trim() !== '' ? contact.opportunity : 'N/A'}</Text>
          <Text style={styles.detail}>Position: {contact.position?.trim() !== '' ? contact.position : 'N/A'}</Text>
          <Text style={styles.detail}>Company: {contact.company?.trim() !== '' ? contact.company : 'N/A'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Réseaux et relations</Text>
          <Text style={styles.detail}>Relationship: {contact.relationship?.trim() !== '' ? contact.relationship : 'N/A'}</Text>
          <Text style={styles.detail}>Contacté: {contact.contacted !== undefined ? (contact.contacted ? 'Oui' : 'Non') : 'N/A'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Liens</Text>
          <View style={styles.linkButtonsContainer}>
            {contact.linkedInProfile?.trim() !== '' && (
              <TouchableOpacity
                style={styles.compactButton}
                onPress={() => {
                  const url = contact.linkedInProfile.startsWith('http') ? contact.linkedInProfile : `https://${contact.linkedInProfile}`;
                  Linking.openURL(url);
                }}
              >
                <Text style={styles.compactButtonText}>LinkedIn</Text>
              </TouchableOpacity>
            )}
            {contact.companyWebsite?.trim() !== '' && (
              <TouchableOpacity
                style={styles.compactButton}
                onPress={() => {
                  const url = contact.companyWebsite.startsWith('http') ? contact.companyWebsite : `https://${contact.companyWebsite}`;
                  Linking.openURL(url);
                }}
              >
                <Text style={styles.compactButtonText}>Website</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.deleteButton, styles.adjustedDeleteButton]} onPress={handleDeletePress}>
          <Text style={styles.deleteButtonText}>{deleteConfirm ? 'Confirmez-vous la suppression ?' : 'Supprimer le contact'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
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
  linkButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  compactButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    alignItems: 'center',
  },
  compactButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonContainer: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  adjustedDeleteButton: {
    maxWidth: '90%',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
