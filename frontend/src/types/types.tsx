export type User = {
  name: string;
  userId: string;
} | undefined;

export type UserData = {
  user: User;
  token: string;
};

export type UserContextType = {
  token: string;
  setToken: (token: string) => void;
  currentUser: User | undefined;
  setCurrentUser: (arg0: User) => void;
};

export type Job = {
  status: string;
  company: string;
  position: string;
  createdAt: string;
  updatedAt: Date;
  _id: string;
};

export type APIResponse = {
  ok: boolean;
  status: number;
  statusText: string;
};
