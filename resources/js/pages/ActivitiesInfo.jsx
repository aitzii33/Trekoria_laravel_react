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

                    <div className="dropdown">
                        <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown">
                            {selectedHour || "HOURS"}
                        </button>
                        <ul className="dropdown-menu">
                            {activity.hours && activity.hours.length > 0 ? (
                                activity.hours.map((hour, idx) => (
                                    <li key={idx}>
                                        <a className="dropdown-item" href="#" onClick={(e) => { 
                                            e.preventDefault(); 
                                            setSelectedHour(hour); 
                                        }}>
                                            {hour}
                                        </a>
                                    </li>
                                ))
                            ) : (
                                <li><span className="dropdown-item text-muted">No hours available</span></li>
                            )}
                        </ul>
                    </div>

                    <div className="dropdown">
                        <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown"> PEOPLE </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">1</a></li>
                            <li><a className="dropdown-item" href="#">2</a></li>
                            <li><a className="dropdown-item" href="#">3</a></li>
                        </ul>
                    </div>
                </Col>
            </Row>

            <Footer />
        </Container>
    );
}

export default ActivitiesInfo;
