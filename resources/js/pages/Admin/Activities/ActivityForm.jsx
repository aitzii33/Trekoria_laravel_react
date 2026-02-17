import React, { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import "./../../../../css/AdminActivities.css"

export default function ActivityForm({ activity, close }) {
    const { places } = usePage().props;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: "",
        description: "",
        location: "",
        price: "",
        is_active: true,
        place_id: places?.[0]?.id || "",
    });

    // If editing → preload values
    useEffect(() => {
        if (activity) {
            setData({
                name: activity.name || "",
                description: activity.description || "",
                location: activity.location || "",
                price: activity.price || "",
                is_active: activity.is_active,
                place_id: activity.place?.id || "",
            });
        }
    }, [activity]);

    const submit = (e) => {
        e.preventDefault();

        if (activity) {
            put(route("admin.activities.update", activity.id), {
                onSuccess: () => close(),
            });
        } else {
            post(route("admin.activities.store"), {
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
                <h2 className="modal-title">
                    {activity ? "Edit Activity" : "Add New Activity"}
                </h2>
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
                        <label>Description</label>
                        <textarea
                            value={data.description}
                            onChange={e => setData("description", e.target.value)}
                        />
                        {errors.description && <span className="error">{errors.description}</span>}
                    </div>

                    <div>
                        <label>Local Address</label>
                        <input
                            value={data.location}
                            onChange={e => setData("location", e.target.value)}
                        />
                        {errors.location && <span className="error">{errors.location}</span>}
                    </div>

                    <div>
                        <label>Price</label>
                        <input
                            type="number"
                            value={data.price}
                            onChange={e => setData("price", e.target.value)}
                        />
                        {errors.price && <span className="error">{errors.price}</span>}
                    </div>

                    <div>
                        <label>City</label>
                        <select
                            value={data.place_id}
                            onChange={e => setData("place_id", e.target.value)}
                        >
                            {places.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.city}, {p.country}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Status</label>
                        <select
                            value={data.is_active ? "1" : "0"}
                            onChange={e =>
                                setData("is_active", e.target.value === "1")
                            }
                        >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={close} className="btn-secondary">
                            Cancel
                        </button>

                        <button type="submit" disabled={processing} className="btn-primary">
                            {processing
                                ? "Saving..."
                                : activity
                                ? "Update"
                                : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
