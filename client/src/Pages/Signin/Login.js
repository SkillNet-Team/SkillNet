import React from 'react';
import { Form, Button, Card, Row, Col } from "react-bootstrap"
import "./login.css"
import "bootstrap/dist/css/bootstrap.min.css"

export default function Login() {
    
    return (
      <Row>
            <Col md={12}>
                <div class="form-card">
                    <Card>
                        <Card.Body>
                            <h2 className = "text-center mb-4"> Log In </h2>
                            <Form >
                                <Form.Group id = "email">
                                    <Form.Label> </Form.Label>
                                    <Form.Control type = "email" placeholder="Email" required />
                                </Form.Group>
                                <Form.Group id = "password">
                                    <Form.Label> </Form.Label>
                                    <Form.Control type = "password" placeholder="Password" required />
                                </Form.Group>
                                <Row className="justify-content-center">
                                    <Col md={4}>
                                        <Button 
                                            className = "w-100 login-button submit" type = "submit">
                                                Log In
                                        </Button>
                                    </Col>
                                </Row>
                                    
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
                <div className = "w=100 text-center mt-2" >
                    Don't have an account? Sign Up
                </div>
            </Col>
        </Row>
    
        
    )

    
  };
  
  
