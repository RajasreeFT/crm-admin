import React, { useEffect, useState } from "react";
import { Base } from "./components/Base";
import { 
  Breadcrumbs, 
  Paper, 
  Typography,
  Box,
  useTheme,
  useMediaQuery
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import { FaUsers, FaUsersSlash, FaChartBar } from "react-icons/fa";
import "./styles/Dashboard.css";
import { Col, Row } from "react-bootstrap";
import useAxios from "./auth/useAxios";
import { ClipLoader } from "react-spinners";
import { API_BASE_URL } from "./auth/Api";
import { useAuth } from "./auth/AuthContext";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts";

export const CrmDashboard = () => {
  const { username } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [graphData, setGraphData] = useState([]);
  const [error, setError] = useState("");
  const api = useAxios();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get(`${API_BASE_URL}/crm/admin/crm/employees`);
        const employeesWithStatus = response.data.map((emp) => ({
          ...emp,
          isActive: emp.active,
        }));

        setEmployees(employeesWithStatus);
        setTotalRecords(employeesWithStatus.length);

        const { active, inactive } = employeesWithStatus.reduce(
          (counts, emp) => {
            if (emp.isActive) {
              counts.active += 1;
            } else {
              counts.inactive += 1;
            }
            return counts;
          },
          { active: 0, inactive: 0 }
        );

        setActiveCount(active);
        setInactiveCount(inactive);
      } catch (err) {
        setError("Error fetching employee data");
      } finally {
        setLoading(false);
      }
    };

    const fetchPunchData = async () => {
      const today = new Date();
      const past7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        return {
          date: date.toISOString().split("T")[0],
          displayDate: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
        };
      }).reverse();

      try {
        const promises = past7Days.map(async (day) => {
          const res = await api.get(`${API_BASE_URL}/crm/admin/punch-activity-info/${day.date}`);
          return {
            ...day,
            punchedInAndOut: res.data.punchedInAndOut || 0,
            punchedInOnly: res.data.punchedInOnly || 0,
            notPunched: totalRecords - (res.data.punchedInAndOut || 0) - (res.data.punchedInOnly || 0)
          };
        });

        const results = await Promise.all(promises);
        setGraphData(results);
      } catch (error) {
        console.error("Error fetching punch data", error);
      }
    };

    fetchEmployees();
    fetchPunchData();
  }, [totalRecords]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Paper elevation={3} sx={{ 
          padding: 2, 
          backgroundColor: 'background.paper',
          borderLeft: `4px solid ${theme.palette.primary.main}`
        }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
            {label}
          </Typography>
          <Typography variant="body2" sx={{ color: '#4caf50' }}>
            Punched In & Out: {data.punchedInAndOut}
          </Typography>
          <Typography variant="body2" sx={{ color: '#f44336' }}>
            Punched In Only: {data.punchedInOnly}
          </Typography>
          <Typography variant="body2" sx={{ color: '#9e9e9e' }}>
            Not Punched: {data.notPunched}
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
            {totalRecords} total employees
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  const StatCard = ({ value, title, icon, color }) => (
    <Paper elevation={3} sx={{ 
      padding: 3, 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[6]
      },
      borderTop: `4px solid ${color}`
    }}>
      <Box sx={{ 
        color: color,
        fontSize: isMobile ? '3rem' : '4rem',
        mb: 2
      }}>
        {icon}
      </Box>
      <Typography variant="h4" sx={{ 
        fontWeight: 'bold',
        color: 'text.primary',
        mb: 1
      }}>
        {value}
      </Typography>
      <Typography variant="h6" sx={{ 
        color: 'text.secondary',
        textAlign: 'center'
      }}>
        {title}
      </Typography>
    </Paper>
  );

  return (
    <Base>
      {loading ? (
        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          height: "calc(100vh - 64px)"
        }}>
          <ClipLoader color={theme.palette.primary.main} size={50} />
        </Box>
      ) : (
        <>
          <Box sx={{ 
            display: "flex", 
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
            backgroundColor: 'background.paper',
            boxShadow: theme.shadows[1],
            mb: 4
          }}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Link underline="hover" color="inherit" href="/dashboard">
                Dashboard
              </Link>
            </Breadcrumbs>
            
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              Last Updated: {new Date().toLocaleString()}
            </Typography>
          </Box>

          <Box sx={{ 
            textAlign: "center", 
            mb: 5,
            px: 2
          }}>
            <Typography variant="h4" sx={{ 
              fontWeight: "bold", 
              color: "primary.main",
              mb: 1
            }}>
              Welcome, {username}!
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              Here's your team's activity overview
            </Typography>
          </Box>

          <Box sx={{ px: isMobile ? 2 : 4, mb: 5 }}>
            <Row>
              <Col md={4} className="mb-4">
                <StatCard 
                  value={totalRecords} 
                  title="Total Employees" 
                  icon={<FaUsers />} 
                  color={theme.palette.primary.main} 
                />
              </Col>
              <Col md={4} className="mb-4">
                <StatCard 
                  value={activeCount} 
                  title="Active Employees" 
                  icon={<FaUsers style={{ color: '#4caf50' }} />} 
                  color="#4caf50" 
                />
              </Col>
              <Col md={4} className="mb-4">
                <StatCard 
                  value={inactiveCount} 
                  title="Inactive Employees" 
                  icon={<FaUsersSlash style={{ color: '#f44336' }} />} 
                  color="#f44336" 
                />
              </Col>
            </Row>
          </Box>

          <Box sx={{ 
            px: isMobile ? 2 : 4, 
            mb: 5,
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: theme.shadows[1],
            p: 3
          }}>
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 3
            }}>
              <Typography variant="h5" sx={{ 
                fontWeight: "bold",
                display: 'flex',
                alignItems: 'center'
              }}>
                <FaChartBar style={{ marginRight: 10, color: theme.palette.primary.main }} />
                Punch Summary (Last 7 Days)
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {graphData[0]?.displayDate} - {graphData[graphData.length - 1]?.displayDate}
              </Typography>
            </Box>
            
            <ResponsiveContainer width="100%" height={isMobile ? 300 : 400}>
              <BarChart 
                data={graphData} 
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis 
                  dataKey="displayDate" 
                  tick={{ fill: theme.palette.text.secondary }}
                />
                <YAxis 
                  allowDecimals={false} 
                  tick={{ fill: theme.palette.text.secondary }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey="punchedInAndOut" 
                  name="Punched In & Out" 
                  fill="#4caf50"
                  radius={[4, 4, 0, 0]}
                >
                  {graphData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#4caf50" />
                  ))}
                </Bar>
                <Bar 
                  dataKey="punchedInOnly" 
                  name="Punched In Only" 
                  fill="#f44336"
                  radius={[4, 4, 0, 0]}
                >
                  {graphData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill="#f44336" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </>
      )}
    </Base>
  );
};