import { DataProvider } from '@/util/dataState';
import { Stack } from 'expo-router';
import { store } from '@/store/index';
import { Provider } from 'react-redux';

export default function RootLayout() {
  return (
    // <DataProvider>
    <Provider store={store}>
      <Stack />
    </Provider>
    // </DataProvider>
  );
}
