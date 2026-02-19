import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ActivityDetails({ activity }) {
  const { t } = useTranslation();

  // Placeholder image if none
  const imgUrl = activity.image || `https://picsum.photos/800/400?random=${activity.id}`;

  return (
    <>
      <Header />

      {/* Hero Image */}
      <section className="activity-hero">
        <img src={imgUrl} alt={activity.name} className="activity-hero-img" />
        <div className="activity-hero-overlay"></div>
        <Container className="hero-text-container">
          <h1>{activity.name}</h1>
          <p className="activity-location">
            {activity.place.city}, {activity.place.country}
          </p>
        </Container>
      </section>

      {/* Details Section */}
      <section className="activity-details py-5">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={8}>
              <Card className="details-card shadow-sm border-0">
                <Card.Body>
                  <Card.Title className="details-title">{activity.name}</Card.Title>
                  <Card.Subtitle className="mb-3 details-location">
                    {activity.place.city}, {activity.place.country}
                  </Card.Subtitle>

                  {/* Local place / description */}
                  {activity.local_place && (
                    <p className="details-local">
                      <strong>{t("Local Place")}:</strong> {activity.local_place}
                    </p>
                  )}
                  {activity.description && (
                    <p className="details-desc">{activity.description}</p>
                  )}

                  {/* Static Booking Notes */}
                  <div className="details-notes">
                    <p>
                      {t(
                        "Please review all activity details before reserving. Ensure you meet the requirements and check the availability."
                      )}
                    </p>
                  </div>

                  {/* Reserve Button */}
                  <div className="text-center mt-4">
                    <Button
                      className="reserve-btn"
                      onClick={() => router.get(`/activities/${activity.id}/reserve`)}
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

      <Footer style={{ backgroundColor: "#FFFFFF" }} />
    </>
  );
}
