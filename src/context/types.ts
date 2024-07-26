export interface CartItem {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (itemId: number) => void;
  clearCart: () => void;
  incrementItem: (id: number) => void;
  decrementItem: (id: number) => void;
}
