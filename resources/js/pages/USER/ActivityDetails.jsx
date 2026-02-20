import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../../css/SeeDetails.css";

export default function ActivityDetails({ activity }) {
  const { t } = useTranslation();

  // Correct image path from public/activities
  const imgUrl = activity.imagen
    ? `/activities/${activity.imagen}`
    : "/img/landingImg1.png";

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
            {activity.place?.city || activity.location},{" "}
            {activity.place?.country || ""}
          </p>
        </Container>
      </section>

      {/* Details Section */}
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
                  <Row className="mb-4 info-row">
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

                  {/* Reserve Button */}
                  <div className="text-center">
                    <Button
                      className="reserve-btn"
                      onClick={() =>
                        router.get(`/activities/${activity.id}/reserve`)
                      }
                    >
                      {t("Reserve Now")}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
}