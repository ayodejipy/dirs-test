export interface IMealDetails {
    name: string;
    imageUrl: string;
    description: string;
    mealCategory: string;
    mealTime: string;
    price: string;
    waitingTime: string;
    isAvailable: boolean;
}

export interface MenusByCategory {
	[key: string]: IMealDetails[]
}