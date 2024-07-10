export interface User {
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  sub: string;
}

export type Car = {
  body_styles: string;
  make: string;
  model: string;
  year?: string;
};

interface CarList {
  [key: string]: Car;
}

export interface Vehicles {
  loading: boolean;
  error: string | null;
  list: CarList;
  listByIds: string[];
}

export interface State {
  user: User;
  vehicles: Vehicles;
}
