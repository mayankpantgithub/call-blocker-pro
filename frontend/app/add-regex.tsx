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
import { addRegexPattern } from '../src/storage';

export default function AddRegex() {
  const router = useRouter();
  const [pattern, setPattern] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const presetPatterns = [
    { pattern: '^\\+1800', desc: '1-800 numbers' },
    { pattern: '^\\+1888', desc: '1-888 numbers' },
    { pattern: '^\\+1900', desc: '1-900 numbers' },
    { pattern: '^\\+1\\d{10}$', desc: 'All US numbers' },
  ];

  const handleAdd = () => {
    if (!pattern.trim()) {
      setError('Please enter a regex pattern');
      return;
    }

    if (!description.trim()) {
      setError('Please enter a description');
      return;
    }

    // Validate regex
    try {
      new RegExp(pattern);
    } catch (e) {
      setError('Invalid regex pattern');
      return;
    }

    addRegexPattern({
      id: Date.now().toString(),
      pattern: pattern.trim(),
      description: description.trim(),
      enabled: true,
      createdAt: Date.now(),
    });

    Alert.alert('Success', 'Pattern added successfully', [
      {
        text: 'OK',
        onPress: () => router.back(),
      },
    ]);
  };

  const usePreset = (preset: any) => {
    setPattern(preset.pattern);
    setDescription(preset.desc);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="code-slash" size={48} color="#34C759" />
          </View>

          <Text style={styles.title}>Add Regex Pattern</Text>
          <Text style={styles.subtitle}>Block numbers matching a pattern</Text>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description *</Text>
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={(text) => {
                  setDescription(text);
                  setError('');
                }}
                placeholder="e.g., Block all toll-free numbers"
                placeholderTextColor="#666"
                autoFocus
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Regex Pattern *</Text>
              <TextInput
                style={[styles.input, styles.monospace]}
                value={pattern}
                onChangeText={(text) => {
                  setPattern(text);
                  setError('');
                }}
                placeholder="^\\+1800.*"
                placeholderTextColor="#666"
              />
              {error && <Text style={styles.errorText}>{error}</Text>}
            </View>

            <View style={styles.presetsSection}>
              <Text style={styles.presetsTitle}>Quick Presets</Text>
              {presetPatterns.map((preset, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.presetItem}
                  onPress={() => usePreset(preset)}
                >
                  <View style={styles.presetContent}>
                    <Text style={styles.presetDesc}>{preset.desc}</Text>
                    <Text style={styles.presetPattern}>{preset.pattern}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#666" />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.infoBox}>
              <Ionicons name="information-circle" size={20} color="#34C759" />
              <Text style={styles.infoText}>
                Regex patterns are evaluated against phone numbers in E.164 format (e.g., +12345678900)
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Add Pattern</Text>
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
    backgroundColor: '#34C75920',
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
  monospace: {
    fontFamily: 'monospace',
  },
  errorText: {
    fontSize: 12,
    color: '#FF3B30',
    marginTop: 4,
  },
  presetsSection: {
    gap: 8,
  },
  presetsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  presetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
    padding: 12,
    borderRadius: 8,
  },
  presetContent: {
    flex: 1,
  },
  presetDesc: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  presetPattern: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    color: '#34C759',
    marginTop: 4,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#34C75920',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#34C759',
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
    backgroundColor: '#34C759',
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