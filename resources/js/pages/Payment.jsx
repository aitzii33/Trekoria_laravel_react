import '../../css/Payment.css' 

import { useForm } from '@inertiajs/react';
import { useState, useRef } from 'react';

export default function OrderPage() 
{
    const { data, setData, post, processing, errors } = useForm({ full_name: '', dni: '', address: '', city: '', zip_code: '', card_number: '', card_name: '', expiry: '', cvv: '' });

    const formRef = useRef(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [notification, setNotification] = useState('');

    const steps = ['Shipping', 'Payment', 'Review'];

    const nextStep = () => 
    {
        if (currentStep === 0) 
        {
            if (!data.full_name || !data.address) 
            {
                showNotification('Please fill out all required shipping fields.');
                return;
            }
        }
        if (currentStep < 2) 
        {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => 
    {
        if (currentStep > 0) 
        {
            setCurrentStep(currentStep - 1);
        }
    };

    const showNotification = (message) => 
    {
        setNotification(message);
        setTimeout(() => setNotification(''), 3000);
    };

    const handleSubmit = (e) => 
    {
        e.preventDefault();
        
        if (currentStep === 2) 
        {
            post(route('checkout.store'), 
            {
                onSuccess: () => 
                {
                    showNotification('Purchase completed successfully!');
                    setTimeout(() => 
                    {
                        window.location.href = '/Home';
                    }, 2000);
                },
                onError: (errors) => 
                {
                    showNotification('Please check the form for errors.');
                }
            });
        }
    };

    return (
        <div className="checkout-page-wrapper">
            <div className="checkout-container">
                <div className="form-panel">
                    <h1 className="h3 fw-bold mb-4">Complete your purchase</h1>
                    
                    <div className="step-progress-bar">
                        <div className="progress-indicator" style={{ width: `${(currentStep / 2) * 100}%` }}/>
                    </div>

                    <div className="step-header">
                        {steps.map((step, index) => (
                            <div key={index} className={`step-item ${index <= currentStep ? 'active completed' : ''} ${index === currentStep ? 'active' : ''}`}>
                                <div className="step-number">{index + 1}</div>
                                <div className="step-title d-none d-md-block">{step}</div>
                            </div>
                        ))}
                    </div>

                    <form id="checkout-form" ref={formRef} onSubmit={handleSubmit}>
                        <div className={`form-step ${currentStep === 0 ? 'active' : ''}`}>
                            <h2 className="h5 fw-bold mb-4">Shipping Information</h2>
                            <div className="mb-3">
                                <label htmlFor="fullName" className="form-label">Full Name</label>
                                <input type="text" className={`form-control ${errors.full_name ? 'is-invalid' : ''}`} id="fullName" value={data.full_name} onChange={(e) => setData('full_name', e.target.value)}/>
                                {errors.full_name && <div className="invalid-feedback">{errors.full_name}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="dni" className="form-label">DNI</label>
                                <input type="text" className={`form-control ${errors.dni ? 'is-invalid' : ''}`} id="dni" value={data.dni} onChange={(e) => setData('dni', e.target.value)}/>
                                {errors.dni && <div className="invalid-feedback">{errors.dni}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text" className={`form-control ${errors.address ? 'is-invalid' : ''}`} id="address" value={data.address} onChange={(e) => setData('address', e.target.value)}/>
                                {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                            </div>
                            <div className="row g-3">
                                <div className="col-md-7">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input type="text" className={`form-control ${errors.city ? 'is-invalid' : ''}`} id="city" value={data.city} onChange={(e) => setData('city', e.target.value)}/>
                                    {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="zipCode" className="form-label">Zip Code</label>
                                    <input type="text" className={`form-control ${errors.zip_code ? 'is-invalid' : ''}`} id="zipCode" value={data.zip_code} onChange={(e) => setData('zip_code', e.target.value)}/>
                                    {errors.zip_code && <div className="invalid-feedback">{errors.zip_code}</div>}
                                </div>
                            </div>
                            <div className="d-flex justify-content-end mt-4">
                                <button type="button" className="next-btn btn btn-light" onClick={nextStep} disabled={processing}>
                                    Next
                                </button>
                            </div>
                        </div>

                        <div className={`form-step ${currentStep === 1 ? 'active' : ''}`}>
                            <h2 className="h5 fw-bold mb-4">Payment Details</h2>
                            <div className="mb-3">
                                <label htmlFor="cardNumber" className="form-label">Card number</label>
                                <input type="text" className={`form-control ${errors.card_number ? 'is-invalid' : ''}`} id="cardNumber" value={data.card_number} onChange={(e) => setData('card_number', e.target.value.replace(/\s/g, ''))} placeholder="xxxx xxxx xxxx xxxx" maxLength="19"/>
                                {errors.card_number && <div className="invalid-feedback">{errors.card_number}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cardName" className="form-label">Card name</label>
                                <input type="text" className={`form-control ${errors.card_name ? 'is-invalid' : ''}`} id="cardName" value={data.card_name} onChange={(e) => setData('card_name', e.target.value)}/>
                                {errors.card_name && <div className="invalid-feedback">{errors.card_name}</div>}
                            </div>
                            <div className="row g-3">
                                <div className="col-6">
                                    <label htmlFor="expiry" className="form-label">Expiry date</label>
                                    <input type="text" className={`form-control ${errors.expiry ? 'is-invalid' : ''}`} id="expiry" value={data.expiry} onChange={(e) => setData('expiry', e.target.value)} placeholder="MM/YY" maxLength="5" />
                                    {errors.expiry && <div className="invalid-feedback">{errors.expiry}</div>}
                                </div>
                                <div className="col-6">
                                    <label htmlFor="cvv" className="form-label">CVV</label>
                                    <input type="text" className={`form-control ${errors.cvv ? 'is-invalid' : ''}`} id="cvv" value={data.cvv} onChange={(e) => setData('cvv', e.target.value.replace(/\D/g, ''))} placeholder="xxx" maxLength="4" />
                                    {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mt-4">
                                <button type="button" className="prev-btn btn btn-light" onClick={prevStep} disabled={processing}>
                                    Previous
                                </button>
                                <button type="button" className="next-btn btn btn-light" onClick={nextStep} disabled={processing}>
                                    Next
                                </button>
                            </div>
                        </div>

                        <div className={`form-step ${currentStep === 2 ? 'active' : ''}`}>
                            <h2 className="h5 fw-bold mb-4">Order Review</h2>
                            <div id="review-shipping" className="mb-4 p-3 bg-light rounded">
                                <strong>Shipping:</strong><br />
                                {data.full_name}<br />
                                {data.dni}<br />
                                {data.address}<br />
                                {data.city}, {data.zip_code}
                            </div>

                            <div id="review-payment" className="mb-4 p-3 bg-light rounded">
                                <strong>Payment:</strong><br />
                                Card ending in **** {data.card_number.slice(-4) || '0000'}<br />
                                Expires {data.expiry}
                            </div>

                            <div className="d-flex justify-content-between mt-4">
                                <button type="button" className="prev-btn btn btn-light" onClick={prevStep} disabled={processing}>
                                    Previous
                                </button>

                                <button type="submit" className="btn btn-success" disabled={processing}>
                                    {processing ? 'Processing...' : 'Complete Purchase'}
                                </button>
                            </div>
                        </div>

                        {notification && (
                            <div className="notification-message show">
                                {notification}
                            </div>
                        )}
                    </form>
                </div>

                <div className="summary-panel">
                    <h5 className="fw-bold mb-4">Order Summary</h5>
                    <div id="summary-content">
                        <div className="summary-item">
                            <h6>Shipping Information</h6>
                            <p id="summary-shipping-info">
                                {data.full_name || 'Not entered yet'}
                            </p>
                        </div>

                        <div className="summary-item mt-3">
                            <h6>Payment Details</h6>
                            <p id="summary-payment-info">
                                Card ending in **** {data.card_number.slice(-4) || '0000'}
                            </p>
                        </div>

                        <div className="summary-total d-flex justify-content-between">
                            <span>Total</span>
                            <span>data.price</span> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
