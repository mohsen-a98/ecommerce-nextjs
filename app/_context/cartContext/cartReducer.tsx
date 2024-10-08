export interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  images: string[];
  description: string;
}

export type CartState = CartItem[];

export type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: { id: number } }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "INITIALIZE_CART"; payload: CartItem[] };

export const cartReducer = (
  state: CartState,
  action: CartAction,
): CartState => {
  switch (action.type) {
    case "INITIALIZE_CART":
      return action.payload;

    case "ADD_TO_CART":
      return [...state, action.payload];

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload.id);

    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item,
      );

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};
