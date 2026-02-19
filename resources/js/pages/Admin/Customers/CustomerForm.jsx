import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";

export default function CustomerForm({ customer, close }) {

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
    });

    // preload when editing
    useEffect(() => {
        if (customer) {
            setData({
                name: customer.name || "",
                email: customer.email || "",
                password: "",
            });
        }
    }, [customer]);

    const submit = (e) => {
        e.preventDefault();

        if (customer) {
            put(route("admin.customers.update", customer.id), {
                onSuccess: () => close(),
            });
        } else {
            post(route("admin.customers.store"), {
                onSuccess: () => {
                    reset();
                    close();
                },
            });
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>{customer ? "Edit Customer" : "Add Customer"}</h2>
                </div>

                <form onSubmit={submit} className="form-grid">

                    <div>
                        <label>Name</label>
                        <input
                            value={data.name}
                            onChange={e => setData("name", e.target.value)}
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>

                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={e => setData("email", e.target.value)}
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>

                    {!customer && (
                        <div>
                            <label>Password</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={e => setData("password", e.target.value)}
                            />
                            {errors.password && <span className="error">{errors.password}</span>}
                        </div>
                    )}

                    <div className="form-actions">
                        <button type="button" onClick={close} className="btn-secondary">
                            Cancel
                        </button>

                        <button type="submit" disabled={processing} className="btn-primary">
                            {processing ? "Saving..." : customer ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
