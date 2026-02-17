import '../../../css/Statistics.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

function StatsCards()
{
  const stats = [
    {
      icon: "bi-people",
      color: "primary",
      value: "1,234",
      label: "Active Users",
    },
    {
      icon: "bi-graph-up",
      color: "success",
      value: "56%",
      label: "Growth Rate",
    },
    {
      icon: "bi-star",
      color: "warning",
      value: "4.8",
      label: "Average Rating",
    },
    {
      icon: "bi-clock-history",
      color: "danger",
      value: "98.3%",
      label: "Uptime",
    },
  ];

  return (
    <div className="container py-5">
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {stats.map((stat, index) => (
          <div className="col" key={index}>
            <div className="card h-100 text-center shadow">
              <div className="card-body">
                <div className={`display-4 text-${stat.color} mb-2`}>
                  <i className={`bi ${stat.icon}`}></i>
                </div>
                <h2 className="card-title mb-3">{stat.value}</h2>
                <p className="card-text text-muted">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;
