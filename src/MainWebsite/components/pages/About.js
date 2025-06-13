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
            At Rajasree Townships, we believe that land is more than just an
            asset — it's a legacy. With a strong foundation built on trust,
            transparency, and customer satisfaction, we’ve grown to become a
            renowned real estate organization serving the states of Telangana
            and Andhra Pradesh.
          </p>
          <p className="ideology-text text-center">
            Specializing in open plots and farmland ventures, we are dedicated
            to helping individuals and families secure their dream investment
            with confidence. Whether you're looking to build your future home,
            expand your land portfolio, or embrace nature through serene
            farmland, Rajasree Townships offers you the perfect opportunity to
            grow. With less price and immense potential to grow
          </p>
          <p className="ideology-text text-center">
            With years of industry experience and a deep understanding of market
            trends, we carefully select prime locations with immense potential
            for appreciation, development, and peace of living. Every project we
            undertake is legally compliant, HMDA/DTCP-approved (where
            applicable), and backed by clear documentation, ensuring a smooth
            and secure ownership experience for our clients.
          </p>
          <p className="ideology-text text-center">
            Our team is passionate about turning your real estate goals into a
            reality. We walk every step with you — from site visits to
            registration — ensuring personalized support and honest guidance
            throughout the process. Join the growing community of happy clients
            who trust Rajasree Townships for their land investments. Because
            when you invest with us, you don’t just buy a plot — you build your
            future.
          </p>
          <Container
            fluid
            style={{
              background: "#5cb874",
              padding: "2rem 0",
              margin: "3rem 0",
              borderTop: "1px solid rgba(245, 84, 10, 0.1)",
              borderBottom: "1px solid rgba(192, 102, 12, 0.1)",
              borderRadius: "50px",
            }}
          >
            <Container className="text-center">
              <h2
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 300,
                  letterSpacing: "1px",
                  marginBottom: "1.5rem",
                  color: "white",
                  position: "relative",
                  display: "inline-block",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "1rem",
                    fontWeight: 600,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "tomato",
                    marginBottom: "0.5rem",
                  }}
                >
                  Rajasree Townships
                </span>
                Where your dreams take root
                <div
                  style={{
                    position: "absolute",
                    bottom: "-10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "80px",
                    height: "3px",
                    background: "tomato",
                  }}
                ></div>
              </h2>

              <p
                className="mt-4"
                style={{
                  maxWidth: "600px",
                  margin: "0 auto",
                  fontSize: "1.5rem",
                  lineHeight: "2",
                  color: "white",
                }}
              >
                Invest and wait, Dont wait and invest
              </p>
            </Container>
          </Container>
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
              At Rajasree Townships, our mission is deeply rooted in empowering
              people through meaningful land ownership. We understand that
              investing in real estate is not just a financial decision — it's
              an emotional one that shapes generations to come. Since the
              inception of our journey, we've been committed to offering open
              plots and farmlands that reflect value, trust, and future growth.
              Each project is carefully crafted with a focus on legal clarity,
              prime locations, and the potential for long-term appreciation and easy buy system.
            </p>
            <p className="intro pt-3 ">
              As the Director of this organization, I take immense pride in our
              transparent dealings, customer-centric approach, and relentless
              pursuit of excellence. Our goal is simple — to ensure that every
              client feels confident, secure, and proud of their investment with
              us. I extend my heartfelt gratitude to all our customers,
              partners, and well-wishers who have trusted us and continue to be
              a part of the Rajasree Townships family. Your trust is our
              greatest strength.
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
