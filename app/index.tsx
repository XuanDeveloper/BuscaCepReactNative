import ConsultaCep from '@/components/ConsultaCep';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ConsultaCep />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});

export default App;
