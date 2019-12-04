import InputGroup from 'react-bootstrap/InputGroup'
import LoadingOverlay from 'react-loading-overlay'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './login.css'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { loged: false, isActive: false }
    }

    login = () => {
        this.setState({ isActive: true })
        fetch(`https://j2pc3dwyx4.execute-api.us-east-2.amazonaws.com/TEST/${Math.floor((Math.random() * 10000) + 1)}`)
            .then(res => res.json())
            .then(res => {
                sessionStorage.setItem("user", JSON.stringify(res))
                this.setState({ loged: true, isActive: true })
            })
    }

    render() {
        const { isActive } = this.state;
        return (
            <div>
                {this.state.loged && <Redirect to="/home" />}
                <LoadingOverlay
                    active={isActive}
                    spinner
                    text='Loading...'
                >
                    <Container className="login">
                        <Row className="mt-13">
                            <Col xs="1" />
                            <Col className="text-center">
                                <Image src={process.env.PUBLIC_URL + '/img/logo-bancolombia.png'} fluid></Image>
                            </Col>
                            <Col xs="1" />
                        </Row>
                        <Row>
                            <Col xs="2" />
                            <Col className="text-center">
                                <h6>Bancolombia App Personas</h6>
                            </Col>
                            <Col xs="2" />
                        </Row>
                        <Row className="mt-5">
                            <Col xs="1" />
                            <Col>
                                {/* <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <Image src={process.env.PUBLIC_URL + '/img/icon-user.png'} />
                            </InputGroup.Prepend>
                            <Form.Control
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup> */}
                                <Form.Control type="text" placeholder="Ingesa tu usuario" ></Form.Control>
                            </Col>
                            <Col xs="1" />
                        </Row>
                        <Row className="mt-3">
                            <Col xs="1" />
                            <Col className="text-center">
                                <Button variant="warning" onClick={this.login} className="w-50">Ingresar</Button>
                            </Col>
                            <Col xs="1" />
                        </Row>

                    </Container>
                </LoadingOverlay>
            </div>
        )
    }
}