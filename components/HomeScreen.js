import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcomeText: {
    fontSize: 50,
    textAlign: 'center'
  }
});

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Mobile Training</Text>
      <Button
        title='Go to User List'
        onPress={() => navigation.navigate('UserList')}
      />
    </View>
  );
}

export default HomeScreen;