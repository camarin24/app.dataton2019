import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import './collapse.css'

export default class Collapse extends Component {
    constructor(prop) {
        super(prop);
        this.state = { collapse: true }
    }
    render() {
        return (
            <Card className="collapse-card">
                <Card.Header>Cuentas de ahorros y corriente</Card.Header>
                <Card.Body>This is some text within a card body.</Card.Body>
            </Card>
        );
    }
}