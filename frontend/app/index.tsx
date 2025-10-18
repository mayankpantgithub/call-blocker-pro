import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getBlockedNumbers, getBlockLists, getRegexPatterns } from '../src/storage';

export default function Index() {
  const router = useRouter();
  const [stats, setStats] = useState({
    blockedNumbers: 0,
    blockLists: 0,
    regexPatterns: 0,
  });

  const loadStats = () => {
    const numbers = getBlockedNumbers();
    const lists = getBlockLists();
    const patterns = getRegexPatterns();
    
    setStats({
      blockedNumbers: numbers.length,
      blockLists: lists.length,
      regexPatterns: patterns.filter(p => p.enabled).length,
    });
  };

  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, [])
  );

  const MenuItem = ({ icon, title, description, onPress, count }: any) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIcon}>
        <Ionicons name={icon} size={28} color="#007AFF" />
      </View>
      <View style={styles.menuContent}>
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>{title}</Text>
          {count !== undefined && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{count}</Text>
            </View>
          )}
        </View>
        <Text style={styles.menuDescription}>{description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="shield-checkmark" size={60} color="#007AFF" />
          <Text style={styles.title}>Call Blocker</Text>
          <Text style={styles.subtitle}>Block unwanted calls with ease</Text>
        </View>

        {/* Setup Banner */}
        <TouchableOpacity 
          style={styles.setupBanner}
          onPress={() => router.push('/setup')}
        >
          <Ionicons name="information-circle" size={24} color="#FF9500" />
          <View style={styles.setupContent}>
            <Text style={styles.setupTitle}>Setup Required</Text>
            <Text style={styles.setupDescription}>Tap to view instructions</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#FF9500" />
        </TouchableOpacity>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>MANAGE BLOCKING</Text>
          
          <MenuItem
            icon="call"
            title="Blocked Numbers"
            description="Block individual phone numbers"
            count={stats.blockedNumbers}
            onPress={() => router.push('/blocked-numbers')}
          />
          
          <MenuItem
            icon="list"
            title="Block Lists"
            description="Manage lists of numbers"
            count={stats.blockLists}
            onPress={() => router.push('/block-lists')}
          />
          
          <MenuItem
            icon="code-slash"
            title="Regex Patterns"
            description="Block numbers matching patterns"
            count={stats.regexPatterns}
            onPress={() => router.push('/regex-patterns')}
          />
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How it works</Text>
          <Text style={styles.infoText}>
            This app uses iOS Call Directory Extension to block calls at the system level. 
            Blocked numbers won't ring and will be sent directly to voicemail.
          </Text>
        </View>
      </ScrollView>
    </View>
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
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    marginTop: 8,
  },
  setupBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF9500',
  },
  setupContent: {
    flex: 1,
    marginLeft: 12,
  },
  setupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF9500',
  },
  setupDescription: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  menuSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginLeft: 24,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#007AFF20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  menuDescription: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  badge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  infoSection: {
    backgroundColor: '#1c1c1c',
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
  },
});