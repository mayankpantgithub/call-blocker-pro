import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getRegexPatterns, removeRegexPattern, updateRegexPattern, RegexPattern } from '../src/storage';

export default function RegexPatterns() {
  const router = useRouter();
  const [patterns, setPatterns] = useState<RegexPattern[]>([]);

  const loadPatterns = () => {
    const regexPatterns = getRegexPatterns();
    setPatterns(regexPatterns.sort((a, b) => b.createdAt - a.createdAt));
  };

  useFocusEffect(
    useCallback(() => {
      loadPatterns();
    }, [])
  );

  const handleToggle = (item: RegexPattern) => {
    updateRegexPattern(item.id, { enabled: !item.enabled });
    loadPatterns();
  };

  const handleDelete = (item: RegexPattern) => {
    Alert.alert(
      'Remove Pattern',
      `Remove pattern "${item.description}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            removeRegexPattern(item.id);
            loadPatterns();
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: RegexPattern }) => (
    <View style={styles.item}>
      <View style={styles.itemIcon}>
        <Ionicons name="code-slash" size={20} color="#34C759" />
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.pattern}>{item.pattern}</Text>
        <Text style={styles.date}>
          Created {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.toggle, item.enabled && styles.toggleActive]}
        onPress={() => handleToggle(item)}
      >
        <Ionicons 
          name={item.enabled ? 'checkmark' : 'close'} 
          size={16} 
          color="#fff" 
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item)}
      >
        <Ionicons name="trash-outline" size={20} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {patterns.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="code-slash-outline" size={64} color="#333" />
          <Text style={styles.emptyTitle}>No Regex Patterns</Text>
          <Text style={styles.emptySubtitle}>Add patterns to block number ranges</Text>
        </View>
      ) : (
        <FlatList
          data={patterns}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      )}
      
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/add-regex')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0c0c',
  },
  list: {
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#34C75920',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  description: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  pattern: {
    fontSize: 13,
    fontFamily: 'monospace',
    color: '#34C759',
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  toggle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  toggleActive: {
    backgroundColor: '#34C759',
  },
  deleteButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});