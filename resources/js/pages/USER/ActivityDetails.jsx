import { Container, Row, Col, Button, Card, Dropdown, CardBody, CardTitle } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import "../../../css/SeeDetails.css";
import "react-datepicker/dist/react-datepicker.css";
import _defaultimage from "../../img/DefaultUserImage.png";  

function ActivityDetails({ activity }) {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [mapKey, setMapKey] = useState(0);

  // Imagen correcta del producto
  const imgUrl = activity.imagen
    ? `/activities/${activity.imagen}`
    : "/img/landingImg1.png";

  const images = activity?.images && activity.images.length > 0
    ? activity.images
    : [activity?.image || _defaultimage];

  const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs > 0 ? hrs + 'h ' : ''}${mins}m`;
  };


  const initActivityMap = () => 
  {
      if (window.google) {
        const map = new window.google.maps.Map(document.getElementById('activityMap'), {
          center: { lat: activity.place.lat, lng: activity.place.lng },
          zoom: 12,
        });

        const trackPoints = activity.track_points.map(point => ({
          lat: point.latitude,  
          lng: point.longitude, 
        }));

        const routePath = new window.google.maps.Polyline({
          path: trackPoints,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2,
        });

        routePath.setMap(map);
      }
    };


    window.onload = initActivityMap;

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="activity-hero">
        <img
          src={imgUrl}
          alt={activity.name}
          className="activity-hero-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/img/landingImg1.png";
          }}
        />
        <div className="activity-hero-overlay"></div>
        <Container className="hero-text-container">
          <h1>{activity.name}</h1>
          <p className="activity-location">
            {activity.place?.city || activity.location}, {activity.place?.country || ""}
          </p>
        </Container>
      </section>


      {/* Activity Details Section */}
      <section className="activity-details py-5">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={8}>
              <Card className="details-card shadow-lg border-0">
                <Card.Body>
                  {/* Activity Info */}
                  <Row className="mb-4 info-row">
                    <Col xs={12} md={6}>
                      <p className="activity-location">
                        {activity.location || `${activity.place.city}, ${activity.place.country}`}
                      </p>
                    </Col>
                    <Col xs={12} md={6}>
                      <strong>{t("Price")}:</strong> ${activity.price}
                    </Col>
                  </Row>

                  {/* Description */}
                  {activity.description && (
                    <p className="details-desc">{activity.description}</p>
                  )}

                  {/* Instructions / Notes */}
                  <div className="details-instructions mb-4">
                    <h5>{t("Important Instructions")}</h5>
                    <ul>
                      <li>{t("Please review all activity details before reserving.")}</li>
                      <li>{t("Ensure you meet the requirements and check availability.")}</li>
                      <li>{t("Bring necessary equipment if required.")}</li>
                      <li>{t("Follow safety guidelines provided by the instructor.")}</li>
                    </ul>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Date Picker and Actions */}
      <section className="activity-actions py-5 bg-light">
        <Container>
          <Row className="mt-4">
            <Col md={8} className="activity-info d-flex flex-column">
              {activity.distance && (
                <div className="stats-preview mb-4 p-3 bg-light rounded">
                  <h5>Route data</h5>
                  <Row>
                    <Col sm={4}>
                      <strong>{activity.distance} km</strong><br />Distance
                    </Col>
                    <Col sm={4}>
                      <strong>{formatDuration(activity.duration)}</strong><br />Time
                    </Col>
                    <Col sm={4}>
                      <strong>{activity.avg_speed?.toFixed(1)} km/h</strong><br />Avg Speed
                    </Col>
                  </Row>
                </div>
              )}
            </Col>

            <Col md={4} className="d-flex flex-column gap-3">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd-MM-yyyy"
                highlightDates={[new Date()]}
                placeholderText="Fecha"
                className="form-control"
                name="date"
              />
              <Dropdown onSelect={(eventKey) => setSelectedHour(eventKey)}>
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="w-100">
                  {selectedHour || 'Hora'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {activity.hours?.map((hour, idx) => (
                    <Dropdown.Item key={idx} eventKey={hour}>{hour}</Dropdown.Item>
                  )) || <Dropdown.Item>8:00 a.m.</Dropdown.Item>}
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-people" className="w-100">
                  {t("People")}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                    <Dropdown.Item key={n} href="#">{n}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Container>
      </section>

      {activity.track_points && (
        <Row className="mt-5">
          <Col md={12}>
            <Card className="shadow-sm">
              <CardBody>
                <CardTitle tag="h4" className="mb-4">
                  Activity route
                  <small className="text-muted d-block mt-1">
                    {activity.track_points.length} GPS points
                  </small>
                </CardTitle>
                <div id="activityMap" style={{ height: '400px', width: '100%', borderRadius: '12px', background: '#f0f4f8' }} key={mapKey} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}

      <script async src="https://maps.googleapis.com/maps/api/js?key=TU_API_KEY&libraries=geometry&callback=initActivityMap"></script>

      <Footer />
    </>
  );
}

export default ActivityDetails;