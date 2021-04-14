// @flow
import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type HomeScreenProps = {
  navigation: StackNavigationProp<any, any>,
  route: RouteProp<any, any>,
};

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

const HomeScreen = ({ navigation, route } : HomeScreenProps): React.Node => {
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