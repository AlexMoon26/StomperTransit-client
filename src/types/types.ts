import dayjs from "dayjs";

interface IProps {
	name: string;
	imgUser: string;
	countOrder: number;
	status: string;
	rating?: number;
}

export interface TableProps {
	data: Array<IProps>,
	clients?: Boolean,
	drivers?: Boolean
}

export interface InputProps {
	data: string,
	placeholder?: string,
	content?: string
}

export interface ApplicationProps {
	id: string;
	clientName: string;
	date: string;
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

export enum OrderStatus {
	Pending = "В ожидании",
	InProgress = "Выполняется",
	Completed = "Выполнена"
}