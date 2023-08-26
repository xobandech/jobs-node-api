export type User = {
  name: string;
  userId: string;
};

export type UserData = {
  user: User;
  token: string;
};

export type UserContextType = {
  token: string;
  setToken: (token: string) => void;
  currentUser: User;
  setCurrentUser: (arg0: User) => void;
};

export type Job = {
    status: string
    company: string
    position: string
    createdAt: string
    updatedAt: Date
    _id: string
}