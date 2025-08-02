import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../auth/Api';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '../auth/useAxios';
import { Base } from '../components/Base';
import { Breadcrumbs, Link, Paper, Typography, Box } from '@mui/material';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Button, Spinner, Form, Row, Col } from 'react-bootstrap';

const UpdatePunchActivity = () => {
  const { id } = useParams();
  const [date, setDate] = useState('');
  const [timeOfPunchIn, setTimeOfPunchIn] = useState('');
  const [timeOfPunchOut, setTimeOfPunchOut] = useState('');
  const [punchInImagePath, setPunchInImagePath] = useState(null);
  const [punchOutImagePath, setPunchOutImagePath] = useState(null);
  const [loading, setLoading] = useState(false);
  const api = useAxios();
  const navigation = useNavigate();

  // Fetch current punch activity data when the component loads
  useEffect(() => {
    const fetchPunchActivity = async () => {
      try {
        const response = await api.get(`${API_BASE_URL}/crm/admin/punch/${id}`);
        const { date, timeOfPunchIn, timeOfPunchOut, punchInImagePath, punchOutImagePath } = response.data;
        setDate(date);
        setTimeOfPunchIn(timeOfPunchIn);
        setTimeOfPunchOut(timeOfPunchOut);
        setPunchInImagePath(punchInImagePath);
        setPunchOutImagePath(punchOutImagePath);
      } catch (error) {
        console.error('Error fetching punch activity:', error);
      }
    };
    fetchPunchActivity();
  }, [id]);

  // Handle file input change for punch-in or punch-out image
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'punchIn') {
        setPunchInImagePath(file);
      } else {
        setPunchOutImagePath(file);
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('date', date);
    formData.append('timeOfPunchIn', timeOfPunchIn);
    formData.append('timeOfPunchOut', timeOfPunchOut);

    if (punchInImagePath) {
      formData.append('punchInImage', punchInImagePath);
    }
    if (punchOutImagePath) {
      formData.append('punchOutImage', punchOutImagePath);
    }

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.put(
        `${API_BASE_URL}/crm/admin/punch/update/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert('Punch activity updated successfully.');
        navigation('/employees-punch-activity');
      } else {
        alert('Failed to update punch activity.');
      }
    } catch (error) {
      console.error('Error updating punch activity:', error);
      alert('Failed to update punch activity.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Base>
      <Box
        sx={{
          pt: 3,
          mt: 5,
          display: "flex",
          justifyContent: "flex-end",
          pr: 3,
        }}
      >
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            underline="hover"
            color="inherit"
            href="/dashboard"
            sx={{ color: "darkslategrey", fontWeight: "bold" }}
          >
            Home
          </Link>
          <Link
            underline="none"
            color="inherit"
            href="/employees-punch-activity"
            sx={{ color: "darkslategrey", fontWeight: "bold" }}
          >
            Punch Activity
          </Link>
          <Typography color="text.primary" sx={{ fontWeight: "bold" }}>
            Update
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box className="container p-4" sx={{ maxWidth: 600 }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Typography
            variant="h5"
            align="center"
            fontWeight="bold"
            color="primary.dark"
            gutterBottom
          >
            Update Punch Activity
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <hr style={{ width: "90%" }} />
          </Box>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                size="lg"
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="timeOfPunchIn">
                  <Form.Label>Time of Punch In</Form.Label>
                  <Form.Control
                    type="time"
                    value={timeOfPunchIn}
                    onChange={(e) => setTimeOfPunchIn(e.target.value)}
                    required
                    size="lg"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="timeOfPunchOut">
                  <Form.Label>Time of Punch Out</Form.Label>
                  <Form.Control
                    type="time"
                    value={timeOfPunchOut}
                    onChange={(e) => setTimeOfPunchOut(e.target.value)}
                    required
                    size="lg"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="punchInImage">
                  <Form.Label>Punch In Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'punchIn')}
                    size="lg"
                  />
                  {punchInImagePath && typeof punchInImagePath === 'string' && (
                    <Box sx={{ mt: 2, textAlign: "center" }}>
                      <img
                        src={punchInImagePath}
                        alt="Punch In"
                        style={{
                          width: 90,
                          height: 90,
                          objectFit: "cover",
                          borderRadius: 8,
                          border: "1px solid #eee",
                          boxShadow: "0 2px 8px #eee"
                        }}
                      />
                    </Box>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="punchOutImage">
                  <Form.Label>Punch Out Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'punchOut')}
                    size="lg"
                  />
                  {punchOutImagePath && typeof punchOutImagePath === 'string' && (
                    <Box sx={{ mt: 2, textAlign: "center" }}>
                      <img
                        src={punchOutImagePath}
                        alt="Punch Out"
                        style={{
                          width: 90,
                          height: 90,
                          objectFit: "cover",
                          borderRadius: 8,
                          border: "1px solid #eee",
                          boxShadow: "0 2px 8px #eee"
                        }}
                      />
                    </Box>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                style={{ minWidth: 200, fontWeight: "bold", borderRadius: 25 }}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Updating...
                  </>
                ) : (
                  "Update Punch Activity"
                )}
              </Button>
            </Box>
          </Form>
        </Paper>
      </Box>
    </Base>
  );
};

export default UpdatePunchActivity;
