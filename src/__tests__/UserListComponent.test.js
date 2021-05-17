import 'react-native';
import * as React from 'react';
import {render} from '@testing-library/react-native';
import UserListComponent from '../components/UserListComponent';

describe('User List component', () => {
  it('should show users', () => {
    const users = [
      {
        id: '412948129',
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
    ];

    const component = <UserListComponent users={users} />;
    const wrapper = render(component);

    expect(wrapper.queryAllByText('Mr. Emre Abacı')).toHaveLength(1);
    expect(
      wrapper.queryAllByText('Vatan Cd 7028, Hatay Elazığ, 34478 Turkey'),
    ).toHaveLength(1);
    expect(wrapper.queryAllByText('July 1, 1947')).toHaveLength(1);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('is getting users', () => {
    const isFetching = true;
    const component = <UserListComponent isLoading={isFetching} />;
    const wrapper = render(component);

    expect(wrapper.queryAllByTestId('loadingIcon')).toHaveLength(1);
  });

  it('get errors', () => {
    const fetchUsersError = {
      message: 'Something went wrong!',
    };
    const component = <UserListComponent error={fetchUsersError} />;
    const wrapper = render(component);

    expect(
      wrapper.queryAllByText('An error occurred: Something went wrong!'),
    ).toHaveLength(1);
  });
});
