import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, UserListScreen } from './components/index';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{title: 'User Management'}}
        />
        <Stack.Screen
          name="UserList"
          component={UserListScreen}
          options={{title: 'Users'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;