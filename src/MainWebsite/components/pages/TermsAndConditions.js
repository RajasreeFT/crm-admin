import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaBalanceScale, FaExclamationTriangle, FaUserEdit, FaTags } from "react-icons/fa";
import './terms.css'
import Footer from "./Footer";
import Header from "./Header";

const TermsAndConditions = () => {
  return (
    <>
    <Header/>
    <Container className="terms-conditions py-5">
      <Row className="justify-content-center">
        <Col lg={10} className="text-center mb-5">
          <h1 className="display-5 fw-bold mb-3">Terms and Conditions</h1>
          <div className="divider mx-auto"></div>
          <p className="lead mt-3">
            Please read these terms carefully before using our website
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={8}>
          <div className="terms-content p-4 p-lg-5">
            <div className="alert alert-info mb-5">
              <p className="mb-0">
                Visitors to this website are bound by the following terms and conditions ("terms"). 
                By using this site, you agree to these terms. Please check back regularly for updates.
              </p>
            </div>

            <div className="term-item mb-5">
              <div className="term-header d-flex align-items-center mb-3">
                <div className="term-icon me-3">
                  <FaBalanceScale className="text-white" size={24} color="white"/>
                </div>
                <h3 className="mb-0">1. Website Content</h3>
              </div>
              <div className="term-body ps-5">
                <p>
                  The information on this website is for general reference only and may change without prior notice.
                </p>
              </div>
            </div>

            <div className="term-item mb-5">
              <div className="term-header d-flex align-items-center mb-3">
                <div className="term-icon me-3">
                  <FaExclamationTriangle className="text-white" size={24} />
                </div>
                <h3 className="mb-0">2. Accuracy of Information</h3>
              </div>
              <div className="term-body ps-5">
                <p>
                  We do our best to provide accurate and up-to-date information, but we are not responsible for any 
                  errors, outdated details, or missing information. Do not rely solely on this site for important 
                  decisions—always verify details from trusted sources.
                </p>
              </div>
            </div>

            <div className="term-item mb-5">
              <div className="term-header d-flex align-items-center mb-3">
                <div className="term-icon me-3">
                  <FaUserEdit className="text-white" size={24} />
                </div>
                <h3 className="mb-0">3. User Registration</h3>
              </div>
              <div className="term-body ps-5">
                <p>
                  Users can register on our digital platforms to access certain services. Any future changes to these
                  services will be updated in the terms and communicated to registered users via email.
                </p>
              </div>
            </div>

            <div className="term-item mb-5">
              <div className="term-header d-flex align-items-center mb-3">
                <div className="term-icon me-3">
                  <FaTags className="text-white" size={24} />
                </div>
                <h3 className="mb-0">4. Product Prices & Service Changes</h3>
              </div>
              <div className="term-body ps-5">
                <p>
                  Prices may change without prior notice. We also reserve the right to modify or discontinue any 
                  service at any time without liability. We are not responsible for any inconvenience caused due 
                  to price changes, service suspensions, or discontinuation.
                </p>
              </div>
            </div>

            <div className="last-updated mt-5 pt-4 border-top">
              <p className="text-muted small">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    <Footer/>
    </>
  );
};

export default TermsAndConditions;