import logo from '../assets/img/logo.png'

function RegisterPage() 
{
    //#region JSCode
    const form = document.getElementById('checkout-form');
    const steps = form.querySelectorAll('.form-step');
    const headers = document.querySelectorAll('.step-item');
    const progressBar = document.querySelector('.progress-indicator');
    const notification = document.getElementById('notification');
    
    const summaryShippingInfo = document.getElementById('summary-shipping-info');
    const summaryPaymentInfo = document.getElementById('summary-payment-info');

    let currentStep = 0;

    function showStep(stepIndex) 
    {
        steps.forEach((step, index) => 
        {
            step.classList.remove('active');

            if (index === stepIndex) 
            {
                step.classList.add('active');
            }
        });

        headers.forEach((header, index) => 
        {
            header.classList.remove('active', 'completed');

            if (index < stepIndex) 
            {
                header.classList.add('completed');
            } 
            else if (index === stepIndex) 
            {
                header.classList.add('active');
            }
        });

        const progress = (stepIndex / (steps.length - 1)) * 100;
        progressBar.style.width = '${progress}%';
    }

    function showNotification(message) 
    {
        notification.textContent = message;
        notification.classList.add('show');

        setTimeout(() => 
        {
            notification.classList.remove('show');
        }, 3000);
    }

    function updateReviewDetails() 
    {
        const fullName = document.getElementById('fullName').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const zipCode = document.getElementById('zipCode').value;

        const cardNumber = document.getElementById('cardNumber').value;
        
        const reviewShipping = document.getElementById('review-shipping');
        reviewShipping.innerHTML = ' ${fullName}<br> ${address}<br> ${city}, ${zipCode}';
        summaryShippingInfo.textContent = '${fullName}, ${address}, ${city}, ${zipCode}';

        const reviewPayment = document.getElementById('review-payment');
        const lastFourDigits = cardNumber.slice(-4);
        reviewPayment.textContent = 'Card ending in **** ${lastFourDigits';
        summaryPaymentInfo.textContent = 'Card ending in **** ${lastFourDigits}';
    }

    form.addEventListener('click', (e) => 
    {
        if (e.target.matches('.next-btn')) 
        {
            if (currentStep === 0) 
            {
                const fullName = document.getElementById('fullName').value;
                const address = document.getElementById('address').value;

                if (!fullName || !address) 
                {
                    showNotification('Please fill out all shipping fields.');
                    return;
                }
            }
            
            if (currentStep < steps.length - 1) 
            {
                currentStep++;

                if (currentStep === 2) 
                {
                    updateReviewDetails();
                }

                showStep(currentStep);
            }
        }
        else if (e.target.matches('.prev-btn')) 
        {
            if (currentStep > 0) 
            {
                currentStep--;
                showStep(currentStep);
            }
        }
    });

    form.addEventListener('submit', (e) => 
    {
        e.preventDefault();
        showNotification('Purchase Complete!');

        setTimeout(() => 
        {
            location.reload();
        }, 2000);
    });

    document.addEventListener('DOMContentLoaded', () => 
    {
        showStep(0);
    });
    //#endregion

    //#region Verify data
    const Verify = (e) => 
    {
        e.preventDefault();
    };
    //#endregion


    return (
        <>
            <div class="form-panel">
                <h1 class="h3 fw-bold mb-4">Complete your purchase</h1>
                
                <div class="step-progress-bar">
                    <div class="progress-indicator" style="width: 0%;"></div>
                </div>

                #region header
                    <div class="step-header">
                        <div class="step-item active" id="step1-header">
                            <div class="step-number">1</div>
                            <div class="step-title d-none d-md-block">Shipping</div>
                        </div>
                        <div class="step-item" id="step2-header">
                            <div class="step-number">2</div>
                            <div class="step-title d-none d-md-block">Payment</div>
                        </div>
                        <div class="step-item" id="step3-header">
                            <div class="step-number">3</div>
                            <div class="step-title d-none d-md-block">Review</div>
                        </div>
                    </div>
                #endregion

                <form id="checkout-form">
                    #region Shipping part
                        <div class="form-step active" id="step1">
                            <h2 class="h5 fw-bold mb-4">Shipping Information</h2>
                            <div class="mb-3">
                                <label for="fullName" class="form-label">Full Name</label>
                                <input type="text" class="form-control" id="fullName" name="fullName"/>
                            </div>
                            <div class="mb-3">
                                <label for="address" class="form-label">Address</label>
                                <input type="text" class="form-control" id="address" name="address"/>
                            </div>
                            <div class="row g-3">
                                <div class="col-md-7">
                                    <label for="city" class="form-label">City</label>
                                    <input type="text" class="form-control" id="city" name="city"/>
                                </div>
                                <div class="col-md-5">
                                    <label for="zipCode" class="form-label">Zip Code</label>
                                    <input type="text" class="form-control" id="zipCode" name="zipCode"/>
                                </div>
                            </div>
                            <div class="d-flex justify-content-end mt-4">
                                <button type="button" class="next-btn btn btn-primary">Next</button>
                            </div>
                        </div>
                    #endregion


                    #region Payment part
                        <div class="form-step" id="step2">
                            <h2 class="h5 fw-bold mb-4">Payment Details</h2>
                            <div class="mb-3">
                                <label for="cardNumber" class="form-label">Card number</label>
                                <input type="text" class="form-control" id="cardNumber" name="cardNumber" placeholder="xxxx xxxx xxxx xxxx"/>
                            </div>
                            <div class="mb-3">
                                <label for="cardName" class="form-label">Card name</label>
                                <input type="text" class="form-control" id="cardName" name="cardName"/>
                            </div>
                            <div class="row g-3">
                                <div class="col-6">
                                    <label for="expiry" class="form-label">Expiry date</label>
                                    <input type="text" class="form-control" id="expiry" name="expiry" placeholder="MM/YY"/>
                                </div>
                                <div class="col-6">
                                    <label for="cvv" class="form-label">CVV</label>
                                    <input type="text" class="form-control" id="cvv" name="cvv" placeholder="xxx"/>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between mt-4">
                                <button type="button" class="prev-btn btn btn-light">Previous</button>
                                <button type="button" class="next-btn btn btn-primary">Next</button>
                            </div>
                        </div>
                    #endregion

                    #region Review part
                        <div class="summary-panel d-none d-lg-block">
                            <h5 class="fw-bold mb-4">Order Summary</h5>
                            <div id="summary-content">
                                <div class="summary-item">
                                    <h6>Shipping Information</h6>
                                    <p id="summary-shipping-info">Not entered yet.</p>
                                </div>
                                <div class="summary-item mt-3">
                                    <h6>Payment Details</h6>
                                    <p id="summary-payment-info">Not entered yet.</p>
                                </div>
                                <div class="summary-total d-flex justify-content-between">
                                    <span>Total</span>
                                    <span></span> 
                                </div>
                            </div>
                        </div>
                    #endregion

                    <div id="notification" class="notification-message"></div>
                </form>
            </div>
        </>
    );
}

export default RegisterPage;
