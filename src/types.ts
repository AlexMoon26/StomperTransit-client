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
  _id: string;
  firstName: string;
  surName: string;
  phone: string;
  email: string;
  password: string;
  picturePath: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IProps {
  name: string;
  imgUser: string;
  countOrder: number;
  status: string;
  rating?: number;
}

export interface TableProps {
  data: Array<IProps>;
  clients?: Boolean;
  drivers?: Boolean;
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
