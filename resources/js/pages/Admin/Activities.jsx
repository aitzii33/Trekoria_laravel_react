import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import Layout from "./Layout";

export default function Activities() {
  const { activities, places } = usePage().props;

  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
    location: "",
    price: "",
    is_active: true,
    place_id: places?.[0]?.id || "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      Inertia.put(`/admin/activities/${form.id}`, form);
    } else {
      Inertia.post("/admin/activities", form);
    }
    setForm({
      id: null,
      name: "",
      description: "",
      location: "",
      price: "",
      is_active: true,
      place_id: places?.[0]?.id || "",
    });
  };

  const handleEdit = (activity) => {
    setForm({
      id: activity.id,
      name: activity.name,
      description: activity.description,
      location: activity.location,
      price: activity.price,
      is_active: activity.is_active,
      place_id: activity.place?.id || "",
    });
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this activity?")) {
      Inertia.delete(`/admin/activities/${id}`);
    }
  };

  return (
    <Layout active="activities">
      <div className="activities-page">
        <h1>Manage Activities</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="activity-form">
          <h2>{form.id ? "Edit Activity" : "Add New Activity"}</h2>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            required
          />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <label>
            Active:
            <input
              type="checkbox"
              name="is_active"
              checked={form.is_active}
              onChange={handleChange}
            />
          </label>
          <select name="place_id" value={form.place_id} onChange={handleChange}>
            {places?.map((p) => (
              <option key={p.id} value={p.id}>
                {p.city}, {p.country}
              </option>
            ))}
          </select>

          <button type="submit">{form.id ? "Update" : "Add"}</button>
        </form>

        {/* Activities Table */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Price</th>
              <th>Active</th>
              <th>Place</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities?.data?.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.location}</td>
                <td>{a.price}</td>
                <td>{a.is_active ? "Yes" : "No"}</td>
                <td>{a.place ? `${a.place.city}, ${a.place.country}` : "N/A"}</td>
                <td>
                  <button onClick={() => handleEdit(a)}>Edit</button>
                  <button onClick={() => handleDelete(a.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
