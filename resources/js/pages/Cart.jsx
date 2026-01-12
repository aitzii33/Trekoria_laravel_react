import { router, usePage } from '@inertiajs/react';

const eliminate = (id) => {
    router.delete(route('activities.destroy', id), 
    {
        preserveScroll: true,
    });
};

function Cart() {
    const { activities } = usePage().props;

    const total = activities.reduce(
        (sum, activity) => sum + activity.price, 0
    );

    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-8">

                    {activities.map(activity => (
                        <div className="card border shadow-none mb-3" key={activity.id}>
                            <div className="card-body">
                                <div className="d-flex align-items-start border-bottom pb-3">
                                    <div className="me-4">
                                        <img src={activity.image} alt="activity" className="avatar-lg rounded"/>
                                    </div>

                                    <div className="flex-grow-1 align-self-center overflow-hidden">
                                        <h5 className="text-truncate font-size-18">
                                            {activity.name}
                                        </h5>
                                    </div>

                                    <div className="flex-shrink-0 ms-2">
                                        <i className="mdi mdi-trash-can-outline text-danger" style={{ cursor: 'pointer' }} onClick={() => eliminate(activity.id)}/>
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-md-4">
                                        <p className="text-muted mb-1">Price</p>
                                        <h5>{activity.price} €</h5>
                                    </div>

                                    <div className="col-md-5">
                                        <p className="text-muted mb-1">Quantity</p>
                                        <select className="form-select form-select-sm w-xl">
                                            {[1,2,3,4,5,6].map(q => ( <option key={q} value={q}>{q}</option> ))}
                                        </select>
                                    </div>

                                    <div className="col-md-3">
                                        <p className="text-muted mb-1">Total</p>
                                        <h5>{activity.price} €</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                <div className="col-xl-4">
                    <div className="card border shadow-none">
                        <div className="card-header bg-transparent border-bottom">
                            <h5>Order Summary</h5>
                        </div>

                        <div className="card-body">
                            <table className="table mb-0">
                                <tbody>
                                    <tr className="bg-light">
                                        <th>Total :</th>
                                        <td className="text-end fw-bold">
                                            {total} €
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
