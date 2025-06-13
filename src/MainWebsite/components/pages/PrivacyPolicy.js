import React from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import { 
  FaUserShield, 
  FaInfoCircle, 
  FaChartLine, 
  FaShieldAlt,
  FaExchangeAlt,
  FaChild,
  FaEnvelope
} from "react-icons/fa";
import './policy.css'

const PrivacyPolicy = () => {
  return (
    <Container className="privacy-policy py-5">
      <Row className="justify-content-center mb-5">
        <Col lg={10} className="text-center">
          <h1 className="display-5 fw-bold mb-3">
            <FaUserShield className="me-3" />
            Privacy Policy
          </h1>
          <div className="divider mx-auto"></div>
          <p className="lead mt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={8}>
          <div className="policy-content p-4 p-lg-5 shadow-sm rounded-3 bg-white">
            <section className="mb-5">
              <p className="fw-semibold">
                Welcome to the Rajasree Townships app. This Privacy Policy explains
                how we collect, use and safeguard customers personal information. By
                accessing and using the app, you consent to the terms outlined in this
                policy.
              </p>
            </section>

            <Accordion defaultActiveKey={['0']} alwaysOpen className="mb-5">
              <Accordion.Item eventKey="0" className="mb-3 border-0">
                <Accordion.Header className="bg-light rounded-3">
                  <FaInfoCircle className="me-3 text-primary" />
                  <h3 className="h5 mb-0">Information We Collect</h3>
                </Accordion.Header>
                <Accordion.Body className="pt-4">
                  <h4 className="h5 fw-bold mb-3">Personal Information:</h4>
                  <p className="mb-4">
                    We may collect personal information, including but not limited to:
                  </p>
                  <ul className="list-unstyled mb-4">
                    <li className="d-flex mb-2">
                      <span className="me-2">•</span>
                      <span>Contact Information (name, email address, phone number)</span>
                    </li>
                    <li className="d-flex mb-2">
                      <span className="me-2">•</span>
                      <span>Demographic Information (location, age, preferences)</span>
                    </li>
                    <li className="d-flex mb-2">
                      <span className="me-2">•</span>
                      <span>Property-related Information (interests, preferences, search history)</span>
                    </li>
                    <li className="d-flex mb-2">
                      <span className="me-2">•</span>
                      <span>Account Information (if you create an account on our website)</span>
                    </li>
                  </ul>

                  <h4 className="h5 fw-bold mb-3">Non-Personal Information:</h4>
                  <p className="mb-3">
                    We may also collect non-personal information such as:
                  </p>
                  <ul className="list-unstyled">
                    <li className="d-flex mb-2">
                      <span className="me-2">•</span>
                      <span>Browser type</span>
                    </li>
                    <li className="d-flex mb-2">
                      <span className="me-2">•</span>
                      <span>Device type</span>
                    </li>
                    <li className="d-flex mb-2">
                      <span className="me-2">•</span>
                      <span>IP address</span>
                    </li>
                    <li className="d-flex">
                      <span className="me-2">•</span>
                      <span>Cookies and similar technologies</span>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1" className="mb-3 border-0">
                <Accordion.Header className="bg-light rounded-3">
                  <FaChartLine className="me-3 text-primary" />
                  <h3 className="h5 mb-0">How We Use Your Information</h3>
                </Accordion.Header>
                <Accordion.Body className="pt-4">
                  <p>
                    We may use your information for the following purposes:
                  </p>
                  <ul className="list-unstyled">
                    <li className="d-flex mb-2">
                      <span className="me-2">•</span>
                      <span>To provide and personalize our services</span>
                    </li>
                    <li className="d-flex mb-2">
                      <span className="me-2">•</span>
                      <span>To improve and optimize the app</span>
                    </li>
                    <li className="d-flex mb-2">
                      <span className="me-2">•</span>
                      <span>To communicate with you about our services and promotions</span>
                    </li>
                    <li className="d-flex">
                      <span className="me-2">•</span>
                      <span>To respond to inquiries and provide customer support</span>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2" className="mb-3 border-0">
                <Accordion.Header className="bg-light rounded-3">
                  <FaExchangeAlt className="me-3 text-primary" />
                  <h3 className="h5 mb-0">Information Sharing</h3>
                </Accordion.Header>
                <Accordion.Body className="pt-4">
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information to
                    third parties without your consent, except as described in this Privacy
                    Policy.
                  </p>
                  <p>
                    We may share information with trusted third-party service providers who
                    assist us in operating our website, conducting our business or servicing
                    you. These third parties must agree to keep this information confidential.
                  </p>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3" className="mb-3 border-0">
                <Accordion.Header className="bg-light rounded-3">
                  <FaChild className="me-3 text-primary" />
                  <h3 className="h5 mb-0">Children's Privacy</h3>
                </Accordion.Header>
                <Accordion.Body className="pt-4">
                  <p>
                    The app is not intended for children under the age of 18. We do not
                    knowingly collect personal information from children.
                  </p>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="4" className="mb-3 border-0">
                <Accordion.Header className="bg-light rounded-3">
                  <FaShieldAlt className="me-3 text-primary" />
                  <h3 className="h5 mb-0">Changes to this Privacy Policy</h3>
                </Accordion.Header>
                <Accordion.Body className="pt-4">
                  <p>
                    We reserve the right to modify or update this Privacy Policy at any time.
                    Any changes will be effective immediately upon posting on the app.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <section className="contact-section p-4 bg-light rounded-3">
              <div className="d-flex align-items-center">
                <FaEnvelope className="me-3 text-primary" size={24} />
                <div>
                  <h3 className="h5 mb-1">Contact Us</h3>
                  <p className="mb-0">
                    If you have any questions or concerns about this Privacy Policy, please
                    contact us at <a href="mailto:privacy@rajasreetownships.com" className="text-primary">info@rajasreetownships.in</a>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPolicy;