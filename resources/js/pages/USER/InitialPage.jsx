import { useState } from "react";
import { Container, Row, Col, Card, Button, Form, InputGroup } from "react-bootstrap";
import { router } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import "../../../css/UserHome.css";

export default function InitialPage({ continents, popularCities, activities, search }) {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState(search || "");
    const [showContinents, setShowContinents] = useState(false);
    const [hoveredContinent, setHoveredContinent] = useState(null);
    const [hoveredCountry, setHoveredCountry] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get("/home2", { search: searchTerm });
    };

    return (
        <>
            <Header />

            {/* Hero/Search Panel */}
            <section className="text-center py-5" style={{ backgroundColor: "#FFFFFF", color: "#2D2D2D" }}>
                <Container>
                    <h1 className="fw-bold" style={{ color: "#2796D1" }}>{t("Find Your Next Adventure")}</h1>
                    <p className="lead">{t("Search countries, cities, and activities")}</p>
                    <Form onSubmit={handleSearch} className="d-flex justify-content-center mt-3">
                        <InputGroup style={{ maxWidth: "500px" }}>
                            <Form.Control
                                type="text"
                                placeholder={t("Search by city or country...")}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ borderColor: "#2796D1" }}
                            />
                            <Button type="submit" style={{ backgroundColor: "#2796D1", borderColor: "#2796D1", color: "#FFFFFF" }}>
                                {t("Search")}
                            </Button>
                        </InputGroup>
                    </Form>
                </Container>
            </section>

            {/* Popular Cities */}
            <section className="py-5">
                <Container>
                    <h2 className="mb-4 fw-bold" style={{ color: "#2D2D2D" }}>{t("Popular Cities")}</h2>
                    <Row className="g-3">
                        {popularCities.map((city, idx) => (
                            <Col key={idx} md={3} sm={6}>
                                <Card
                                    onClick={() => router.get("/home2", { search: city.name })}
                                    className="shadow-sm hover-scale p-3 text-center border-0"
                                    style={{ cursor: "pointer" }}
                                >
                                    <Card.Title style={{ color: "#2796D1", fontWeight: "bold" }}>
                                        {city.name}
                                    </Card.Title>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* Explore Continents */}
            <section className="py-5">
                <Container>
                    <Button
                        variant="outline-primary"
                        style={{ borderColor: "#2796D1", color: "#2796D1" }}
                        onClick={() => setShowContinents(!showContinents)}
                    >
                        {showContinents ? t("Hide Continents") : t("Explore The World")}
                    </Button>

                    {showContinents && (
                        <div className="d-flex flex-wrap mt-4">
                            {/* Continents */}
                            <div className="me-4" style={{ minWidth: "180px" }}>
                                {Object.keys(continents).map((cont, idx) => (
                                    <div
                                        key={idx}
                                        className="p-2 mb-2 rounded text-white fw-bold text-center"
                                        style={{ backgroundColor: "#2796D1", cursor: "pointer" }}
                                        onMouseEnter={() => setHoveredContinent(continents[cont])}
                                        onMouseLeave={() => setHoveredContinent(null)}
                                    >
                                        {cont}
                                    </div>
                                ))}
                            </div>

                            {/* Countries & Cities */}
                            <div className="flex-grow-1">
                                {hoveredContinent &&
                                    Object.entries(hoveredContinent).map(([countryName, cities], idx) => (
                                        <div
                                            key={idx}
                                            className="p-2 m-2 rounded bg-light border shadow-sm text-dark"
                                            onMouseEnter={() => setHoveredCountry({ name: countryName, cities })}
                                            onMouseLeave={() => setHoveredCountry(null)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <strong>{countryName}</strong>
                                            {hoveredCountry && hoveredCountry.name === countryName && (
                                                <div className="mt-2 d-flex flex-wrap">
                                                    {cities.map((city, ci) => (
                                                        <div
                                                            key={ci}
                                                            className="p-2 m-1 rounded border bg-white shadow-sm text-dark"
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => router.get("/home2", { search: city })}
                                                        >
                                                            {city}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                </Container>
            </section>

            {/* Activities */}
            <section className="py-5">
                <Container>
                    <h2 className="mb-4 fw-bold" style={{ color: "#2D2D2D" }}>{t("Activities")}</h2>
                    <Row className="g-4">
                        {activities.length > 0 ? activities.map((act, idx) => (
                            <Col key={idx} md={4} sm={6}>
                                <Card className="shadow-sm border-0 p-3">
                                    <Card.Body>
                                        <Card.Title style={{ color: "#2796D1" }}>{act.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{act.place.city}, {act.place.country}</Card.Subtitle>
                                        <Button
                                            variant="outline-warning"
                                            style={{ borderColor: "#E5E592", color: "#2D2D2D" }}
                                            onClick={() => router.get(`/activities/${act.id}`)}
                                        >
                                            {t("View Details")}
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )) : <p>{t("No activities found for this location.")}</p>}
                    </Row>
                </Container>
            </section>

            <Footer style={{ backgroundColor: "#FFFFFF" }} />
        </>
    );
}
