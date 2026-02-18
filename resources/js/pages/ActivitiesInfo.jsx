import { Container, Row, Col, Dropdown, Card, CardBody, CardTitle } from "reactstrap"
import { useState } from "react"

import DatePicker from "react-datepicker"
import Header from '../components/Header'
import Footer from '../components/Footer'

import _defaultimage from "../img/DefaultUserImage.png"

import "../../css/DatePicker.css"
import "react-datepicker/dist/react-datepicker.css"

function ActivitiesInfo({ activity = null }) 
{
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);
    const [mapKey, setMapKey] = useState(0); 

    const images = activity?.images && activity.images.length > 0
        ? activity.images
        : [activity?.image || _defaultimage];

    const formatDuration = (seconds) => 
    {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        return `${hrs > 0 ? hrs + 'h ' : ''}${mins}m`;
    };

    return (
        <Container fluid className="px-1 px-sm-5 mx-auto mt-4">
            <Header />
            <Row>
                <div id="activityCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {images.map((img, index) => (
                            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                <img src={img} className="d-block w-100" alt={`activity ${index}`} style={{height: '400px', objectFit: 'cover'}} />
                            </div>
                        ))}
                    </div>
                    {images.length > 1 && (
                        <>
                            <button className="carousel-control-prev" type="button" data-bs-target="#activityCarousel" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#activityCarousel" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </>
                    )}
                </div>
            </Row>

            <Row className="mt-4">
                <Col md={8} className="activity-info d-flex flex-column">
                    <h2 className="mb-3">{activity.name}</h2>
                    <p className="description mb-4">{activity.description}</p>
                    
                    {activity.distance && (
                        <div className="stats-preview mb-4 p-3 bg-light rounded">
                            <h5>Route data</h5>
                            <Row>
                                <Col sm={4}>
                                    <strong>{activity.distance} km</strong><br/>Distance
                                </Col>
                                <Col sm={4}>
                                    <strong>{formatDuration(activity.duration)}</strong><br/>Time
                                </Col>
                                <Col sm={4}>
                                    <strong>{activity.avg_speed?.toFixed(1)} km/h</strong><br/>Vel. average
                                </Col>
                            </Row>
                        </div>
                    )}

                    <div className="activity-actions mt-auto">
                        <span className="price h3 text-success">{activity.price}€</span>
                        <button className="btn btn-success btn-lg ms-3">Book now</button>
                    </div>
                </Col>

                <Col md={4} className="d-flex flex-column gap-3">
                    <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} dateFormat="dd-MM-yyyy" highlightDates={[new Date()]} placeholderText="Fecha" className="form-control" name="date"/>
                    
                    <Dropdown onSelect={(eventKey) => setSelectedHour(eventKey)}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className="w-100">
                            {selectedHour || 'Hora'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {activity.hours?.map((hour, idx) => (
                                <Dropdown.Item key={idx} eventKey={hour}>{hour}</Dropdown.Item>
                            )) || <Dropdown.Item disabled>Sin horarios</Dropdown.Item>}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-people" className="w-100">
                            People
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {[1,2,3,4,5,6,7,8,9,10].map(n => (
                                <Dropdown.Item key={n} href="#">{n}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>

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
                                <div id="activityMap" style={{ height: '400px', width: '100%', borderRadius: '12px', background: '#f0f4f8'}} key={mapKey} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            )}

            <script async src="https://maps.googleapis.com/maps/api/js?key=TU_API_KEY&libraries=geometry&callback=initActivityMap"></script>
            <Footer />
        </Container>
    );
}

export default ActivitiesInfo;
