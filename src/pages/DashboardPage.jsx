import React, { useState, useEffect } from 'react';
import {
    LineChart, Line, AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './Dashboard.css';

import { useStore } from '../context/StoreContext';

const DashboardPage = () => {
    const {
        orders, addOrder, updateOrderStatus,
        restaurantInfo, updateRestaurantInfo,
        customers, addCustomer, updateCustomer, deleteCustomer
    } = useStore();
    const [activeView, setActiveView] = useState('orders');

    // Customer Modal State
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', status: 'Active' });

    // Drill-Down Modal State
    const [drillDownModal, setDrillDownModal] = useState({ isOpen: false, type: null, data: null });

    // Toast State
    const [toasts, setToasts] = useState([]);
    const [draggedOrderId, setDraggedOrderId] = useState(null);

    // Toast Helper
    const showToast = (message) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    // Action Handlers
    const moveOrder = (orderId, newStatus) => {
        const order = orders.find(o => o.id === orderId);
        if (order && order.status !== newStatus) {
            updateOrderStatus(orderId, newStatus);
            showToast(`${orderId} moved to ${newStatus.replace(/^\w/, c => c.toUpperCase())}`);
        }
    };

    // Simulation Handler
    const simulateIncomingOrder = () => {
        const id = `#ORD-${Math.floor(1000 + Math.random() * 9000)}`;
        const names = ['John Doe', 'Jane Smith', 'Bob Wilson', 'Alice Brown'];
        const items = ['Margherita Pizza', 'Sushi Combo', 'Caesar Salad', 'Burger Deluxe'];

        const newOrder = {
            id,
            customer: names[Math.floor(Math.random() * names.length)],
            items: [{ name: items[Math.floor(Math.random() * items.length)], qty: 1 }],
            total: '$' + (15 + Math.random() * 30).toFixed(2),
            status: 'pending',
            time: 'Just now'
        };

        addOrder(newOrder); // Update global store
        showToast("New Order Received! 🔔");
    };

    // Drag & Drop Handlers
    const handleDragStart = (e, orderId) => {
        setDraggedOrderId(orderId);
        e.dataTransfer.effectAllowed = 'move';
        e.target.classList.add('dragging');
    };

    const handleDragEnd = (e) => {
        e.target.classList.remove('dragging');
        setDraggedOrderId(null);
        document.querySelectorAll('.kanban-column').forEach(col => col.classList.remove('drag-over'));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    };

    const handleDragLeave = (e) => {
        e.currentTarget.classList.remove('drag-over');
    };

    const handleDrop = (e, status) => {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        if (draggedOrderId) {
            moveOrder(draggedOrderId, status);
        }
    };

    // Customer Handlers
    const handleEditCustomer = (customer) => {
        setEditingId(customer.id);
        setFormData({ name: customer.name, email: customer.email, status: customer.status });
        setShowModal(true);
    };

    const handleAddCustomer = () => {
        setEditingId(null);
        setFormData({ name: '', email: '', status: 'Active' });
        setShowModal(true);
    };

    const handleSaveCustomer = () => {
        if (!formData.name || !formData.email) return;

        if (editingId) {
            updateCustomer(editingId, formData);
            showToast("Customer updated successfully");
        } else {
            addCustomer({ ...formData, orders: 0, last: 'Never' });
            showToast("New customer added");
        }
        setShowModal(false);
    };

    const handleDeleteCustomer = (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            deleteCustomer(id);
            showToast("Customer deleted");
        }
    };

    // Filter orders by status
    const pendingOrders = orders.filter(o => o.status === 'pending');
    const preparingOrders = orders.filter(o => o.status === 'preparing');
    const readyOrders = orders.filter(o => o.status === 'ready');

    // --- Sub-Components/Views --- //

    const OrdersView = () => (
        <>
            {/* Stats Row */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon" style={{ color: '#FF6B35' }}>🔥</div>
                    <div className="stat-info">
                        <h3>Pending Orders</h3>
                        <div className="value">{pendingOrders.length}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ color: '#F7C548' }}>💰</div>
                    <div className="stat-info">
                        <h3>Total Revenue</h3>
                        <div className="value">$1,240</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ color: '#4CD964' }}>🛵</div>
                    <div className="stat-info">
                        <h3>Active Drivers</h3>
                        <div className="value">12</div>
                    </div>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="kanban-board">
                {/* Column 1: New Orders (Pending) */}
                <div
                    className="kanban-column"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'pending')}
                >
                    <div className="column-header">
                        <h2>New Orders</h2>
                        <span className="count-badge">{pendingOrders.length}</span>
                    </div>
                    {pendingOrders.map(order => (
                        <div
                            className="order-card"
                            key={order.id}
                            draggable="true"
                            onDragStart={(e) => handleDragStart(e, order.id)}
                            onDragEnd={handleDragEnd}
                        >
                            <div className="order-header">
                                <span className="order-id">{order.id}</span>
                                <span className="order-time">{order.time}</span>
                            </div>
                            <div className="order-items">
                                {order.items.map((item, idx) => (
                                    <div className="order-item" key={idx}>
                                        <span>{item.qty}x {item.name}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="order-total">
                                <span>Total</span>
                                <span>{order.total}</span>
                            </div>
                            <button
                                className="action-btn"
                                onClick={() => moveOrder(order.id, 'preparing')}
                            >
                                Accept Order →
                            </button>
                        </div>
                    ))}
                </div>

                {/* Column 2: Preparing */}
                <div
                    className="kanban-column"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'preparing')}
                >
                    <div className="column-header">
                        <h2>In Kitchen</h2>
                        <span className="count-badge">{preparingOrders.length}</span>
                    </div>
                    {preparingOrders.map(order => (
                        <div
                            className="order-card"
                            key={order.id}
                            draggable="true"
                            onDragStart={(e) => handleDragStart(e, order.id)}
                            onDragEnd={handleDragEnd}
                        >
                            <div className="order-header">
                                <span className="order-id">{order.id}</span>
                                <span className="order-time">{order.time}</span>
                            </div>
                            <div className="order-items">
                                {order.items.map((item, idx) => (
                                    <div className="order-item" key={idx}>
                                        <span>{item.qty}x {item.name}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="order-total">
                                <span>Total</span>
                                <span>{order.total}</span>
                            </div>
                            <button
                                className="action-btn"
                                style={{ background: 'rgba(76, 217, 100, 0.1)', color: '#4CD964' }}
                                onClick={() => moveOrder(order.id, 'ready')}
                            >
                                Mark Ready ✓
                            </button>
                        </div>
                    ))}
                </div>

                {/* Column 3: Ready for Pickup */}
                <div
                    className="kanban-column"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 'ready')}
                >
                    <div className="column-header">
                        <h2>Ready for Pickup</h2>
                        <span className="count-badge">{readyOrders.length}</span>
                    </div>
                    {readyOrders.map(order => (
                        <div
                            className="order-card"
                            key={order.id}
                            draggable="true"
                            onDragStart={(e) => handleDragStart(e, order.id)}
                            onDragEnd={handleDragEnd}
                        >
                            <div className="order-header">
                                <span className="order-id">{order.id}</span>
                                <span className="order-time">{order.time}</span>
                            </div>
                            <div className="order-items">
                                {order.items.map((item, idx) => (
                                    <div className="order-item" key={idx}>
                                        <span>{item.qty}x {item.name}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="order-total">
                                <span>Total</span>
                                <span>{order.total}</span>
                            </div>
                            <div style={{ marginTop: '12px', textAlign: 'center', fontSize: '0.8rem', color: '#888' }}>
                                Waiting for driver...
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );

    // Drill-Down Modal Component
    const DrillDownModal = () => {
        if (!drillDownModal.isOpen) return null;

        const closeModal = () => setDrillDownModal({ isOpen: false, type: null, data: null });

        const renderContent = () => {
            switch (drillDownModal.type) {
                case 'revenue':
                    return (
                        <div>
                            <h3>💰 Revenue Breakdown</h3>
                            <div style={{ marginTop: '20px' }}>
                                <div className="detail-stat">
                                    <span>Total Revenue</span>
                                    <span className="detail-value">${drillDownModal.data.totalRevenue}</span>
                                </div>
                                <div className="detail-stat">
                                    <span>Average per Day</span>
                                    <span className="detail-value">${(parseFloat(drillDownModal.data.totalRevenue) / 7).toFixed(2)}</span>
                                </div>
                                <h4 style={{ marginTop: '24px', marginBottom: '12px' }}>Top Contributing Orders</h4>
                                <div className="detail-list">
                                    {orders.slice(0, 5).map(order => (
                                        <div key={order.id} className="detail-list-item">
                                            <span>{order.id} - {order.customer}</span>
                                            <span className="detail-value">{order.total}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );

                case 'orders':
                    const statusCounts = {
                        pending: orders.filter(o => o.status === 'pending').length,
                        preparing: orders.filter(o => o.status === 'preparing').length,
                        ready: orders.filter(o => o.status === 'ready').length
                    };
                    return (
                        <div>
                            <h3>📦 Orders Breakdown</h3>
                            <div style={{ marginTop: '20px' }}>
                                <div className="detail-stat">
                                    <span>Pending</span>
                                    <span className="detail-value status-pending">{statusCounts.pending}</span>
                                </div>
                                <div className="detail-stat">
                                    <span>Preparing</span>
                                    <span className="detail-value status-preparing">{statusCounts.preparing}</span>
                                </div>
                                <div className="detail-stat">
                                    <span>Ready</span>
                                    <span className="detail-value status-ready">{statusCounts.ready}</span>
                                </div>
                                <h4 style={{ marginTop: '24px', marginBottom: '12px' }}>Recent Orders</h4>
                                <div className="detail-list">
                                    {orders.slice(0, 6).map(order => (
                                        <div key={order.id} className="detail-list-item">
                                            <div>
                                                <div style={{ fontWeight: '500' }}>{order.id}</div>
                                                <div style={{ fontSize: '0.85rem', color: '#888' }}>{order.customer} • {order.time}</div>
                                            </div>
                                            <span className={`status-badge ${order.status}`}>{order.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );

                case 'aov':
                    return (
                        <div>
                            <h3>💵 Average Order Value</h3>
                            <div style={{ marginTop: '20px' }}>
                                <div className="detail-stat">
                                    <span>Current AOV</span>
                                    <span className="detail-value">${drillDownModal.data.avgOrderValue}</span>
                                </div>
                                <div className="detail-stat">
                                    <span>Highest Order</span>
                                    <span className="detail-value">$67.99</span>
                                </div>
                                <div className="detail-stat">
                                    <span>Lowest Order</span>
                                    <span className="detail-value">$12.50</span>
                                </div>
                                <h4 style={{ marginTop: '24px', marginBottom: '12px' }}>Order Distribution</h4>
                                <p style={{ color: '#888', fontSize: '0.9rem' }}>
                                    Most orders fall in the $15-$30 range. Consider upselling strategies for higher AOV.
                                </p>
                            </div>
                        </div>
                    );

                case 'customers':
                    return (
                        <div>
                            <h3>👥 Active Customers</h3>
                            <div style={{ marginTop: '20px' }}>
                                <div className="detail-stat">
                                    <span>Total Active</span>
                                    <span className="detail-value">{drillDownModal.data.activeCustomers}</span>
                                </div>
                                <div className="detail-stat">
                                    <span>New This Period</span>
                                    <span className="detail-value">{Math.floor(drillDownModal.data.activeCustomers * 0.3)}</span>
                                </div>
                                <h4 style={{ marginTop: '24px', marginBottom: '12px' }}>Top Customers by Orders</h4>
                                <div className="detail-list">
                                    {customers.slice(0, 5).sort((a, b) => b.orders - a.orders).map(customer => (
                                        <div key={customer.id} className="detail-list-item">
                                            <div>
                                                <div style={{ fontWeight: '500' }}>{customer.name}</div>
                                                <div style={{ fontSize: '0.85rem', color: '#888' }}>{customer.email}</div>
                                            </div>
                                            <span className="detail-value">{customer.orders} orders</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );

                case 'item':
                    return (
                        <div>
                            <h3>🍔 {drillDownModal.data.name}</h3>
                            <div style={{ marginTop: '20px' }}>
                                <div className="detail-stat">
                                    <span>Total Sales</span>
                                    <span className="detail-value">{drillDownModal.data.sales}</span>
                                </div>
                                <div className="detail-stat">
                                    <span>Est. Revenue</span>
                                    <span className="detail-value">${(drillDownModal.data.sales * 15).toFixed(2)}</span>
                                </div>
                                <div className="detail-stat">
                                    <span>Rank</span>
                                    <span className="detail-value">#{Math.floor(Math.random() * 5) + 1} Best Seller</span>
                                </div>
                                <h4 style={{ marginTop: '24px', marginBottom: '12px' }}>Performance</h4>
                                <p style={{ color: '#888', fontSize: '0.9rem' }}>
                                    This item is performing {drillDownModal.data.sales > 40 ? 'exceptionally well' : 'well'}.
                                    Consider promoting it more or creating similar items.
                                </p>
                            </div>
                        </div>
                    );

                default:
                    return <div>No data available</div>;
            }
        };

        return (
            <div className="modal-overlay" onClick={closeModal}>
                <div className="drill-down-modal" onClick={(e) => e.stopPropagation()}>
                    <button className="modal-close" onClick={closeModal}>×</button>
                    {renderContent()}
                </div>
            </div>
        );
    };

    const AnalyticsView = () => {
        const [dateRange, setDateRange] = useState('7days');

        // Helper: Filter orders by date range
        const getFilteredOrders = () => {
            const now = new Date();
            let cutoffDate = new Date();

            switch (dateRange) {
                case 'today':
                    cutoffDate.setHours(0, 0, 0, 0);
                    break;
                case '7days':
                    cutoffDate.setDate(now.getDate() - 7);
                    break;
                case '30days':
                    cutoffDate.setDate(now.getDate() - 30);
                    break;
                default:
                    cutoffDate.setDate(now.getDate() - 7);
            }

            // For demo purposes, we'll use all orders since we don't have real timestamps
            // In production, you'd filter: orders.filter(o => new Date(o.timestamp) >= cutoffDate)
            return orders;
        };

        const filteredOrders = getFilteredOrders();

        // KPI Calculations
        const calculateKPIs = () => {
            const totalRevenue = filteredOrders.reduce((sum, order) => {
                const amount = parseFloat(order.total.replace('$', ''));
                return sum + amount;
            }, 0);

            const totalOrders = filteredOrders.length;
            const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

            // Get unique customers
            const uniqueCustomers = new Set(filteredOrders.map(o => o.customer)).size;

            return {
                totalRevenue: totalRevenue.toFixed(2),
                totalOrders,
                avgOrderValue: avgOrderValue.toFixed(2),
                activeCustomers: uniqueCustomers,
                // Mock trend data (in production, compare to previous period)
                revenueTrend: '+12.5',
                ordersTrend: '+8.2',
                avgTrend: '+3.1',
                customersTrend: '+5.0'
            };
        };

        const kpis = calculateKPIs();

        // Chart Data (using mock for now, but filtered in production)
        const revenueData = [
            { name: 'Mon', revenue: 1200 },
            { name: 'Tue', revenue: 1800 },
            { name: 'Wed', revenue: 1600 },
            { name: 'Thu', revenue: 2100 },
            { name: 'Fri', revenue: 2800 },
            { name: 'Sat', revenue: 3500 },
            { name: 'Sun', revenue: 3100 },
        ];

        const popularItems = [
            { name: 'Truffle Pizza', sales: 45 },
            { name: 'Wagyu Burger', sales: 38 },
            { name: 'Dragon Roll', sales: 32 },
            { name: 'Coke Zero', sales: 60 },
            { name: 'Caesar Salad', sales: 25 },
        ];

        const peakHours = [
            { name: '12-2 PM', orders: 15 },
            { name: '2-5 PM', orders: 8 },
            { name: '5-7 PM', orders: 20 },
            { name: '7-9 PM', orders: 35 },
            { name: '9-11 PM', orders: 25 },
        ];

        return (
            <div className="dashboard-content-panel">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 className="panel-title" style={{ margin: 0 }}>📈 Analytics</h2>

                    {/* Date Range Filter */}
                    <div className="date-range-filter">
                        <button
                            className={`filter-btn ${dateRange === 'today' ? 'active' : ''}`}
                            onClick={() => setDateRange('today')}
                        >
                            Today
                        </button>
                        <button
                            className={`filter-btn ${dateRange === '7days' ? 'active' : ''}`}
                            onClick={() => setDateRange('7days')}
                        >
                            Last 7 Days
                        </button>
                        <button
                            className={`filter-btn ${dateRange === '30days' ? 'active' : ''}`}
                            onClick={() => setDateRange('30days')}
                        >
                            Last 30 Days
                        </button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="kpi-grid">
                    <div
                        className="kpi-card clickable"
                        onClick={() => setDrillDownModal({ isOpen: true, type: 'revenue', data: kpis })}
                    >
                        <div className="kpi-icon" style={{ color: '#FF6B35' }}>💰</div>
                        <div className="kpi-content">
                            <div className="kpi-label">Total Revenue</div>
                            <div className="kpi-value">${kpis.totalRevenue}</div>
                            <div className="kpi-trend positive">↑ {kpis.revenueTrend}%</div>
                        </div>
                    </div>

                    <div
                        className="kpi-card clickable"
                        onClick={() => setDrillDownModal({ isOpen: true, type: 'orders', data: kpis })}
                    >
                        <div className="kpi-icon" style={{ color: '#4CD964' }}>📦</div>
                        <div className="kpi-content">
                            <div className="kpi-label">Total Orders</div>
                            <div className="kpi-value">{kpis.totalOrders}</div>
                            <div className="kpi-trend positive">↑ {kpis.ordersTrend}%</div>
                        </div>
                    </div>

                    <div
                        className="kpi-card clickable"
                        onClick={() => setDrillDownModal({ isOpen: true, type: 'aov', data: kpis })}
                    >
                        <div className="kpi-icon" style={{ color: '#F7C548' }}>💵</div>
                        <div className="kpi-content">
                            <div className="kpi-label">Avg Order Value</div>
                            <div className="kpi-value">${kpis.avgOrderValue}</div>
                            <div className="kpi-trend positive">↑ {kpis.avgTrend}%</div>
                        </div>
                    </div>

                    <div
                        className="kpi-card clickable"
                        onClick={() => setDrillDownModal({ isOpen: true, type: 'customers', data: kpis })}
                    >
                        <div className="kpi-icon" style={{ color: '#5AC8FA' }}>👥</div>
                        <div className="kpi-content">
                            <div className="kpi-label">Active Customers</div>
                            <div className="kpi-value">{kpis.activeCustomers}</div>
                            <div className="kpi-trend positive">↑ {kpis.customersTrend}%</div>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="charts-grid-2">
                    <div className="chart-card">
                        <h3>Weekly Revenue</h3>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <LineChart data={revenueData}>
                                    <defs>
                                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="1" y2="0">
                                            <stop offset="0%" stopColor="#3b82f6" />
                                            <stop offset="100%" stopColor="#60a5fa" />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                    <XAxis dataKey="name" stroke="#888" />
                                    <YAxis stroke="#888" />
                                    <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '8px', color: '#fff' }} />
                                    <Legend />
                                    <Line type="monotone" dataKey="revenue" stroke="url(#revenueGradient)" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="chart-card">
                        <h3>Top Selling Items</h3>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <BarChart data={popularItems} layout="vertical">
                                    <defs>
                                        <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                                            <stop offset="0%" stopColor="#6366f1" />
                                            <stop offset="100%" stopColor="#8b5cf6" />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#444" horizontal={false} />
                                    <XAxis type="number" stroke="#888" />
                                    <YAxis dataKey="name" type="category" width={100} stroke="#888" tick={{ fontSize: 12 }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '8px', color: '#fff' }} />
                                    <Legend />
                                    <Bar
                                        dataKey="sales"
                                        fill="url(#barGradient)"
                                        radius={[0, 8, 8, 0]}
                                        onClick={(data) => setDrillDownModal({ isOpen: true, type: 'item', data: data })}
                                        cursor="pointer"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="chart-card full-width" style={{ marginTop: '24px' }}>
                    <h3>Peak Order Hours</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <AreaChart data={peakHours}>
                                <defs>
                                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                                        <stop offset="100%" stopColor="#fbbf24" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                <XAxis dataKey="name" stroke="#888" />
                                <YAxis stroke="#888" />
                                <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '8px', color: '#fff' }} />
                                <Area type="monotone" dataKey="orders" stroke="#f59e0b" fill="url(#areaGradient)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        );
    };

    // Kitchen Display System View
    const KitchenDisplayView = () => {
        const [currentTime, setCurrentTime] = useState(Date.now());
        const [soundEnabled, setSoundEnabled] = useState(true);
        const [isFullscreen, setIsFullscreen] = useState(false);
        const [lastOrderCount, setLastOrderCount] = useState(0);

        // Auto-refresh timer
        useEffect(() => {
            const interval = setInterval(() => {
                setCurrentTime(Date.now());
            }, 10000); // Update every 10 seconds
            return () => clearInterval(interval);
        }, []);

        // Sound alert for new orders
        useEffect(() => {
            const activeOrders = orders.filter(o => o.status === 'pending' || o.status === 'preparing');
            if (soundEnabled && activeOrders.length > lastOrderCount && lastOrderCount > 0) {
                // Play sound notification
                const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS57+ahUBEPU6Xl8HRiIA==');
                audio.volume = 0.3;
                audio.play().catch(() => { }); // Ignore errors
            }
            setLastOrderCount(activeOrders.length);
        }, [orders, soundEnabled, lastOrderCount]);

        const getOrderAge = (createdAt) => {
            if (!createdAt) return 0;
            const diff = (currentTime - new Date(createdAt).getTime()) / 1000 / 60;
            return Math.floor(diff);
        };

        const getUrgencyClass = (minutes) => {
            if (minutes >= 10) return 'urgent-red';
            if (minutes >= 5) return 'urgent-yellow';
            return 'urgent-green';
        };

        const handleBump = (orderId) => {
            updateOrderStatus(orderId, 'ready');
            showToast(`Order ${orderId} marked as READY! 🎉`);
        };

        const toggleFullscreen = () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
                setIsFullscreen(true);
            } else {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        };

        const activeOrders = orders.filter(o => o.status === 'pending' || o.status === 'preparing');

        return (
            <div className="kds-container">
                {/* KDS Header */}
                <div className="kds-header">
                    <div>
                        <h2 className="kds-title">🍳 Kitchen Display</h2>
                        <p className="kds-subtitle">{activeOrders.length} active order{activeOrders.length !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="kds-controls">
                        <button
                            className={`kds-control-btn ${soundEnabled ? 'active' : ''}`}
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            title={soundEnabled ? 'Mute alerts' : 'Enable alerts'}
                        >
                            {soundEnabled ? '🔔' : '🔕'}
                        </button>
                        <button
                            className="kds-control-btn"
                            onClick={toggleFullscreen}
                            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen mode'}
                        >
                            {isFullscreen ? '🗙' : '⛶'}
                        </button>
                    </div>
                </div>

                {/* KDS Grid */}
                {activeOrders.length === 0 ? (
                    <div className="kds-empty">
                        <div className="kds-empty-icon">✓</div>
                        <h3>All Caught Up!</h3>
                        <p>No active orders in the kitchen.</p>
                    </div>
                ) : (
                    <div className="kds-grid">
                        {activeOrders.map(order => {
                            const age = getOrderAge(order.createdAt);
                            const urgency = getUrgencyClass(age);

                            return (
                                <div key={order.id} className={`kds-order-card ${urgency}`}>
                                    {/* Order Header */}
                                    <div className="kds-order-header">
                                        <div>
                                            <div className="kds-order-id">{order.id}</div>
                                            <div className="kds-customer-name">{order.customer}</div>
                                        </div>
                                        <div className="kds-order-time">
                                            <div className="kds-timer">{age} min{age !== 1 ? 's' : ''}</div>
                                            <div className={`kds-status-badge ${order.status}`}>
                                                {order.status}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="kds-order-items">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="kds-item">
                                                <span className="kds-item-qty">{item.qty}x</span>
                                                <span className="kds-item-name">{item.name}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Bump Button */}
                                    <button
                                        className="kds-bump-btn"
                                        onClick={() => handleBump(order.id)}
                                    >
                                        BUMP ✓
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };

    const CustomersView = () => (
        <div className="dashboard-content-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 className="panel-title" style={{ margin: 0 }}>👥 Customers</h2>
                <button className="btn btn-primary" onClick={handleAddCustomer}>+ Add Customer</button>
            </div>
            <div className="data-table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Total Orders</th>
                            <th>Last Order</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.orders}</td>
                                <td>{customer.last}</td>
                                <td>
                                    <span className={`status-badge ${customer.status.toLowerCase()}`}>
                                        {customer.status}
                                    </span>
                                </td>
                                <td>
                                    <button className="action-icon" onClick={() => handleEditCustomer(customer)}>✏️</button>
                                    <button className="action-icon delete" onClick={() => handleDeleteCustomer(customer.id)}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const SettingsView = () => (
        <div className="dashboard-content-panel">
            <h2 className="panel-title">⚙️ Settings</h2>
            <div className="settings-grid">
                <div className="settings-card">
                    <h3>Restaurant Profile</h3>
                    <div className="form-group">
                        <label>Restaurant Name</label>
                        <input
                            type="text"
                            value={restaurantInfo.name}
                            onChange={(e) => updateRestaurantInfo({ name: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Tagline</label>
                        <textarea
                            value={restaurantInfo.tagline}
                            onChange={(e) => updateRestaurantInfo({ tagline: e.target.value })}
                        />
                    </div>
                </div>
                <div className="settings-card">
                    <h3>Notifications</h3>
                    <div className="toggle-row">
                        <span>New Order Alerts</span>
                        <input type="checkbox" defaultChecked />
                    </div>
                    <div className="toggle-row">
                        <span>Driver Updates</span>
                        <input type="checkbox" defaultChecked />
                    </div>
                    <div className="toggle-row">
                        <span>Email Reports</span>
                        <input type="checkbox" />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="dashboard-container">
            {/* Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>{editingId ? 'Edit Customer' : 'Add New Customer'}</h3>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px' }}
                            >
                                <option value="Active">Active</option>
                                <option value="New">New</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                        <div className="modal-actions">
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)} style={{ marginRight: '10px' }}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSaveCustomer}>Save</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Drill-Down Modal */}
            <DrillDownModal />

            {/* Toast Container */}
            <div className="toast-container">
                {toasts.map(toast => (
                    <div className="toast-notification" key={toast.id}>
                        {toast.message}
                    </div>
                ))}
            </div>

            {/* Sidebar */}
            <aside className="dashboard-sidebar">
                <div className="sidebar-logo">
                    <span>Crave</span>Admin
                </div>
                <nav className="sidebar-menu">
                    <div
                        className={`menu-item ${activeView === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveView('overview')}
                    >
                        <span className="menu-icon">📊</span> Overview
                    </div>
                    <div
                        className={`menu-item ${activeView === 'analytics' ? 'active' : ''}`}
                        onClick={() => setActiveView('analytics')}
                    >
                        <span className="menu-icon">📈</span> Analytics
                    </div>
                    <div
                        className={`menu-item ${activeView === 'kitchen' ? 'active' : ''}`}
                        onClick={() => setActiveView('kitchen')}
                    >
                        <span className="menu-icon">🍳</span> Kitchen
                        {orders.filter(o => o.status === 'pending' || o.status === 'preparing').length > 0 && (
                            <span className="count-badge" style={{ marginLeft: 'auto', background: '#FF6B35', color: 'white' }}>
                                {orders.filter(o => o.status === 'pending' || o.status === 'preparing').length}
                            </span>
                        )}
                    </div>
                    <div
                        className={`menu-item ${activeView === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveView('orders')}
                    >
                        <span className="menu-icon">📦</span> Orders
                        {pendingOrders.length > 0 && <span className="count-badge" style={{ marginLeft: 'auto', background: 'var(--primary)', color: 'white' }}>{pendingOrders.length}</span>}
                    </div>
                    <div
                        className={`menu-item ${activeView === 'customers' ? 'active' : ''}`}
                        onClick={() => setActiveView('customers')}
                    >
                        <span className="menu-icon">👥</span> Customers
                    </div>
                    <div
                        className={`menu-item ${activeView === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveView('settings')}
                    >
                        <span className="menu-icon">⚙️</span> Settings
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div>
                        <h1>{activeView.charAt(0).toUpperCase() + activeView.slice(1)}</h1>
                        <p className="date-display">Today, December 12th</p>
                    </div>
                    <div className="actions">
                        <button className="btn btn-primary" onClick={simulateIncomingOrder}>
                            + Simulate Order
                        </button>
                    </div>
                </header>

                {activeView === 'orders' && <OrdersView />}
                {activeView === 'overview' && <OrdersView />} {/* Reuse Orders view for Overview for now as it contains stats */}
                {activeView === 'analytics' && <AnalyticsView />}
                {activeView === 'kitchen' && <KitchenDisplayView />}
                {activeView === 'customers' && <CustomersView />}
                {activeView === 'settings' && <SettingsView />}
            </main>
        </div>
    );
};

export default DashboardPage;
