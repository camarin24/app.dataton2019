import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card';
import './collapse.css'

export default class Collapse extends Component {

    state = { collapse: true, products: [] }

    componentDidMount() {
        this.setState({ products: JSON.parse(sessionStorage.getItem("user")).products })
    }

    toggle = () => {
        this.setState({ collapse: !this.state.collapse })
    }

    render() {
        return (
            <Card className="collapse-card">
                <Card.Header className="bold pl-3 pr-3 d-flex justify-content-between align-items-center" onClick={this.toggle}>
                    Cuentas de ahorros, corriente y mas
                    {
                        this.state.collapse ?
                            <img src={process.env.PUBLIC_URL + '/img/plus.svg'} alt="" width="10" /> :
                            <img src={process.env.PUBLIC_URL + '/img/minus.svg'} alt="" width="10" />
                    }
                </Card.Header>
                <Card.Body className={this.state.collapse ? "d-none" : ""}>
                    <ListGroup variant="flush">
                        {this.state.products.map((v, i) => <ListGroup.Item key={i} className="d-flex justify-content-between align-items-center">
                            {v}
                            <img src={process.env.PUBLIC_URL + '/img/forward.svg'} alt="" width="10" />
                        </ListGroup.Item>)}
                    </ListGroup>
                </Card.Body>
            </Card>
        );
    }
}