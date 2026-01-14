import { Container, Row, Col } from "reactstrap"
import { useState } from "react"
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "../assets/CSS/DatePicker.css"

function ActivitiesInfo({ activity }) {
    const [selectedDate, setSelectedDate] = useState(null);

    const images = activity.images && activity.images.length > 0
    ? activity.images
    : [activity.image];

    return (
        <Container fluid className="px-1 px-sm-5 mx-auto mt-4">
            <Header />

            <Row>
                <div id="activityCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {images.map((img, index) => (
                            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                <img src={img} className="d-block w-100" alt={`activity ${index}`} />
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
                    <h2>{activity.name}</h2>
                    <p className="description">{activity.description}</p>
                    <div className="activity-actions mt-auto">
                        <span className="price">{activity.price}</span>
                    </div>
                </Col>

                <Col md={4} className="d-flex flex-column gap-3">
                    <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} dateFormat="dd-MM-yyyy" highlightDates={[new Date()]} placeholderText="Select a date" className="form-control" name="date"/>

                    <Dropdown onSelect={(eventKey, event) => setSelectedHour(eventKey)}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Hours
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {activity.hours && activity.hours.length > 0 ? 
                            (
                                activity.hours.map((hour, idx) => 
                                (
                                    <Dropdown.Item key={idx} eventKey={hour}>
                                    {hour}
                                    </Dropdown.Item>
                                ))
                            ) : 
                            (
                                <Dropdown.Item disabled>No hours available</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>


                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            People
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">1</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">2</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">3</Dropdown.Item>
                            <Dropdown.Item href="#/action-1">4</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">5</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">6</Dropdown.Item>
                            <Dropdown.Item href="#/action-1">7</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">8</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">9</Dropdown.Item>
                            <Dropdown.Item href="#/action-1">10</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>

            <Footer />
        </Container>
    );
}

export default ActivitiesInfo;
