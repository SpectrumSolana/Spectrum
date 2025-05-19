import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { theme } from '../theme/theme';

interface WebViewScreenProps {
  route: {
    params: {
      url: string;
      title: string;
    };
  };
}

const WebViewScreen: React.FC<WebViewScreenProps> = ({ route }) => {
  const { url, title } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <WebView 
        source={{ uri: url }}
        style={styles.webview}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  webview: {
    flex: 1,
  },
});

export default WebViewScreen; 