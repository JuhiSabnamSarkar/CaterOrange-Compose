import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Cart.css";
import { Link } from "react-router-dom";
import OrderData from '../datas/DataCollection';

const Cart = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/getAllOrderDetails');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    // Filtered OrderData based on conditions
    const filteredOrderData = OrderData.filter(item => {
        return (
            (item.itemName === 'Veg Meal' && products.some(product => product.mealQuantity >= 1)) ||
            (item.itemName === 'Gulab Jamoon' && products.some(product => product.addOns.gulabJamoon > 0)) ||
            (item.itemName === 'Todays Special Sweet' && products.some(product => product.addOns.todaysSpecialSweet > 0)) ||
            (item.itemName === 'Moong Dal Halwa' && products.some(product => product.addOns.moongDalHalwa > 0))
        );
    });

    // Calculate subtotal based on filtered items
    const calculateSubtotal = () => {
        let subtotal = 0;
        filteredOrderData.forEach(item => {
            let quantity = 0;
            products.forEach(product => {
                if (item.itemName === 'Veg Meal' && product.mealQuantity >= 1) {
                    quantity += product.mealQuantity;
                } else if (item.itemName === 'Gulab Jamoon') {
                    quantity += product.addOns.gulabJamoon;
                } else if (item.itemName === 'Todays Special Sweet') {
                    quantity += product.addOns.todaysSpecialSweet;
                } else if (item.itemName === 'Moong Dal Halwa') {
                    quantity += product.addOns.moongDalHalwa;
                }
            });
            subtotal += item.itemPrice * quantity;
        });

        const GST = 0.18 * subtotal; // Assuming 18% GST
        const total = subtotal + GST;

        return {
            subtotal: subtotal.toFixed(2),
            GST: GST.toFixed(2),
            total: total.toFixed(2)
        };
    };


    return (
        <div className='cart-main-div'>
            <div className='cart-child1'>
                Order
            </div>
            <div className='cart-child2'>
                <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>&nbsp; {'>'} Order
            </div>
            <div className='cart-child3'>
                <div className='order-table-div'>
                    <table className="table table-striped cart-table" style={{ width: '50rem' }}>
                        <thead>
                            <tr>
                                <th scope="col" className="table-success" style={{ width: '15rem' }}>Product</th>
                                <th scope="col" className="table-success">Price</th>
                                <th scope="col" className="table-success">Quantity</th>
                                <th scope="col" className="table-success">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Render table rows for filtered items */}
                            {filteredOrderData.map((item, index) => {
                                let quantity = 0;
                                products.forEach(product => {
                                    if (item.itemName === 'Veg Meal' && product.mealQuantity >= 1) {
                                        quantity += product.mealQuantity;
                                    } else if (item.itemName === 'Gulab Jamoon') {
                                        quantity += product.addOns.gulabJamoon;
                                    } else if (item.itemName === 'Todays Special Sweet') {
                                        quantity += product.addOns.todaysSpecialSweet;
                                    } else if (item.itemName === 'Moong Dal Halwa') {
                                        quantity += product.addOns.moongDalHalwa;
                                    }
                                });
                                const total = item.itemPrice * quantity;
                                return (
                                    <tr key={index}>
                                        <td>{item.itemName}<br />{item.itemDetails}</td>
                                        <td>{item.itemPrice}</td>
                                        <td>{quantity}</td>
                                        <td>{total.toFixed(2)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className='payment-div'>
                    <div className='payment-div-child-1'>
                        <div>Cart Total</div>
                        <hr />
                        <div className='payment-item'>
                            <span>Subtotal</span>
                            <span>Rs {calculateSubtotal().subtotal}</span>
                        </div>
                        <hr />
                        <div className='payment-item'>
                            <span>GST</span>
                            <span>Rs {calculateSubtotal().GST}</span>
                        </div>
                        <hr />
                        <div className='payment-item'>
                            <span>Total</span>
                            <span>Rs {calculateSubtotal().total}</span>
                        </div>
                        <hr />
                        <div>

                            {calculateSubtotal().subtotal > 0 ? (
                                <div style={{textAlign: 'center'}}>
                                    <button className='payment-btn-1'>Check out</button>
                                </div>
                            ) : (
                                <div className="checkout" >
                                    <span>Minimum Order value is Rs. 80.</span>
                                    <span>Continue Ordering !!!</span>
                                </div>
                            )}

                        </div>
                    </div>
                    <div className='payment-div-child-2'>
                        <button className='payment-btn-2'>CONTINUE ORDERING</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
