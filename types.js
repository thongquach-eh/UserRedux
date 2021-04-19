// @flow
export type RootStackParamList = {
  Home: typeof undefined,
  UserList: typeof undefined,
  UserDetails: {userEmail: string},
};

export type User = {
  +gender: ?string,
  +name: {
    +title: ?string,
    +first: string,
    +last: string,
  },
  +location: {
    +street: {
      +number: ?number,
      +name: ?string,
    },
    +city: ?string,
    +state: ?string,
    +country: ?string,
    +postcode: ?string,
  },
  +email: string,
  +dob: {
    +date: ?string,
    +age: ?number,
  },
  +phone: ?string,
  +cell: ?string,
  +picture: {
    +large: ?string,
    +medium: ?string,
    +thumbnail: ?string,
  },
};

export type UserState = {
  +users: Array<User>,
};

export type UserAction = {
  +type: string,
};

export type UserDispatch = (action: UserAction) => void;
