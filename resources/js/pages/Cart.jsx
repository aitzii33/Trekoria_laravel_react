import { router, usePage } from '@inertiajs/react'
import { Container, Row, Col, Button, Card, Dropdown, CardBody, CardTitle } from "react-bootstrap"
import { useState } from 'react'

import Header from '../components/Header'

import '../../css/Cart.css'


   const activity = [
    {
        id: 1,
        place_id: 1,
        name: "Ride a Horse",
        description: "Experience the thrill of riding a horse with expert instructors guiding a group of five. This 40-minute session covers basic riding skills and trail riding through scenic paths.",
        location: "Sunny Meadows Ranch, Pine Trail, Springfield",
        image: "horse_riding.jfif",
        price: 50,
        date: "2026-03-01",
        is_active: true,
        quantity: 1,
        hours: ["10:00", "14:00"]
    },
    {
        id: 6,
        place_id: 6,
        name: "Boat Cruise",
        description: "Relax on a peaceful boat cruise along the river, enjoying beautiful views and fresh air. Ideal for families and couples looking to unwind.",
        location: "Harbor Pier, Waterfront Road, Springfield",
        image: "boat_cruise.jfif",
        price: 45,
        date: "2026-03-06",
        is_active: true,
        quantity: 1,
        hours: ["11:00", "15:00"]
    }
];

function Cart() 
{
    const [quantities, setQuantities] = useState(
        activity.reduce((acc, activity) => 
        {
            acc[activity.id] = activity.quantity || 1;
            return acc;
        }, {})
    );

    const getTotal = () => 
    {
        return activity.reduce((sum, activity) => 
        {
            const qty = quantities[activity.id] || 1;
            return sum + (activity.price * qty);
        }, 0);
    };

    const eliminate = (id) => 
    {
        router.delete(route('cart.destroy', id));
    };

    const updateQuantity = (id, quantity) => 
    {
        setQuantities(prev => ({ ...prev, [id]: parseInt(quantity) }));
        router.post(route('cart.update', id), { quantity: parseInt(quantity) });
    };


    return (
        <div className="container">
            <Header />
            <div className="row">
                <div className="col-xl-8">
                    {activity.map(activity => (
                        <div className="card border shadow-none mb-3" key={activity.id}>
                            <div className="card-body">
                                <div className="d-flex align-items-start border-bottom pb-3">
                                    <div className="me-4">
                                        <img src={activity.image || BoatImg} alt={activity.name} className="avatar-lg rounded"/>
                                    </div>

                                    <div className="flex-grow-1 align-self-center overflow-hidden">
                                        <h5 className="text-truncate font-size-18">
                                            {activity.name}
                                        </h5>
                                    </div>

                                    <div className="flex-shrink-0 ms-2">
                                        <i className="mdi mdi-trash-can-outline text-danger fs-4" style={{ cursor: 'pointer' }} onClick={() => eliminate(activity.id)} title="Remove item"/>
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-md-3">
                                        <p className="text-muted mb-1">Price</p>
                                        <h5>{activity.price}€</h5>
                                    </div>

                                    <div className="col-md-3">
                                        <p className="text-muted mb-1">Quantity</p>
                                        <select className="form-select form-select-sm" value={quantities[activity.id] || 1} onChange={(e) => updateQuantity(activity.id, e.target.value)}>
                                            {[1,2,3,4,5,6].map(q => (
                                                <option key={q} value={q}>{q}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-md-3">
                                        <p className="text-muted mb-1">Total</p>
                                        <h5>
                                            {(activity.price * (quantities[activity.id] || 1)).toFixed(2)}€
                                        </h5>
                                    </div>

                                    {activity.hours && activity.hours.length > 0 && (
                                        <div className="col-md-3">
                                            <p className="text-muted mb-1">Hour</p>
                                            <select className="form-select form-select-sm">
                                                {activity.hours.map((hour, idx) => (
                                                    <option key={idx} value={hour}>{hour}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="col-xl-4">
                    <div className="mt-5 mt-lg-0">
                        <div className="card border shadow-none">
                            <div className="card-header bg-transparent border-bottom py-3 px-4">
                                <h5 className="font-size-16 mb-0">Order Summary</h5>
                            </div>
                            <div className="card-body p-4 pt-2">
                                <div className="table-responsive">
                                    <table className="table mb-0">
                                        <tbody>
                                            <tr className="bg-light">
                                                <th>Total:</th>
                                                <td className="text-end">
                                                    <span className="fw-bold fs-4">{getTotal().toFixed(2)}€</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="d-grid gap-2 mt-4">
                                    <Button className="btn btn-outline-success btn-lg w-100 mt-2" onClick={() => {
                                        const total = getTotal().toFixed(2);
                                        router.visit(route('pay.index', { total }));
                                    }} style={{ color:'white' }}>
                                    Process to Pay
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
