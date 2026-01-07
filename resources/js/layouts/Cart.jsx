
function Cart()
{
    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-8">
                    //#region Card of activity
                    <div className="card border shadow-none">
                        <div className="card-body">
                            <div className="d-flex align-items-start border-bottom pb-3">
                                <div className="me-4">
                                    <img src="" alt="activity" className="avatar-lg rounded"/>
                                </div>

                                <div className="flex-grow-1 align-self-center overflow-hidden">
                                    <h5 className="text-truncate font-size-18">
                                        <a href="#" className="text-dark"> {/*Name of the activity*/}</a>
                                    </h5>
                                </div>

                                <div className="flex-shrink-0 ms-2">
                                    <ul className="list-inline mb-0 font-size-16">
                                        <li className="list-inline-item">
                                            <a href="#" className="text-muted px-1">
                                                <i className="mdi mdi-trash-can-outline" /> {/*For eliminate*/}
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="mt-3">
                                            <p className="text-muted mb-2">Price</p>
                                            <h5 className="mb-0 mt-2">{/*Pice of the activity*/}</h5>
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-5">
                                        <div className="mt-3">
                                            <p className="text-muted mb-2">Quantity</p>
                                            <div className="d-inline-flex">
                                                <select className="form-select form-select-sm w-xl" defaultValue="1">
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-3">
                                        <div className="mt-3">
                                            <p className="text-muted mb-2">Total</p>
                                            <h5>{/*Total price*/}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                    //#endregion

                    <div className="row my-4">
                        <div className="col-sm-6">
                            <a href="ecommerce-products.html" className="btn btn-link text-muted">
                                <i className="mdi mdi-arrow-left me-1" /> Continue Shopping {/*Redirect to the home page*/}
                            </a>
                        </div>
                        <div className="col-sm-6">
                            <div className="text-sm-end mt-2 mt-sm-0">
                                <a href="ecommerce-checkout.html" className="btn btn-success">
                                    <i className="mdi mdi-cart-outline me-1" /> Checkout {/*Redirect to Payment page*/}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-4">
                    <div className="mt-5 mt-lg-0">
                        <div className="card border shadow-none">
                            <div className="card-header bg-transparent border-bottom py-3 px-4">
                                <h5 className="font-size-16 mb-0">Order Summary <span className="float-end">#MN0124</span> </h5>
                            </div>
                            <div className="card-body p-4 pt-2">
                                <div className="table-responsive">
                                    <table className="table mb-0">
                                        <tbody>
                                            <tr className="bg-light">
                                                <th>Total :</th>
                                                <td className="text-end">
                                                    <span className="fw-bold">{/**/}</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
