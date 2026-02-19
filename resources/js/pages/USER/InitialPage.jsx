import { useState } from "react";
import { Container, Row, Col, Card, Button, Form, InputGroup } from "react-bootstrap";
import { router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import "../../../css/UserHome.css";

export default function InitialPage({ popularCities, activities, search }) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState(search || "");

  const handleSearch = (e) => {
    e.preventDefault();
    router.get("/home", { search: searchTerm });
  };

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section
        className="text-center d-flex align-items-center justify-content-center hero-section"
        style={{ backgroundImage: 'url(/img/LandingImg2.jpg)' }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.25)', zIndex: 1,
            pointerEvents: 'none'
          }}
        ></div>

        <Container style={{ zIndex: 2 }}>
          <h1>{t("Find Your Next Adventure")}</h1>
          <p>{t("Search countries, cities, and activities")}</p>

          <Form onSubmit={handleSearch} className="d-flex justify-content-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder={t("Search by city or country...")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit">{t("Search")}</Button>
            </InputGroup>
          </Form>
        </Container>
      </section>

      {/* Popular Cities */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="mb-5 text-center popular-title">{t("Popular Cities")}</h2>
          <Row className="g-4 justify-content-center">
            {popularCities.map((city, idx) => (
              <Col key={idx} xs={6} sm={4} md={3} lg={2}>
                <div
                  className="city-card-small"
                  onClick={() => router.get("/home", { search: city.name })}
                  style={{ "--accent": "#2796D1" }}
                >
                  <h3>{city.name}</h3>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Activities Section */}
      <section className="activities-section py-5">
        <Container>
          <h2 className="section-title text-center mb-5">{t("Activities")}</h2>

          <Row className="g-4 justify-content-center">
            {activities.length > 0 ? (
              activities.map((act, idx) => {
                const imgUrl = `/activities/${act.imagen}`; // PUBLIC folder path

                return (
                  <Col key={idx} xs={12} sm={6} md={4} lg={3} className="d-flex">
  <Card className="activity-card flex-fill">
    <div className="activity-img-wrapper">
      <img src={act.imagen} alt={act.name} className="activity-img" />
      <div className="overlay-gradient"></div>
    </div>

    <Card.Body className="d-flex flex-column h-100">
      <div className="activity-text">
        <Card.Title className="activity-name">{act.name}</Card.Title>
        <Card.Subtitle className="mb-3 activity-place">
          {act.place.city}, {act.place.country}
        </Card.Subtitle>
      </div>

      {act.price != null && (
        <div className="activity-price-badge">${act.price.toFixed(2)}</div>
      )}

      <Button
        className="activity-btn mt-auto"
        onClick={() => router.get(`/activities/${act.id}`)}
      >
        View Details
      </Button>
    </Card.Body>
  </Card>
</Col>
                );
              })
            ) : (
              <p className="text-center">{t("No activities found for this location.")}</p>
            )}
          </Row>
        </Container>
      </section>

      <Footer style={{ backgroundColor: "#FFFFFF" }} />
    </>
  );
}