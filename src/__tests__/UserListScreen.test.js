import 'react-native';
import * as React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import UserListScreen from '../components/UserListScreen';
import AddUserScreen from '../components/AddUserScreen';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import usersReducer from '../UsersReducer';
import {
  reducers as apiReducers,
  middleware as apiMiddleware,
} from 'redux-api-call';
import {reducer as formReducer} from 'redux-form';
import {startFetchUsers} from '../UsersAction';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DateTimePicker from '@react-native-community/datetimepicker';
jest.mock('@react-native-community/datetimepicker');

const configureStore = initialState => {
  const middlewares = [apiMiddleware];
  const rootReducer = combineReducers({
    user: usersReducer,
    form: formReducer,
    ...apiReducers,
  });

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares),
  );

  let actions = [];
  const saveAction = next => action => {
    actions.push(action);
  };

  return {
    ...store,
    dispatch: saveAction(store.dispatch),
    getActions: () => actions,
  };
};

const renderComponent = initialState => {
  const store = configureStore(initialState);
  const component = (
    <Provider store={store}>
      <UserListScreen
        navigation={{
          setOptions: jest.fn(),
        }}
      />
    </Provider>
  );
  const wrapper = render(component);

  return {wrapper, store};
};

describe('User List Screen', () => {
  it('should show users', () => {
    const initialState = {
      user: {
        users: [
          {
            id: '12341214',
            gender: 'male',
            name: {
              title: 'Mr',
              first: 'Emre',
              last: 'Abacı',
            },
            location: {
              street: {
                number: 7028,
                name: 'Vatan Cd',
              },
              city: 'Hatay',
              state: 'Elazığ',
              country: 'Turkey',
              postcode: 34478,
            },
            email: 'emre.abaci@example.com',
            dob: {
              date: '1947-06-30T21:13:54.078Z',
              age: 74,
            },
            phone: '(439)-741-1246',
            cell: '(626)-097-5896',
            picture: {
              large: 'https://randomuser.me/api/portraits/men/39.jpg',
              medium: 'https://randomuser.me/api/portraits/med/men/39.jpg',
              thumbnail: 'https://randomuser.me/api/portraits/thumb/men/39.jpg',
            },
          },
        ],
      },
      api_calls: {
        FETCH_USERS: {
          isFetching: false,
          error: null,
        },
      },
    };
    const {wrapper} = renderComponent(initialState);

    expect(wrapper.queryAllByText('Mr. Emre Abacı')).toHaveLength(1);
    expect(
      wrapper.queryAllByText('Vatan Cd 7028, Hatay Elazığ, 34478 Turkey'),
    ).toHaveLength(1);
    expect(wrapper.queryAllByText('July 1, 1947')).toHaveLength(1);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('is getting users', () => {
    const initialState = {
      api_calls: {
        FETCH_USERS: {
          isFetching: true,
          error: null,
        },
      },
    };
    const {wrapper} = renderComponent(initialState);

    expect(wrapper.queryAllByTestId('loadingIcon')).toHaveLength(1);
  });

  it('get errors', () => {
    const initialState = {
      api_calls: {
        FETCH_USERS: {
          isFetching: false,
          error: {
            message: 'Something went wrong!',
          },
        },
      },
    };
    const {wrapper} = renderComponent(initialState);

    expect(
      wrapper.queryAllByText('An error occurred: Something went wrong!'),
    ).toHaveLength(1);
  });

  it('should fetch users when entering', () => {
    const {store} = renderComponent({});
    expect(store.getActions()).toContainEqual(startFetchUsers());
  });

  it('should navigate to Add User Screen 1', () => {
    const Stack = createStackNavigator();
    const store = configureStore({});
    const component = (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="UserList"
              component={UserListScreen}
              options={{title: 'Users'}}
            />
            <Stack.Screen
              name="AddUser"
              component={AddUserScreen}
              options={{title: 'Add User'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
    const wrapper = render(component);
    const addUserBtn = wrapper.getByText('Add');
    fireEvent.press(addUserBtn); //error happened here due to datetimepicker when rendering addUserScreen
    wrapper.debug();

    expect(wrapper.queryAllByText('Add User')).toHaveLength(1);
  });

  it('should navigate to Add User Screen 2', () => {
    const store = configureStore({});
    const navigation = {
      setOptions: jest.fn(),
      navigate: jest.fn(),
    };
    const component = (
      <Provider store={store}>
        <UserListScreen navigation={navigation} />
      </Provider>
    );
    const wrapper = render(component);

    const addUserBtn = wrapper.getByText('Add'); //error happened here because Add button does not exist without Navigation Container
    const navigateToAddUserScreenSpy = jest.spyOn(navigation, 'navigate');
    fireEvent.press(addUserBtn);

    expect(navigateToAddUserScreenSpy).toHaveBeenCalledWith('AddUser');
  });
});
