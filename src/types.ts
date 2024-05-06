export interface AuthFormSignIn {
  email: string;
  password: string;
}

export enum OrderStatus {
  pending = "В ожидании",
  inProgress = "Выполняется",
  completed = "Выполнена",
}

export enum DeliveryStatus {
  express = "Экспресс",
  cargo = "Грузовой",
}

export enum bodySizeMap {
  S = "Кузов S",
  M = "Кузов M",
  L = "Кузов L",
  XL = "Кузов XL",
}

export enum bodyWeightMap {
  S = "300",
  M = "700",
  L = "1500",
  XL = "2000",
}

export interface Order {
  client?: User;
  pointA: string;
  pointB: string;
  weight: number;
  typeOfCar: string;
  bodySize: string;
  movers: number | null;
  approximateTime: string
}

export interface OrderFull extends Order {
  _id: string;
  status: OrderStatus;
  driverStatus: string;
  createdAt: Date;
  updatedAt: Date;
  driver?: User;
}

export interface User {
  firstName: string;
  surName: string;
  phone: string;
  email: string;
  role: string;
  ordersMade: number;
}

export interface UserFull extends User {
  _id: string;
  password?: string;
  picturePath: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Places {
  value: string;
}



export interface InputProps {
  data: string;
  placeholder?: string;
  content?: string;
}

export interface ApplicationProps {
  id: string;
  clientName: string;
  date: Date;
  pointA: string;
  pointB: string;
  weight: number;
  status: OrderStatus;
  driverName?: string;
  driverStatus?: string;
  onDelete?: () => void;
  onUpdate?: () => void;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
}
