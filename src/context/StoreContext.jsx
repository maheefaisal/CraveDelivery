import React, { createContext, useContext, useState, useEffect } from 'react';

// Initial Mock Data
const INITIAL_DATA = {
    restaurantInfo: {
        name: 'CraveDelivery',
        tagline: 'Elevating your dining experience, one delivery at a time.',
        email: 'hello@cravedelivery.com',
        phone: '+1 (555) 123-4567'
    },
    menuItems: [
        {
            id: 'sp-1',
            name: 'Truffle Meltdown',
            description: 'Wild mushrooms, excessive mozzarella, and white truffle oil on a crispy crust.',
            price: '22.00',
            image: '/assets/pizza_new.png',
            category: 'Pizza',
            isSpecial: true,
            originalPrice: '26.00',
            tag: '🔥 Only 3 left'
        },
        {
            id: 'sp-2',
            name: 'Midnight Dragon Roll',
            description: 'Succulent eel, creamy avocado, and spicy mayo explosion. Pure bliss.',
            price: '28.00',
            image: '/assets/sushi.png',
            category: 'Sushi',
            isSpecial: true,
            originalPrice: null,
            tag: '⏳ Ends in 1h'
        },
        {
            id: 'sp-3',
            name: 'The Wagyu Smash',
            description: 'Double wagyu beef, dripping cheddar, caramelized onions, and secret sauce.',
            price: '19.50',
            image: '/assets/burger_new.png',
            category: 'Burger',
            isSpecial: true,
            originalPrice: null,
            tag: '🍔 Crowd Favorite'
        }
    ],
    orders: [
        {
            id: '#ORD-1024',
            customer: 'Alex Johnson',
            items: [
                { name: 'Truffle Mushroom Pizza', qty: 1 },
                { name: 'Coke Zero', qty: 2 }
            ],
            total: '$24.50',
            status: 'pending',
            time: '2 mins ago',
            createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString() // 2 mins ago
        },
        {
            id: '#ORD-1023',
            customer: 'Sarah Smith',
            items: [
                { name: 'Dragon Roll Platter', qty: 1 }
            ],
            total: '$24.99',
            status: 'preparing',
            time: '12 mins ago',
            createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString() // 12 mins ago
        },
        {
            id: '#ORD-1022',
            customer: 'Mike Ross',
            items: [
                { name: 'Quinoa Power Bowl', qty: 1 },
                { name: 'Sparkling Water', qty: 1 }
            ],
            total: '$18.50',
            status: 'ready',
            time: '25 mins ago',
            createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString() // 25 mins ago
        },
    ],
    customers: [
        { id: 'usr-1', name: 'Alex Johnson', email: 'alex@example.com', orders: 12, last: '2 mins ago', status: 'Active' },
        { id: 'usr-2', name: 'Sarah Smith', email: 'sarah@example.com', orders: 5, last: '12 mins ago', status: 'Active' },
        { id: 'usr-3', name: 'Mike Ross', email: 'mike@example.com', orders: 8, last: '25 mins ago', status: 'Active' },
        { id: 'usr-4', name: 'Emily Blunt', email: 'emily@example.com', orders: 3, last: 'Just now', status: 'Active' },
        { id: 'usr-5', name: 'John Doe', email: 'john@example.com', orders: 1, last: '1 day ago', status: 'New' }
    ]
};

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    // Load from localStorage or use Initial Data
    const [restaurantInfo, setRestaurantInfo] = useState(() => {
        const saved = localStorage.getItem('restaurantInfo');
        return saved ? JSON.parse(saved) : INITIAL_DATA.restaurantInfo;
    });

    const [menuItems, setMenuItems] = useState(() => {
        const saved = localStorage.getItem('menuItems');
        return saved ? JSON.parse(saved) : INITIAL_DATA.menuItems;
    });

    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem('orders');
        return saved ? JSON.parse(saved) : INITIAL_DATA.orders;
    });

    const [customers, setCustomers] = useState(() => {
        const saved = localStorage.getItem('customers');
        return saved ? JSON.parse(saved) : INITIAL_DATA.customers;
    });

    // Persistence Effects
    useEffect(() => localStorage.setItem('restaurantInfo', JSON.stringify(restaurantInfo)), [restaurantInfo]);
    useEffect(() => localStorage.setItem('menuItems', JSON.stringify(menuItems)), [menuItems]);
    useEffect(() => localStorage.setItem('orders', JSON.stringify(orders)), [orders]);
    useEffect(() => localStorage.setItem('customers', JSON.stringify(customers)), [customers]);

    // Actions
    const updateRestaurantInfo = (info) => setRestaurantInfo(prev => ({ ...prev, ...info }));

    const updateMenuItem = (id, updates) => {
        setMenuItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
    };

    const addOrder = (order) => setOrders(prev => [{ ...order, createdAt: new Date().toISOString() }, ...prev]);

    const updateOrderStatus = (id, status) => {
        setOrders(prev => prev.map(order => order.id === id ? { ...order, status } : order));
    };

    // Customer Actions
    const addCustomer = (customer) => setCustomers(prev => [...prev, { ...customer, id: `usr-${Date.now()}` }]);

    const updateCustomer = (id, updates) => {
        setCustomers(prev => prev.map(cust => cust.id === id ? { ...cust, ...updates } : cust));
    };

    const deleteCustomer = (id) => {
        setCustomers(prev => prev.filter(cust => cust.id !== id));
    };

    const value = {
        restaurantInfo,
        updateRestaurantInfo,
        menuItems,
        updateMenuItem,
        orders,
        addOrder,
        updateOrderStatus,
        customers,
        addCustomer,
        updateCustomer,
        deleteCustomer
    };

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);
