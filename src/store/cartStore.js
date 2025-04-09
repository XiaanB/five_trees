import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const useCartStore = create((set) => ({
    cart: [], // Default empty cart
    
    addToCart: async (product) => {
        set((state) => {
            const updatedCart = [...state.cart, product];
            // Save updated cart to AsyncStorage
            AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
            return { cart: updatedCart };
        });
    },
    removeFromCart: async (productId) => {
        set((state) => {
            const updatedCart = state.cart.filter((item) => item.id !== productId);
            // Save updated cart to AsyncStorage
            AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
            return { cart: updatedCart };
        });
    },
    loadCart: async () => {
        try {
            const savedCart = await AsyncStorage.getItem('cart');
            if (savedCart) {
                set({ cart: JSON.parse(savedCart) });
            }
        } catch (error) {
            console.log('Failed to load cart', error);
        }
    },
    clearCart: async () => {
        set({ cart: [] });
        await AsyncStorage.removeItem('cart');
    },
}));
