import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { CartItem, CartContextType } from './types';

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const items = localStorage.getItem("cart");
    return items ? JSON.parse(items) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItemToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const incrementItem = (id: number) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => 
        item.id === id ? {...item, quantity: item.quantity + 1 } : item
      );
    });
  };

  const decrementItem = (id: number) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => 
        item.id === id ? {...item, quantity: item.quantity - 1 } : item
      ).filter((item) => item.quantity > 0);
    });
  };
  
  const removeItemFromCart = (itemId: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return prevItems.filter((i) => i.id !== itemId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, clearCart, incrementItem, decrementItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
