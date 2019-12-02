import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './home.css'
import Collapse from '../components/collapse';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Container className="login">
          <Row className="top-menu">
            <Col xs="1" />
            <Col className="text-center p">
              <Image src={process.env.PUBLIC_URL + '/img/logo-bancolombia.png'} ></Image>
            </Col>
            <Col xs="1" />
          </Row>
          <Row className="mt-2">
            <Col xs="2" />
            <Col className="text-center">
              <h6>Productos</h6>
            </Col>
            <Col xs="2" />
          </Row>
          <Row>
            <Col >
              <div className="products-container">
                <Collapse></Collapse>
                <Collapse></Collapse>
                <Collapse></Collapse>
              </div>
            </Col>
          </Row>

        </Container>
        <Container className="mt-3 fixed-bottom bottom-menu text-center">
          <Row >
            <Col className="p-2">
              <Image src={process.env.PUBLIC_URL + '/img/localizacion.svg'} fluid />
              <h6>Localizanos</h6>
            </Col>
            <Col className="p-2">
              <Image src={process.env.PUBLIC_URL + '/img/mensaje.svg'} fluid />
              <h6>Chat</h6>
            </Col>
            <Col className="p-2">
              <Image src={process.env.PUBLIC_URL + '/img/movil.svg'} fluid />
              <h6>Llámanos</h6>
            </Col>
            <Col className="p-2">
              <Image src={process.env.PUBLIC_URL + '/img/audifonos.svg'} fluid />
              <h6>Te llamamos</h6>
            </Col>
            <Col className="p-2">
              <Image src={process.env.PUBLIC_URL + '/img/altavoz.svg'} fluid />
              <h6>Por redes</h6>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}