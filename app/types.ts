// types.ts
export type RootStackParamList = {
  RestaurantList: undefined;
  MenuDetail: {
    menuId: string;
    title: string;
    price: number;
    description: string;
    image: any;
    options?: MenuOption[];
  };
  Cart: undefined;
  Home: undefined;
  Signup: undefined;
  Login: undefined;
  Main: undefined;
  Popular: undefined;
  Bobby: undefined;
  Coupon: undefined;
  BobbyStack: undefined;
  MyCart: undefined;
  HomeStack: undefined;
  RestaurantMenu: undefined;
  History: undefined;
  HistoryDetail: { orderId: number };
};

export interface MenuOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: any;
  isPopular?: boolean;
  options?: MenuOption[];
}

export interface CartItem extends MenuItem {
  quantity: number;
  selectedOptions: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  menus: MenuItem[];
}
// types.ts
export interface ValidityPeriod {
  start_date: string;
  end_date: string;
}

export interface CouponData {
  coupon_id: number;
  coupon_name: string;
  discount_amount: number;
  store_name: string;
  validity_period: ValidityPeriod;
  is_available: boolean;
}
