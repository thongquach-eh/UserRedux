import 'react-native';
import * as React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import UserListScreen from '../components/UserListScreen';
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

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => {
      const navigation = jest
        .requireActual('@react-navigation/native')
        .useNavigation();
      return {
        ...navigation,
        navigate: mockedNavigate,
      };
    },
  };
});

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
  const Stack = createStackNavigator();

  const store = configureStore(initialState);
  const component = (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="UserList"
            component={UserListScreen}
            options={{title: 'Users'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
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

  it('should navigate to Add User Screen', () => {
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
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
    const wrapper = render(component);

    const addUserBtn = wrapper.getByText('Add');
    fireEvent.press(addUserBtn);

    expect(mockedNavigate).toHaveBeenCalledWith('AddUser');
  });
});
