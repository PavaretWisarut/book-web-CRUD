import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button , Col, Row, Container, Form } from "react-bootstrap";
import "../login.css";
import pic from '../assets/pictures/Background.png'
import axios from "axios";

function Login() {
  const navigate = useNavigate()
  const [username , setUsername] = useState('')
  const [password , setPassword] = useState('')

  let access = () =>{
    
    navigate('/home')
  }
  return (
    <div>
      <form>
        <Container className="logincontainer">
          <Row>
            <Col xs={12}>
              <h1 className="login-head">Login Page</h1>
            </Col>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
              </Form.Group>
              <Button variant="primary" className="loginbutt" onClick={login}>Log in Admin</Button>{' '}
            </Form>
            
          </Row>
        </Container>

      </form>
    </div>
  );
}

export default Login;
