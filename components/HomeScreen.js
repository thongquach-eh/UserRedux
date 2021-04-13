import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
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