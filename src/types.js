// @flow
export type RootStackParamList = {
  Home: typeof undefined,
  UserList: typeof undefined,
  UserDetails: {id: string},
  AddUser: typeof undefined,
  EditUser: {id: string},
};

export type User = {
  +id: string,
  +gender: ?string,
  name: FullName,
  location: Location,
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

export type FullName = {
  +title?: string,
  +first: string,
  +last: string,
};

export type Location = {
  +street?: {
    +number?: ?number,
    +name?: string,
  },
  +city?: string,
  +state?: string,
  +country?: string,
  +postcode?: ?number,
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
  editedUser: User,
};

export type UserDispatch = (action: UserAction) => void;
