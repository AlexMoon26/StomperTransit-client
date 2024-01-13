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
	clientName: string;
	date: string;
	pointA: string;
	pointB: string;
	weight: number;
	status: string;
	driverName?: string;
	driverStatus?: string
}

export interface IUser {
	id: number;
	name: string;
	email: string;
}