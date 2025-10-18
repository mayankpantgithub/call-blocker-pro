import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getBlockLists, removeBlockList, BlockList } from '../src/storage';

export default function BlockLists() {
  const router = useRouter();
  const [lists, setLists] = useState<BlockList[]>([]);

  const loadLists = () => {
    const blockLists = getBlockLists();
    setLists(blockLists.sort((a, b) => b.createdAt - a.createdAt));
  };

  useFocusEffect(
    useCallback(() => {
      loadLists();
    }, [])
  );

  const handleDelete = (item: BlockList) => {
    Alert.alert(
      'Remove List',
      `Remove "${item.name}" with ${item.numbers.length} numbers?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            removeBlockList(item.id);
            loadLists();
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: BlockList }) => (
    <View style={styles.item}>
      <View style={styles.itemIcon}>
        <Ionicons name="list" size={20} color="#007AFF" />
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.count}>
          {item.numbers.length} number{item.numbers.length !== 1 ? 's' : ''}
        </Text>
        <Text style={styles.date}>
          Created {new Date(item.createdAt).toLocaleDateString()}
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
      {lists.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="list-outline" size={64} color="#333" />
          <Text style={styles.emptyTitle}>No Block Lists</Text>
          <Text style={styles.emptySubtitle}>Create lists to manage multiple numbers</Text>
        </View>
      ) : (
        <FlatList
          data={lists}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      )}
      
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/add-list')}
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
    backgroundColor: '#007AFF20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  count: {
    fontSize: 14,
    color: '#007AFF',
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