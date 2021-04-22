// @flow
import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  HomeScreen,
  UserListScreen,
  UserDetailsScreen,
  UserUpdateScreen,
} from './components/index';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import usersReducer from './UsersReducer';

const Stack = createStackNavigator();
const store = createStore(usersReducer);

function App(): React.Node {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'User Management'}}
          />
          <Stack.Screen
            name="UserList"
            component={UserListScreen}
            options={{title: 'Users'}}
          />
          <Stack.Screen
            name="UserDetails"
            component={UserDetailsScreen}
            options={{title: 'User Details'}}
          />
          <Stack.Screen
            name="UserUpdate"
            component={UserUpdateScreen}
            options={{title: 'Create/Edit User'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
