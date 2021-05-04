// @flow
import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  HomeScreen,
  UserListScreen,
  UserDetailsScreen,
  AddUserScreen,
  EditUserScreen,
} from './components/index';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import usersReducer from './UsersReducer';
import {
  reducers as apiReducers,
  middleware as apiMiddleware,
} from 'redux-api-call';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import usersEpic from './UsersEpic';

const rootEpic = combineEpics(usersEpic);
const epicMiddleware = createEpicMiddleware();
const middlewares = applyMiddleware(apiMiddleware, epicMiddleware);

const rootReducer = combineReducers({
  user: usersReducer,
  ...apiReducers,
});

const store = createStore(rootReducer, {}, middlewares);
epicMiddleware.run(rootEpic);
const Stack = createStackNavigator();

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
            name="AddUser"
            component={AddUserScreen}
            options={{title: 'Add User'}}
          />
          <Stack.Screen
            name="EditUser"
            component={EditUserScreen}
            options={{title: 'Edit User'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
