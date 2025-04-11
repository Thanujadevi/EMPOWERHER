import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import { Input } from '../components/Input';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Contacts from 'expo-contacts';

const ContactForm = ({ contact, index, onUpdate, onRemove }) => {
  const handleInputChange = (field, value) => {
    onUpdate(index, { ...contact, [field]: value });
  };

  return (
    <View style={styles.contactForm}>
      <View style={styles.contactHeader}>
        <Text style={styles.contactTitle}>Emergency Contact {index + 1}</Text>
        {index > 0 && (
          <TouchableOpacity onPress={() => onRemove(index)}>
            <Icon name="delete" size={24} color={theme.colors.error} />
          </TouchableOpacity>
        )}
      </View>
      
      <Input
        label="Name"
        placeholder="Enter contact name"
        value={contact.name}
        onChangeText={(value) => handleInputChange('name', value)}
      />
      
      <Input
        label="Relationship"
        placeholder="Enter relationship (e.g., Parent, Friend)"
        value={contact.relationship}
        onChangeText={(value) => handleInputChange('relationship', value)}
      />
      
      <Input
        label="Phone Number"
        placeholder="Enter phone number"
        value={contact.phone}
        onChangeText={(value) => handleInputChange('phone', value)}
        keyboardType="phone-pad"
      />
    </View>
  );
};

const EmergencyContactSetup = () => {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState([
    { name: '', relationship: '', phone: '' },
  ]);
  const [loading, setLoading] = useState(false);

  const handleAddContact = () => {
    if (contacts.length < 3) {
      setContacts([...contacts, { name: '', relationship: '', phone: '' }]);
    }
  };

  const handleUpdateContact = (index, updatedContact) => {
    const updatedContacts = [...contacts];
    updatedContacts[index] = updatedContact;
    setContacts(updatedContacts);
  };

  const handleRemoveContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  const handleImportContacts = async () => {
    try {
      setLoading(true);
      const { status } = await Contacts.requestPermissionsAsync();
      
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name],
        });
        
        if (data.length > 0) {
          Alert.alert(
            'Select Contact',
            'Choose a contact to import',
            data.slice(0, 5).map((contact, index) => ({
              text: contact.name || `Contact ${index + 1}`,
              onPress: () => {
                const phoneNumber = contact.phoneNumbers && contact.phoneNumbers[0]?.number;
                if (phoneNumber) {
                  const newContact = {
                    name: contact.name || '',
                    relationship: '',
                    phone: phoneNumber,
                  };
                  
                  if (contacts.length < 3) {
                    setContacts([...contacts, newContact]);
                  } else {
                    Alert.alert('Maximum Contacts', 'You can only add up to 3 emergency contacts.');
                  }
                }
              },
            })).concat([
              { text: 'Cancel', style: 'cancel' },
            ])
          );
        } else {
          Alert.alert('No Contacts', 'No contacts found on your device.');
        }
      } else {
        Alert.alert('Permission Denied', 'Please grant contacts permission to import contacts.');
      }
    } catch (error) {
      console.error('Error importing contacts:', error);
      Alert.alert('Error', 'Failed to import contacts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const validateContacts = () => {
    // Check if at least one contact is filled
    const hasValidContact = contacts.some(
      contact => contact.name && contact.phone
    );
    
    if (!hasValidContact) {
      Alert.alert('Error', 'Please add at least one emergency contact with name and phone number.');
      return false;
    }
    
    // Validate phone numbers
    for (const contact of contacts) {
      if (contact.phone && !/^\+?[\d\s-]{10,}$/.test(contact.phone)) {
        Alert.alert('Error', `Please enter a valid phone number for ${contact.name || 'contact'}.`);
        return false;
      }
    }
    
    return true;
  };

  const handleSave = async () => {
    if (!validateContacts()) return;
    
    try {
      setLoading(true);
      // Here you would save the contacts to your backend or local storage
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to the next screen
      navigation.navigate('VoiceEnrollment');
    } catch (error) {
      console.error('Error saving contacts:', error);
      Alert.alert('Error', 'Failed to save contacts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Emergency Contacts</Text>
          <Text style={styles.subtitle}>
            Add up to three emergency contacts who will be notified in case of an emergency
          </Text>
        </View>
        
        <View style={styles.contactsContainer}>
          {contacts.map((contact, index) => (
            <ContactForm
              key={index}
              contact={contact}
              index={index}
              onUpdate={handleUpdateContact}
              onRemove={handleRemoveContact}
            />
          ))}
          
          {contacts.length < 3 && (
            <Button
              title="Add Another Contact"
              variant="outline"
              onPress={handleAddContact}
              style={styles.addButton}
              icon={<Icon name="plus" size={20} color={theme.colors.primary} />}
            />
          )}
          
          <Button
            title="Import from Contacts"
            variant="outline"
            onPress={handleImportContacts}
            style={styles.importButton}
            icon={<Icon name="contacts" size={20} color={theme.colors.primary} />}
          />
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          title="Save & Continue"
          loading={loading}
          disabled={loading}
          onPress={handleSave}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: theme.spacing.lg,
  },
  header: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.md,
    color: theme.colors.textSecondary,
  },
  contactsContainer: {
    marginBottom: theme.spacing.xl,
  },
  contactForm: {
    backgroundColor: theme.colors.background,
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  contactTitle: {
    fontSize: theme.typography.md,
    fontWeight: '600',
    color: theme.colors.text,
  },
  addButton: {
    marginBottom: theme.spacing.md,
  },
  importButton: {
    marginBottom: theme.spacing.md,
  },
  footer: {
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
});

export default EmergencyContactSetup; 