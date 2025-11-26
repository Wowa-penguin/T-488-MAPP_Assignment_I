import { DataProvider } from '@/components/dataState';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <DataProvider>
      <Stack />
    </DataProvider>
  );
}
