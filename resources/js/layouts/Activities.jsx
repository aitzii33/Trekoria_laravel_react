import { useState } from "react"
import { Container, Row, Button, Form, Col } from "reactstrap"
import DatePicker from "react-datepicker"
import "bootstrap/dist/css/bootstrap.min.css"
import "react-datepicker/dist/react-datepicker.css"
import "../assets/CSS/DatePicker.css"
import "../assets/CSS/Activities.css"
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import BoatImg from "../assets/img/Boat.avif"
import Donostia from "../assets/img/Donostia1.jpeg"
import { useNavigate } from "react-router-dom"

function Activities() 
{
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();

    const routeActivityClick = () => 
    {
        navigate('/ActivityClick');
    };

    const handleSubmit = (e) => 
    {
        e.preventDefault();
        console.log("Select date:", selectedDate);
    };

    const [activity] = useState({
        image: BoatImg,
        name: "Kayak in the river",
        description: "Activity giuded for all the ages and levels",
        price: "25€",
    });

    return (
        <Container >
            <Header />

            <Row className="justify-content-center align-items-center hero-row">
                <Col md={10}>
                    <Row className="hero-box">
                        <Col md={7} className="hero-image">
                            <img src={Donostia} alt="city" />
                        </Col>

                        <Col md={5} className="hero-search d-flex flex-column justify-content-center">
                            <h2 className="mb-3">When you like to go?</h2>

                            <Form onSubmit={handleSubmit} className="date-form">
                                <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} dateFormat="dd-MM-yyyy" placeholderText="Selecciona una fecha" className="form-control mb-3" />
                                <Button type="submit" color="success" style={{ width: "50%", alignSelf: "flex-start", color: 'black' }} >
                                    Search activities
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>


            <Row className="justify-content-center" style={{ marginBottom: '30px'  }}>
                <Col md={10} className="activity-box card activity-card">
                    <Row>
                        <Col md={4} className="activity-image">
                            <img src={activity.image} alt="Boat activity" />
                        </Col>

                        <Col md={8} className="activity-info d-flex flex-column">
                            <h2>{activity.name}</h2>
                            <p className="description">{activity.description}</p>

                            <div className="activity-actions mt-auto">
                                <span className="price">{activity.price}</span>
                                <Button color="black" onClick={routeActivityClick}>DETAILS</Button>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Footer />
        </Container>
    );
}

export default Activities;
