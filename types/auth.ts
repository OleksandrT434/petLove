export type SignUpData = {
  name: string;
  email: string;
  password: string;
};

export type SignInData = {
  email: string;
  password: string;
};

export type AuthResponse = {
  name: string;
  email: string;
  token: string;
};
export type CurrentUser = {
  name: string;
  email: string;
};

export type UserNotice = {
  _id: string;
  species: string;
  category: string;
  price?: number;
  title: string;
  name: string;
  birthday: string;
  comment: string;
  sex: string;
  location: string;
  imgURL: string;
  createdAt: string;
  user: string;
  popularity: number;
  updatedAt: string;
};

export type UserPet = {
  _id: string;
  name: string;
  title: string;
  imgURL: string;
  species: string;
  birthday: string;
  sex: string;
  createdAt: string;
  updatedAt: string;
};

export type CurrentUserFull = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  token: string;
  noticesViewed: UserNotice[];
  noticesFavorites: UserNotice[];
  pets: UserPet[];
  createdAt: string;
  updatedAt: string;
};

export type EditUserData = {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
};