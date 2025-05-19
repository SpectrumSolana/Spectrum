import { useColorScheme } from 'react-native';

export const useTheme = () => {
  const colorScheme = useColorScheme();

  const colors = {
    primary: '#007AFF',
    background: colorScheme === 'dark' ? '#000000' : '#FFFFFF',
    text: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
    border: colorScheme === 'dark' ? '#333333' : '#E5E5E5',
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
  };

  return { colors };
}; 