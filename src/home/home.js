import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './home.css'
import Collapse from '../components/collapse';
import { string } from 'prop-types';

export default class Home extends Component {

  state = {
    user: null,
    random_user: {},
    ip: 0
  }

  componentDidMount() {
    this.setState({ random_user: JSON.parse(sessionStorage.getItem("user")) })

    fetch("https://randomuser.me/api/")
      .then(res => res.json())
      .then(res => {
        this.setState({ user: res.results[0] })
      })

    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(res => {
        this.setState({ ip: res.ip })
      })
  }

  getName() {
    if (this.state.user) {
      const { first, last, title } = this.state.user.name;
      return `${title} ${first} ${last}`.toUpperCase()
    }
    return '';
  }


  logout = () => {
    window.location.href = "/"
  }

  render() {
    return (
      <div>
        <Container className="bg">
          <Row className="top-menu">
            <Col xs="2" />
            <Col className="text-center p">
              <Image src={process.env.PUBLIC_URL + '/img/logo-bancolombia.png'} ></Image>
            </Col>
            <Col xs="2 d-flex align-items-center" onClick={this.logout}>
              <small className="bold color-primary blue">Salir</small>
            </Col>
          </Row>
          <Row className="mt-2 product-bar">
            <Col xs="2" />
            <Col className="text-center p-2">
              <h6>Productos</h6>
            </Col>
            <Col xs="2" />
          </Row>
          <Row className="bg-white">
            <Col xs="1" />
            <Col className="p-2   text-left">
              <p className="mb-0">{this.getName()}</p>
              <p className="mb-0">Usuario asignado: {this.state.random_user.user}</p>
              <p className="mb-0">IP: {this.state.ip}</p>
            </Col>
            <Col xs="1" />
          </Row>
          <Row>
            <Col >
              <div className="products-container">
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