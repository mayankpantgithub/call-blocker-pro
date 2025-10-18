import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: '#0c0c0c',
          },
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Call Blocker',
            headerShown: true,
          }} 
        />
        <Stack.Screen 
          name="blocked-numbers" 
          options={{ title: 'Blocked Numbers' }} 
        />
        <Stack.Screen 
          name="block-lists" 
          options={{ title: 'Block Lists' }} 
        />
        <Stack.Screen 
          name="regex-patterns" 
          options={{ title: 'Regex Patterns' }} 
        />
        <Stack.Screen 
          name="add-number" 
          options={{ title: 'Add Number' }} 
        />
        <Stack.Screen 
          name="add-list" 
          options={{ title: 'Create List' }} 
        />
        <Stack.Screen 
          name="add-regex" 
          options={{ title: 'Add Pattern' }} 
        />
        <Stack.Screen 
          name="setup" 
          options={{ title: 'Setup Instructions' }} 
        />
      </Stack>
    </GestureHandlerRootView>
  );
}