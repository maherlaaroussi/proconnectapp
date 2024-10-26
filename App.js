import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ContactList from './src/components/ContactList';
import ContactDetail from './src/components/ContactDetail';
import ContactForm from './src/components/ContactForm';
import { globalStyles } from './src/styles/globalStyles';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Contacts"
        screenOptions={{
          headerStyle: { backgroundColor: '#FF0000' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Contacts"
          component={ContactList}
          options={{ title: 'Liste de Contacts' }}
        />
        <Stack.Screen
          name="Détails du Contact"
          component={ContactDetail}
          options={{ title: 'Détails du Contact' }}
        />
        <Stack.Screen
          name="Nouveau Contact"
          component={ContactForm}
          options={{ title: 'Ajouter un Contact' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
