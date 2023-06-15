interface GeneralObject {
    [key: string]: string | boolean;
}

export interface IMealDetails extends GeneralObject {
    _id: string;
    _Changed: string;
    _Created: string;
    name: string;
    imageUrl: string;
    description: string;
    mealCategory: string;
    mealTime: string;
    price: string;
    waitingTime: string;
    isAvailable: boolean;
}

// export interface MetaData {
//     _id: string;
// 	_Changed: string;
// 	_Created: string;
// }

export interface MenusByCategory {
    [key: string]: IMealDetails[];
}
