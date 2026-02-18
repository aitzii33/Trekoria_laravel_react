import { useState } from 'react'
import Layout from './Layout'
import '../../../css/Statistics.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function StatsCards() 
{
  const [kpis, setKpis] = useState({});

  const cards = [
    { label: "Activities", value: kpis.total_activities || 15, color: "primary", icon: "bi-grid" },
    { label: "Reservations", value: kpis.total_bookings || 30, color: "success", icon: "bi-calendar-check" },
    { label: "People", value: kpis.total_people || 80, color: "info", icon: "bi-people" },
    { label: "Income", value: `${kpis.total_revenue || 3}`, color: "warning", icon: "bi-currency-dollar" },
    { label: "Top Activity", value: kpis.top_activity || "Ride a Horses", color: "danger", icon: "bi-star" },
    { label: "Top Guide", value: kpis.top_guide || "June", color: "secondary", icon: "bi-person-check" },
    { label: "Average Occupancy", value: `${kpis.average_occupancy || 10}%`, color: "dark", icon: "bi-bar-chart" },
  ];

  return (
    <Layout>
      <div className="container py-5">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {cards.map((card, index) => (
            <div className="col" key={index}>
              <div className='card h-100 text-center shadow'>
                <div className={`display-4 text-${card.color} mb-2`}>
                  <i className={`bi ${card.icon}`}></i>
                </div>
                <h2 className="card-title mb-3">{card.value}</h2>
                <p className="card-text text-muted">{card.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default StatsCards;
