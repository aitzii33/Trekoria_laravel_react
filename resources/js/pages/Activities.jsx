
import { router } from '@inertiajs/react'
import { useState } from "react"
import { Container, Row, Button, Form, Col } from "reactstrap"
import DatePicker from "react-datepicker"

import Header from '../components/Header'
import Footer from "../components/Footer"

import "bootstrap/dist/css/bootstrap.min.css"
import "react-datepicker/dist/react-datepicker.css"

import '../../css/DatePicker.css'
import '../../css/Activities.css'


function Activities() 
{
    const [selectedDate, setSelectedDate] = useState(null);

    const routeActivityClick = (id) => 
    {
        router.visit(`/activities/${id}`);
    };

    const handleSubmit = (e) => 
    {
        e.preventDefault();
        console.log("Selected date:", selectedDate);
    };

    return (
        <Container>
            <Header />
            <Row className="justify-content-center align-items-center hero-row">
                <Col md={10}>
                    <Row className="hero-box">
                        <Col md={7} className="hero-image">
                            <img src="/images/Donostia1.jpeg" alt="city" />
                        </Col>
                        
                        <Col md={5} className="hero-search d-flex flex-column justify-content-center">
                            <h2 className="mb-3">When you like to go?</h2>
                            <Form onSubmit={handleSubmit} className="date-form">
                                <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} dateFormat="dd-MM-yyyy" placeholderText="Select a date" className="form-control mb-3"/>
                                <Button type="submit" color="success" style={{ width: "50%", color: 'black' }}>
                                    Search activities
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row className="justify-content-center" style={{ marginBottom: '30px' }}>
                {activities.map(activity => (
                    <Col md={10} key={activity.id} className="activity-box card activity-card mb-3">
                        <Row>
                            <Col md={4} className="activity-image">
                                <img src={activity.image} alt={activity.name} />
                            </Col>
                            <Col md={8} className="activity-info d-flex flex-column">
                                <h2>{activity.name}</h2>
                                <p className="description">{activity.description}</p>
                                <div className="activity-actions mt-auto">
                                    <span className="price">{activity.price}</span>
                                    <Button color="black" onClick={() => routeActivityClick(activity.id)}>
                                        DETAILS
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                ))}
            </Row>
            <Footer />
        </Container>
    );
}

export default Activities;