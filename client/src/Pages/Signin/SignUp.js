import React from 'react';
import { Form, Button, Card, Row, Col } from "react-bootstrap"
import "./SignUp.css"
import "bootstrap/dist/css/bootstrap.min.css"

export default function SignUp() {
    
    return (
      <Row>
            <Col md={12}>
                <div class="form-card">
                    <Card>
                        <Card.Body>
                            <h2 className = "text-center mb-4"> Sign Up </h2>
                            <Form >
                                <Form.Group id="firstName">
                                    <Form.Label> </Form.Label>
                                    <Form.Control type = "text" placeholder="First Name" required />
                                </Form.Group>
                                <Form.Group id="lastName">
                                    <Form.Label> </Form.Label>
                                    <Form.Control type = "text" placeholder="Last Name" required />
                                </Form.Group>
                                <Form.Group id = "email">
                                    <Form.Label> </Form.Label>
                                    <Form.Control type = "email" placeholder="Email" required />
                                </Form.Group>
                                <Form.Group id = "password">
                                    <Form.Label> </Form.Label>
                                    <Form.Control type = "password" placeholder="Password" required />
                                </Form.Group>
                                <Form.Group id = "password-confirm">
                                    <Form.Label> </Form.Label>
                                    <Form.Control type = "password" placeholder="Confirm Password"required />
                                </Form.Group>
                                <Row className="justify-content-center">
                                    <Col md={4}>
                                        <Button 
                                            className = "w-100 signup-button submit" type = "submit">
                                                Log In
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
                <div className = "w=100 text-center mt-2" >
                    Already have an account? Log in
                </div>
            </Col>
        </Row>
    
        
    )

    
  };
  
  
