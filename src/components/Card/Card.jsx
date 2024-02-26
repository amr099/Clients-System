import React from "react";
import { Col } from "react-bootstrap";
import styles from "./Card.module.scss";

export default function Card({ icon, color, title, value }) {
    return (
        <Col lg={3} md={6} xs={12} className='mb-3'>
            {value ? (
                <div className={styles.card}>
                    <div>
                        <h5>{value}</h5>
                        <span>{title} </span>
                    </div>
                    <i className={icon} style={{ color: color }}></i>
                </div>
            ) : (
                <div className={styles?.skeleton}>
                    <div>
                        <h5></h5>
                        <span></span>
                    </div>
                    <i></i>
                </div>
            )}
        </Col>
    );
}
