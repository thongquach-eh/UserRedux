import 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {
  reducers as apiReducers,
  middleware as apiMiddleware,
} from 'redux-api-call';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {reducer as formReducer} from 'redux-form';
import * as React from 'react';

import {render, fireEvent} from '@testing-library/react-native';
import renderer from 'react-test-renderer';

import {HomeScreen} from '../components';
import UserListScreen from '../components/UserListScreen';
import usersEpic from '../UsersEpic';
import usersReducer from '../UsersReducer';

const rootEpic = combineEpics(usersEpic);
const epicMiddleware = createEpicMiddleware();
const middlewares = [apiMiddleware, epicMiddleware];
import {createStore, combineReducers, applyMiddleware} from 'redux';
const rootReducer = combineReducers({
  user: usersReducer,
  form: formReducer,
  ...apiReducers,
});

const configureStore = state => {
  return createStore(rootReducer, state, applyMiddleware(...middlewares));
};
// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// jest.mock('react-native-reanimated', () => {
//   const Reanimated = require('react-native-reanimated/mock');

//   // The mock for `call` immediately calls the callback which is incorrect
//   // So we override it with a no-op
//   Reanimated.default.call = () => {};

//   return Reanimated;
// });

describe('Home screen', () => {
  // test('snapshot test', () => {
  //   const component = (
  //     <NavigationContainer>
  //       <HomeScreen />
  //     </NavigationContainer>
  //   );
  //   const tree = renderer.create(component).toJSON();

  //   expect(tree).toMatchSnapshot();
  // });

  test('should show users', () => {
    const store = configureStore({
      user: {
        users: [
          {
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
    });

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

    expect(wrapper.queryAllByText('Mr. Emre Abacı')).toHaveLength(1);
  });

  describe('is getting users', () => {
    var wrapper;
    beforeEach(() => {
      const store = configureStore({
        user: {},
        api_calls: {
          FETCH_USERS: {
            isFetching: true,
            error: null,
          },
        },
      });

      const component = (
        <Provider store={store}>
          <UserListScreen
            navigation={{
              setOptions: jest.fn(),
            }}
          />
        </Provider>
      );

      wrapper = render(component);
    });

    test('render Loading', () => {
      expect(wrapper.queryAllByTestId('loading')).toHaveLength(1);
    });
  });

  describe('get errors', () => {
    var wrapper;
    beforeEach(() => {
      const store = configureStore({
        user: {},
        api_calls: {
          FETCH_USERS: {
            isFetching: false,
            error: {
              message: 'Something went wrong!',
            },
          },
        },
      });

      const component = (
        <Provider store={store}>
          <UserListScreen
            navigation={{
              setOptions: jest.fn(),
            }}
          />
        </Provider>
      );

      wrapper = render(component);
    });

    fit('should render error', () => {
      expect(wrapper.toJSON()).toMatchSnapshot();
      expect(
        wrapper.queryAllByText('An error occurred: Something went wrong!'),
      ).toHaveLength(1);
    });
  });
});
