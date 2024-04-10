import React, { useState } from 'react'
import { XCircle, Cart3 } from 'react-bootstrap-icons';
import OrderData from '../datas/DataCollection';
import axios from "axios"
import { useCart } from '../Hooks/CartContext';

export default function Card() {
    const [showDetails, setShowDetails] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const [mealType, setMealType] = useState('');
    const [mealPlan, setMealPlan] = useState('');
    const [mealQuantity, setMealQuantity] = useState(1);
    const [addOns, setAddOns] = useState({
        gulabJamoon: 0,
        moongDalHalwa: 0,
        todaysSpecialSweet: 0
    });
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        // addToCart(item); // Add the item to the cart
    };


    const orderDetails = (index) => {
        setSelectedItemIndex(index);
        setShowDetails(true);
        window.scrollTo(0, 0);
    };

    const closeOrderDetails = () => {
        setShowDetails(false);
        setSelectedItemIndex(null);
    };

    const handleMealTypeChange = (e) => {
        setMealType(e.target.value);
    };

    const handleMealPlanChange = (e) => {
        setMealPlan(e.target.value);
    };

    const handleMealQuantityChange = (e) => {
        setMealQuantity(parseInt(e.target.value));
    };

    const handleAddOnsChange = (addOn, value) => {
        setAddOns(prevState => ({
            ...prevState,
            [addOn]: parseInt(value)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const selectedItem = OrderData[selectedItemIndex];
            console.log('Selected item:', selectedItem); 
            const response = await axios.post('http://localhost:5001/api/CreateOrderDetails', {
                selectedItemIndex,
                mealType,
                mealPlan,
                mealQuantity,
                addOns,
                itemName: selectedItem.itemName,
                itemPrice: selectedItem.itemPrice,
                itemDetails: selectedItem.itemDetails
            });
            addToCart(response.data.cartData);
            console.log(response.data);
            setMealType('');
            setMealPlan('');
            setMealQuantity(1);
            setAddOns({
                gulabJamoon: 0,
                moongDalHalwa: 0,
                todaysSpecialSweet: 0
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            // Add error handling code here
        }
    };
    



    

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', padding: '20px', alignItems: 'center', justifyContent: 'center' }}>
            {OrderData.map((item, index) => (
                <div key={index}>
                    <div className="card mt-3" style={{ width: "20rem", maxHeight: "400px", borderRadius: "10%", overflow: 'hidden' }}>
                        <img src={item.itemImage} className="card-img-top" alt="..." style={{ height: "200px", objectFit: "fill", cursor: "pointer" }} onClick={() => orderDetails(index)} />
                        <div className="card-body">
                            <p className="card-text">{item.itemName}</p>
                            <div className='container w-100'>
                                <select className='m-2 h-100 bg-success rounded' style={{ color: "white" }}>
                                    {Array.from(Array(4), (e, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                                <select className='m-2 h-100 bg-success rounded' style={{ color: "white" }}>
                                    <option value="Single" >Single</option>
                                    <option value="Full">Full</option>
                                </select>
                                <div className='d-inline fs-6'>Total price</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {showDetails && (
                <div className="order-outer-div" style={{ zIndex: 2, position: 'fixed', top: 0, left: 0, background: 'rgba(0, 0, 0, 0.5)', right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div>
                        <XCircle onClick={closeOrderDetails} style={{ height: '40px', width: '40px', color: 'white', zIndex: '5', backgroundColor: 'red', position: 'absolute', top: '0', right: '0', borderRadius: '100%' }} />
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '40px', width: '80rem', borderRadius: '10px', }}>
                        <form onSubmit={handleSubmit}>
                            <div className="outer-div" style={{ background: 'white', padding: '30px', borderRadius: '10px', display: 'flex', gap: '3rem', maxHeight: '80vh', overflow: 'auto' }}>
                                <div className='outer-div-left' style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div><img src={OrderData[selectedItemIndex]?.itemImage} style={{ height: '22rem', width: '40rem' }} alt="mealbox" /></div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span>ORDER TIMINGS:</span>
                                        <span>Breakfast - Upto 10PM previous day</span>
                                        <span>Lunch - Upto 10AM same day</span>
                                        <span>Dinner - Upto 5PM same day</span>
                                    </div>
                                </div>
                                <div className='outer-div-right' style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>{OrderData[selectedItemIndex]?.itemName}</span>
                                    <span style={{ fontSize: '20px', color: 'red' }}>{`Rs. ${OrderData[selectedItemIndex]?.itemPrice}`}</span>
                                    <span style={{ fontSize: '15px', fontWeight: 'bold' }}>{OrderData[selectedItemIndex]?.itemDetails}</span>
                                    <span className='seletField' style={{ display: 'flex', flexDirection: 'column' }}>
                                        <label style={{ fontWeight: '500' }}>MEAL TYPE</label>
                                        <select value={mealType} onChange={handleMealTypeChange} style={{ height: '2rem' }}>
                                            <option>Choose an Option</option>
                                            <option>Breakfast</option>
                                        </select>
                                    </span>
                                    <span className='seletField' style={{ display: 'flex', flexDirection: 'column' }}>
                                        <label style={{ fontWeight: '500' }}>MEAL PLAN</label>
                                        <select value={mealPlan} onChange={handleMealPlanChange} style={{ height: '2rem' }}>
                                            <option>Choose an Option</option>
                                            <option>Single Day</option>
                                        </select>
                                    </span>
                                    <span className='seletField' style={{ display: 'flex', flexDirection: 'column' }}>
                                        <label style={{ fontWeight: '500' }}>Meal Quantity</label>
                                        <input type='number' value={mealQuantity} onChange={handleMealQuantityChange} style={{ textAlign: 'center', height: '2.6rem', width: '9rem' }}></input>
                                    </span>
                                    <span style={{ fontSize: '35px', fontWeight: '400' }}>Add-ons</span>
                                    <span style={{ fontWeight: '500' }}>GULAB JAMOON</span>
                                    <span>
                                        <input type='number' value={addOns.gulabJamoon} onChange={(e) => handleAddOnsChange('gulabJamoon', e.target.value)} style={{ textAlign: 'center', height: '2.6rem', width: '9rem' }}></input>
                                    </span>
                                    <span style={{ fontWeight: '500' }}>MOONG DAL HALWA</span>
                                    <span>
                                        <input type='number' value={addOns.moongDalHalwa} onChange={(e) => handleAddOnsChange('moongDalHalwa', e.target.value)} style={{ textAlign: 'center', height: '2.6rem', width: '9rem' }}></input>
                                    </span>
                                    <span style={{ fontWeight: '500' }}>TODAYS SPECIAL SWEET</span>
                                    <span>
                                        <input type='number' value={addOns.todaysSpecialSweet} onChange={(e) => handleAddOnsChange('todaysSpecialSweet', e.target.value)} style={{ textAlign: 'center', height: '2.6rem', width: '9rem' }}></input>
                                    </span>
                                    <span><button type="submit" style={{ height: '3rem', width: '12rem', backgroundColor: 'brown', border: 'none', color: 'white', marginBottom: '3rem' }}><Cart3 /> ADD TO CART</button></span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
