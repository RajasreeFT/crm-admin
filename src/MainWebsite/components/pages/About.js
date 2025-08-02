import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

import pic from "../Images/pic.jpg";
import pic1 from "../Images/pic1.jpg";

const About = () => {
  return (
    <div id="about">
      <Container className="ideology px-3 p-2">
        <hr className="hrLine" />
        <h2 className="text-center fw-bold">
          IDEOLOGY AT <span className="ventureTitle">RAJASREE TOWNSHIPS</span>
        </h2>
        <i>
          <p className="ideology-text text-center">
            Rajasree township has completed a decade of successful service. We
            aim to contribute to the development of upcoming cities and
            therefore work assiduously on every project we undertake. Our
            primary objective is to provide visionary world-class ventures in
            vibrant, sustainable, and eco-friendly landscapes with lush greenery
            and a pleasant climate. The projects are structured around
            high-growth, high-return developments where low-cost investments are
            transformed to offer potential returns of up to 200% in the future
            and consequently address the diverse needs of all communities to
            ensure affordability. In response to the evolving technology today,
            we offer digital services designed to ensure seamless access to our
            schemes for all users, thereby making it easy for anyone who wants
            to join our ventures. Land has value, and value is insurance
          </p>

          
        </i>
        <hr className="hrLine" />
      </Container>
      <Container>
        <Row className="management d-flex align-items-center justify-content-center">
          {/* Image First on Desktop, Second on Mobile */}
          <Col
            md={6}
            className="management-pic d-flex align-items-center justify-content-center"
          >
            <Image src={pic} className="about-img img-fluid" alt="Director" />
          </Col>
          <Col
            md={6}
            className="management-text order-md-2 order-1 text-center d-flex flex-column align-items-center justify-content-center"
          >
            <h2>
              <span className="text-danger fw-bold">VSVL Narayana</span>
            </h2>
            <span className="text-success fw-bold d-block mb-3">
              Director – Rajasree Townships
            </span>
            <p className="intro pt-3 ">
              Rajasree township has completed a decade of successful service. We
              aim to contribute to the development of upcoming cities and
              therefore work assiduously on every project we undertake. Our
              primary objective is to provide visionary world-class ventures in
              vibrant, sustainable, and eco-friendly landscapes with lush
              greenery and a pleasant climate. The projects are structured
              around high-growth, high-return developments where low-cost
              investments are transformed to offer potential returns of up to
              200% in the future and consequently address the diverse needs of
              all communities to ensure affordability. In response to the
              evolving technology today, we offer digital services designed to
              ensure seamless access to our schemes for all users, thereby
              making it easy for anyone who wants to join our ventures. Land has
              value, and value is insurance
            </p>
            
          </Col>
        </Row>

        <Row className="management d-flex align-items-center justify-content-center">
          {/* Image Second on Desktop, First on Mobile */}
          <Col
            md={6}
            className="management-pic order-md-2 order-1 d-flex align-items-center justify-content-center"
          >
            <Image
              src={pic1}
              className="about-img img-fluid"
              alt="Co-Director"
            />
          </Col>
          <Col
            md={6}
            className="management-text order-md-1 order-2 text-center d-flex flex-column align-items-center justify-content-center p-4"
          >
            <h2>
              <span className="text-danger fw-bold">N.V. Satyanarayana</span>
            </h2>
            <span className="text-success fw-bold d-block mb-3">
              Co-Director – Rajasree Townships
            </span>
            <p className="intro pt-3">
              It gives me great pleasure to share a few words on behalf of
              Rajasree Townships, where we believe in turning dreams into
              lasting realities. Our team is driven by a shared vision — to
              offer genuine land investment opportunities that bring peace of
              mind and a sense of accomplishment to every individual we serve.
              We are not just selling plots; we are helping people take a step
              toward financial freedom and a secure future for their children.
            </p>
            <p className="intro pt-3">
              At Rajasree, we uphold the values of integrity, commitment, and
              customer-first thinking. These values are reflected in every
              decision we make and every project we develop. Our success lies in
              the satisfaction of our customers, and we strive each day to
              exceed their expectations. I welcome you to explore our ventures
              and become a part of our growing community. Together, let’s build
              a future rooted in trust and prosperity.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
