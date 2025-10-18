import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { addBlockList } from '../src/storage';
import { parsePhoneNumbers } from '../src/phoneValidator';

export default function AddList() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [numbers, setNumbers] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!name.trim()) {
      setError('Please enter a list name');
      return;
    }

    if (!numbers.trim()) {
      setError('Please enter at least one phone number');
      return;
    }

    const parsedNumbers = parsePhoneNumbers(numbers);
    
    if (parsedNumbers.length === 0) {
      setError('No valid phone numbers found');
      return;
    }

    addBlockList({
      id: Date.now().toString(),
      name: name.trim(),
      numbers: parsedNumbers,
      createdAt: Date.now(),
    });

    Alert.alert(
      'Success',
      `Added list "${name}" with ${parsedNumbers.length} number${parsedNumbers.length !== 1 ? 's' : ''}`,
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="list" size={48} color="#007AFF" />
          </View>

          <Text style={styles.title}>Create Block List</Text>
          <Text style={styles.subtitle}>Add multiple numbers at once</Text>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>List Name *</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  setError('');
                }}
                placeholder="e.g., Telemarketers, Spam Numbers"
                placeholderTextColor="#666"
                autoFocus
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Numbers *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={numbers}
                onChangeText={(text) => {
                  setNumbers(text);
                  setError('');
                }}
                placeholder="Paste numbers here, one per line or comma-separated"
                placeholderTextColor="#666"
                multiline
                numberOfLines={10}
                textAlignVertical="top"
              />
              {error && <Text style={styles.errorText}>{error}</Text>}
            </View>

            <View style={styles.infoBox}>
              <Ionicons name="information-circle" size={20} color="#007AFF" />
              <Text style={styles.infoText}>
                Enter numbers in any format. Numbers must include country code (e.g., +1 for US)
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Create List</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0c0c',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF20',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  input: {
    backgroundColor: '#1c1c1c',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#fff',
  },
  textArea: {
    minHeight: 200,
  },
  errorText: {
    fontSize: 12,
    color: '#FF3B30',
    marginTop: 4,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#007AFF20',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#007AFF',
    lineHeight: 18,
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#0c0c0c',
    borderTopWidth: 1,
    borderTopColor: '#1c1c1c',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
});