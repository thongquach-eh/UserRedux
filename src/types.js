// @flow
export type RootStackParamList = {
  Home: typeof undefined,
  UserList: typeof undefined,
  UserDetails: {userEmail: string},
  AddUser: typeof undefined,
  EditUser: {userEmail: string},
};

export type User = {
  +gender: ?string,
  +name: {
    +title?: string,
    +first: string,
    +last: string,
  },
  +location?: {
    +street: {
      +number: ?number,
      +name: ?string,
    },
    +city: ?string,
    +state: ?string,
    +country: ?string,
    +postcode: number,
  },
  +email: string,
  +dob?: {
    +date: ?string,
    +age: ?number,
  },
  +phone: ?string,
  +cell: ?string,
  +picture?: {
    +large: ?string,
    +medium: ?string,
    +thumbnail: ?string,
  },
};

export type UserState = {
  +users: Array<User>,
};

export type UserAction = AddUserAction | EditUserAction;

export type AddUserAction = {
  type: 'ADD_USER',
  newUser: User,
};

export type EditUserAction = {
  type: 'EDIT_USER',
  email: string,
  editedUser: User,
};

export type UserDispatch = (action: UserAction) => void;
