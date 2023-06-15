export interface IMealDetails {
    name: string;
    imageUrl: string;
    description: string;
    mealCategory: string;
    mealTime: string;
    price: string;
    waitingTime: string;
	isAvailable: boolean;
	_id: string | null;
	_Changed: string | null;
	_Created: string | null;
}

export interface MetaData {
    _id: string;
	_Changed: string;
	_Created: string;
}

export interface MenusByCategory {
	[key: string]: IMealDetails[]
}