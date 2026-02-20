import { Container, Row, Col, Button, Card, Dropdown, CardBody, CardTitle } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import { router } from '@inertiajs/react';

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import "../../../css/SeeDetails.css";
import "react-datepicker/dist/react-datepicker.css";
import _defaultimage from "../../img/DefaultUserImage.png";

function ActivityDetails({ activity }) {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedPeople, setSelectedPeople] = useState(null); //
  const [userLocation, setUserLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const mapRef = useRef(null);
  const directionsRendererRef = useRef(null);

  // Imagen principal
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

  // Obtener ubicación del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (err) => console.log("Geolocation error:", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Solicitar Directions API
  useEffect(() => {
    if (window.google && userLocation && activity.place) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: userLocation,
          destination: { lat: activity.place.lat, lng: activity.place.lng },
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error('Error fetching directions:', result);
          }
        }
      );
    }
  }, [userLocation, activity]);

  // Inicializar mapa con ruta y track_points
  useEffect(() => {
    if (window.google && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: activity.place,
        zoom: 12
      });

      // Mostrar ruta de Google Directions
      if (directions) {
        if (directionsRendererRef.current) {
          directionsRendererRef.current.setMap(null);
        }
        const directionsRenderer = new window.google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
        directionsRenderer.setDirections(directions);
        directionsRendererRef.current = directionsRenderer;
      }

      // Mostrar track_points de la actividad
      if (activity.track_points && Array.isArray(activity.track_points)) {
        const trackPath = new window.google.maps.Polyline({
          path: activity.track_points.map(p => ({ lat: p.latitude, lng: p.longitude })),
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        trackPath.setMap(map);
      }

      // Marcar inicio y fin de la actividad
      if (activity.track_points?.length > 0) {
        new window.google.maps.Marker({
          position: { lat: activity.track_points[0].latitude, lng: activity.track_points[0].longitude },
          map,
          title: "Start",
          icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
        });
        const lastPoint = activity.track_points[activity.track_points.length - 1];
        new window.google.maps.Marker({
          position: { lat: lastPoint.latitude, lng: lastPoint.longitude },
          map,
          title: "End",
          icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        });
      }
    }
  }, [directions, activity]);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="activity-hero">
        <img
          src={imgUrl}
          alt={activity.name}
          className="activity-hero-img"
          onError={(e) => { e.target.onerror = null; e.target.src = "/img/landingImg1.png"; }}
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

                  {activity.description && <p className="details-desc">{activity.description}</p>}

                  <div className="details-instructions mb-4">
                    <h5>{t("Important Instructions")}</h5>
                    <ul>
                      <li>{t("Please review all activity details before reserving.")}</li>
                      <li>{t("Ensure you meet the requirements and check availability.")}</li>
                      <li>{t("Bring necessary equipment if required.")}</li>
                      <li>{t("Follow safety guidelines provided by the instructor.")}</li>
                    </ul>
                  </div>

                  <Button
                    className="btn btn-outline-success btn-lg w-100 mt-2"
                    onClick={() => router.visit(route('cart.index'))}
                    style={{ color: 'white' }}
                  >
                    Add to Cart
                  </Button>
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
              />
              <Dropdown onSelect={(eventKey) => setSelectedHour(eventKey)}>
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="w-100">
                  {selectedHour || 'Time'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {(activity.hours?.length ? activity.hours : ['8:00 a.m.']).map((hour, idx) => (
                    <Dropdown.Item key={idx} eventKey={hour}>{hour}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

               <Dropdown onSelect={(eventKey) => setSelectedPeople(eventKey)}>
                <Dropdown.Toggle variant="success" id="dropdown-people" className="w-100">
                  {selectedPeople || t("People")}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {[...Array(10)].map((_, n) => (
                    <Dropdown.Item key={n + 1} eventKey={n + 1}>
                      {n + 1}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Activity Map */}
      <Row className="mt-5">
        <Col md={12}>
          <Card className="shadow-sm">
            <CardBody>
              <CardTitle tag="h4" className="mb-4">
                Activity route
                <small className="text-muted d-block mt-1">
                  {activity.track_points?.length || 0} GPS points
                </small>
              </CardTitle>
              <div ref={mapRef} style={{ height: '500px', width: '100%', borderRadius: '12px', background: '#f0f4f8' }} />
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Store Locator Section
        What it miss to show that create an account on the google cloud
      */}
      <section className="store-locator py-5">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={10}>
              <gmpx-api-loader key="YOUR_API_KEY_HERE" solution-channel="GMP_QB_locatorplus_v11_c"></gmpx-api-loader>
              <gmpx-store-locator map-id="DEMO_MAP_ID" style={{ width: '100%', height: '500px' }}></gmpx-store-locator>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
}

export default ActivityDetails;
