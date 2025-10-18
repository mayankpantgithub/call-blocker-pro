import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Setup() {
  const Step = ({ number, title, description }: any) => (
    <View style={styles.step}>
      <View style={styles.stepNumber}>
        <Text style={styles.stepNumberText}>{number}</Text>
      </View>
      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepDescription}>{description}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Ionicons name="construct" size={48} color="#007AFF" />
          <Text style={styles.title}>Setup Instructions</Text>
          <Text style={styles.subtitle}>
            Follow these steps to enable call blocking on your device
          </Text>
        </View>

        <View style={styles.stepsContainer}>
          <Step
            number="1"
            title="Add Numbers to Block"
            description="Use the app to add individual numbers, lists, or regex patterns you want to block."
          />

          <Step
            number="2"
            title="Enable Call Blocking"
            description="Go to Settings > Phone > Call Blocking & Identification on your iOS device."
          />

          <Step
            number="3"
            title="Activate This App"
            description="Find 'Call Blocker' in the list and toggle it ON to enable blocking."
          />

          <Step
            number="4"
            title="Test It Out"
            description="Blocked numbers will be sent directly to voicemail without ringing."
          />
        </View>

        <View style={styles.noteBox}>
          <Ionicons name="alert-circle" size={24} color="#FF9500" />
          <View style={styles.noteContent}>
            <Text style={styles.noteTitle}>Important Notes</Text>
            <Text style={styles.noteText}>
              • Changes may take a few minutes to apply{'
'}
              • This feature requires iOS 10 or later{'
'}
              • Works only on physical iOS devices, not simulators
            </Text>
          </View>
        </View>

        <View style={styles.techBox}>
          <Text style={styles.techTitle}>Technical Requirements</Text>
          <Text style={styles.techText}>
            This app uses iOS Call Directory Extension to block calls at the system level. 
            After ejecting from Expo and building with Xcode, you'll need to:
          </Text>
          <View style={styles.techList}>
            <Text style={styles.techItem}>• Configure App Groups in Xcode</Text>
            <Text style={styles.techItem}>• Add Call Directory Extension target</Text>
            <Text style={styles.techItem}>• Build and install on physical device</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0c0c',
  },
  content: {
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
  },
  stepsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  step: {
    flexDirection: 'row',
    backgroundColor: '#1c1c1c',
    padding: 16,
    borderRadius: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
  },
  noteBox: {
    flexDirection: 'row',
    backgroundColor: '#FF950020',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF9500',
    marginBottom: 24,
  },
  noteContent: {
    flex: 1,
    marginLeft: 12,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF9500',
    marginBottom: 8,
  },
  noteText: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
  },
  techBox: {
    backgroundColor: '#1c1c1c',
    padding: 16,
    borderRadius: 12,
  },
  techTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  techText: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
    marginBottom: 12,
  },
  techList: {
    gap: 4,
  },
  techItem: {
    fontSize: 14,
    color: '#007AFF',
    lineHeight: 20,
  },
});