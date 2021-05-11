// @flow
export type RootStackParamList = {
  Home: typeof undefined,
  UserList: typeof undefined,
  UserDetails: {id: string},
  AddUser: typeof undefined,
  EditUser: {user: User},
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

export type RootState = {
  user: UserState,
};

export type UserState = {
  +users: Array<User>,
};

export type UserAction =
  | NoAction
  | PressAddUserAction
  | AddUserAction
  | PressEditUserAction
  | EditUserAction
  | AddUsersAction
  | StartFetchingAction;

export type NoAction = {
  type: 'NO_ACTION',
};

export type PressAddUserAction = {
  type: 'PRESS_ADD_USER',
};

export type AddUserAction = {
  type: 'ADD_USER',
  newUser: User,
};

export type AddUsersAction = {
  type: 'ADD_USERS',
  newUsers: User[],
};

export type PressEditUserAction = {
  type: 'PRESS_EDIT_USER',
};

export type EditUserAction = {
  type: 'EDIT_USER',
  editedUser: User,
};

export type StartFetchingAction = {
  type: 'START_FETCHING',
  apiName: string,
};

export type UserDispatch = (action: UserAction) => void;
