import Container from 'react-bootstrap/Container'
import Collapse from '../components/collapse';
import { Redirect } from 'react-router-dom'
import Image from 'react-bootstrap/Image'
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Chart from 'react-apexcharts'
import './home.css'

export default class Home extends Component {

  state = {
    user: null,
    random_user: {},
    ip: 0,
    ar: false,
    statistics: false
  }

  componentDidMount() {
    this.setState({ random_user: JSON.parse(sessionStorage.getItem("user")) })

    fetch("https://randomuser.me/api/")
      .then(res => res.json())
      .then(res => {
        this.setState({ user: res.results[0] }, () => {
          const { first, last, title } = this.state.user.name;
          sessionStorage.setItem("user_name", `${title} ${first} ${last}`.toUpperCase())
        })
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

  ar = () => {
    this.setState({ ar: true })
  }

  render() {
    return (
      <div>
        {this.state.ar && <Redirect to="/ar" />}
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

          {!this.state.statistics ?
            <div>
              <Row>
                <Col >
                  <div className="products-container">
                    <Collapse></Collapse>
                  </div>
                </Col>
              </Row>
            </div> :
            <div style={{marginTop:"2rem"}}>
              <Row>
                <Col>
                <h6>Sesiones por mes</h6>
                  <Chart
                    options={{
                      fill: { colors: ['#284182'] }, legend: { show: false },
                      grid: { show: true, borderColor: 'rgba(0, 0, 0, 0.1)', yaxis: { lines: { show: true } } },
                      xaxis: { tooltip: { enabled: false }, axisBorder: { show: false }, axisTicks: { show: true } },
                      yaxis: { labels: { show: false }, forceNiceScale: true },
                      chart: { animations: { enabled: false }, toolbar: { show: false } }
                    }}
                    type={'bar'}
                    width={'100%'}
                    series={[{ name: 'month', data: this.state.random_user.monthstats }]}
                    height={'200px'}
                  />
                </Col>
              </Row>
              <hr></hr>
              <Row>
                <Col >
                <h6>Sesiones por año</h6>
                  <Chart
                    options={{
                      fill: { colors: ['#F4D113'] }, legend: { show: false },
                      grid: { show: true, borderColor: 'rgba(0, 0, 0, 0.1)', yaxis: { lines: { show: true } } },
                      xaxis: { tooltip: { enabled: false }, axisBorder: { show: false }, axisTicks: { show: true } },
                      yaxis: { labels: { show: false }, forceNiceScale: true },
                      chart: { animations: { enabled: false }, toolbar: { show: false } }
                    }}
                    type={'bar'}
                    width={'100%'}
                    series={[{ name: 'year', data: this.state.random_user.yearstats }]}
                    height={'200px'}
                  />
                </Col>
              </Row>
              <hr></hr>
              <Row className="pb-5">
                <Col >
                <h6>Sesiones por día</h6>
                  <Chart
                    options={{
                      fill: { colors: ['#C4202B'] }, legend: { show: false },
                      grid: { show: true, borderColor: 'rgba(0, 0, 0, 0.1)', yaxis: { lines: { show: true } } },
                      xaxis: { tooltip: { enabled: false }, axisBorder: { show: false }, axisTicks: { show: true } },
                      yaxis: { labels: { show: false }, forceNiceScale: true },
                      chart: { animations: { enabled: false }, toolbar: { show: false } }
                    }}
                    type={'bar'}
                    width={'100%'}
                    series={[{ name: 'dayOfWeek', data: this.state.random_user.daystats }]}
                    height={'200px'}
                  />
                </Col>
              </Row>
            </div>
          }
        </Container>


        <Container>
          <a href="#" onClick={this.ar} className="float d-flex align-items-center">
            <i>
              <Image src={process.env.PUBLIC_URL + '/img/camera.svg'} fluid></Image>
            </i>
          </a>
        </Container>

        <Container className="mt-3 fixed-bottom bottom-menu text-center">
          <Row >
            <Col className="p-2" onClick={(ev) => this.setState({ statistics: false })}>
              <Image src={process.env.PUBLIC_URL + '/img/new-product.svg'} fluid style={{width: "35px"}}/>
              <h6>Productos</h6>
            </Col>
            <Col className="p-2" onClick={(ev) => this.setState({ statistics: true })} >
              <Image src={process.env.PUBLIC_URL + '/img/laptop.svg'} fluid style={{width: "35px"}}/>
              <h6>Estadísticas</h6>
            </Col>
          </Row>
        </Container>

      </div>
    )
  }
}