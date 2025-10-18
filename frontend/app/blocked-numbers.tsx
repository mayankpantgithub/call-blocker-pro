import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getBlockedNumbers, removeBlockedNumber, BlockedNumber } from '../src/storage';

export default function BlockedNumbers() {
  const router = useRouter();
  const [numbers, setNumbers] = useState<BlockedNumber[]>([]);

  const loadNumbers = () => {
    const blocked = getBlockedNumbers();
    setNumbers(blocked.sort((a, b) => b.addedAt - a.addedAt));
  };

  useFocusEffect(
    useCallback(() => {
      loadNumbers();
    }, [])
  );

  const handleDelete = (item: BlockedNumber) => {
    Alert.alert(
      'Remove Number',
      `Remove ${item.number} from blocked list?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            removeBlockedNumber(item.id);
            loadNumbers();
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: BlockedNumber }) => (
    <View style={styles.item}>
      <View style={styles.itemIcon}>
        <Ionicons name="call" size={20} color="#FF3B30" />
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.number}>{item.number}</Text>
        {item.label && <Text style={styles.label}>{item.label}</Text>}
        <Text style={styles.date}>
          Added {new Date(item.addedAt).toLocaleDateString()}
        </Text>
      </View>
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
      {numbers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="call-outline" size={64} color="#333" />
          <Text style={styles.emptyTitle}>No Blocked Numbers</Text>
          <Text style={styles.emptySubtitle}>Add numbers to block unwanted calls</Text>
        </View>
      ) : (
        <FlatList
          data={numbers}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      )}
      
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/add-number')}
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
    backgroundColor: '#FF3B3020',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  number: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  label: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
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