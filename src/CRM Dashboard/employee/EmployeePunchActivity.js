import React, { useState, useEffect } from "react";
import { Base } from "../components/Base";
import {
  Breadcrumbs,
  Link,
  TextField,
  Button,
  MenuItem,
  Select,
  Pagination,
  Stack,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useAxios from "../auth/useAxios";
import { API_BASE_URL } from "../auth/Api";
import * as XLSX from "xlsx";
import "../styles/table.css";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

// Function to format time to "hh:mm AM/PM"
const formatTime = (time) => {
  if (!time) return "N/A";
  const [hours, minutes] = time.split(":").map(Number);
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};

export const EmployeePunchActivity = () => {
  const [punch, setPunch] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const api = useAxios();

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const response = await api.get(`${API_BASE_URL}/crm/admin/punch/all`);
      setPunch(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllEmployees = async () => {
    try {
      const response = await api.get(`${API_BASE_URL}/crm/admin/crm/employees`);
      setEmployees(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleExportToExcel = () => {
    const excelData = getExcelData();
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Punch Activities");
    XLSX.writeFile(workbook, "PunchActivities.xlsx");
  };

  // Sort punch data by date (descending)
  const getFilteredPunchData = () => {
    return punch
      .filter((p) => {
        const punchDate = new Date(p.date);
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;
        return (
          (!selectedEmployee || p.crmEmployee.fullName === selectedEmployee) &&
          (!from || punchDate >= from) &&
          (!to || punchDate <= to)
        );
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Descending by date
  };

  // Paginate table data
  const getTableData = () => {
    const sortedData = getFilteredPunchData();
    const startIdx = (page - 1) * rowsPerPage;
    const paginatedData = sortedData.slice(startIdx, startIdx + rowsPerPage);
    return paginatedData.map((p, index) => ({
      "S.No": startIdx + index + 1,
      "Employee Name": p.crmEmployee.fullName || "N/A",
      Date: p.date,
      "Punch-in Time": formatTime(p.timeOfPunchIn),
      "Punch-out Time": formatTime(p.timeOfPunchOut),
      "Login Time": p.workedHours || "N/A",
      "Work Report": p.workReport || "N/A",
      punchInImage: p.punchInImagePath,
      punchOutImage: p.punchOutImagePath,
      "id": p.id,
    }));
  };

  const getExcelData = () => {
    return getFilteredPunchData().map((p, index) => ({
      "S.No": index + 1,
      "Employee Name": p.crmEmployee.fullName || "N/A",
      Date: p.date,
      "Punch-in Time": formatTime(p.timeOfPunchIn),
      "Punch-out Time": formatTime(p.timeOfPunchOut),
      "Login Time": p.workedHours || "N/A",
      "Work Report": p.workReport || "N/A",
      "Punch-in Image": p.punchInImage ? "Image" : "N/A",
      "Punch-out Image": p.punchOutImage ? "Image" : "N/A",
      
    }));
  };

  useEffect(() => {
    fetchEmployee();
    fetchAllEmployees();
  }, []);

  const filteredPunch = getTableData();
  const navigate = useNavigate();
  const handleEditPunchActivity = (id) => {
    navigate(`/update-punch/${id}`);
  };

  // For pagination controls
  const totalRows = getFilteredPunchData().length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  return (
    <div>
      <Base>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div
              className="pt-3 mt-5"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: "20px",
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
                
              </Breadcrumbs>
            </div>

            <h2
              className="text-center fw-bold pt-3"
              style={{ color: "darkslategrey" }}
            >
              Employee Punch Activities
            </h2>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <hr style={{ width: "90%" }} />
            </div>

            {/* Filters */}
            <div className="container mb-3">
              <div className="row">
                <div className="col-md-4">
                  <Select
                    fullWidth
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="">All Employees</MenuItem>
                    {employees.map((emp) => (
                      <MenuItem key={emp.id} value={emp.fullName}>
                        {emp.fullName}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="col-md-4">
                  <TextField
                    fullWidth
                    type="date"
                    label="From Date"
                    InputLabelProps={{ shrink: true }}
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <TextField
                    fullWidth
                    type="date"
                    label="To Date"
                    InputLabelProps={{ shrink: true }}
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 p-3 d-flex justify-content-end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleExportToExcel}
                  sx={{ borderRadius: 2, fontWeight: "bold" }}
                >
                  Export to Excel
                </Button>
              </div>
            </div>

            {/* Punch Activity Table */}
            <div className="container">
              <div className="table-responsive shadow rounded">
                <table className="table table-hover align-middle">
                  <thead
                    className="text-white text-center"
                    style={{
                      background: "linear-gradient(90deg, #2C2F33 60%, #23272A 100%)",
                      fontSize: "1rem",
                      letterSpacing: "0.03em",
                    }}
                  >
                    <tr>
                      <th>S.No</th>
                      <th>Employee Name</th>
                      <th>Date</th>
                      <th>Punch-in Time</th>
                      <th>Punch-in Image</th>
                      <th>Punch-out Time</th>
                      <th>Punch-out Image</th>
                      <th>Login Time (hrs:mins)</th>
                      <th>Work Report</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPunch.length > 0 ? (
                      filteredPunch.map((p, index) => (
                        <tr key={index} className="text-center">
                          <td>{p["S.No"]}</td>
                          <td>{p["Employee Name"]}</td>
                          <td>{p.Date}</td>
                          <td>{p["Punch-in Time"]}</td>
                          <td>
                            {p.punchInImage ? (
                              <img
                                src={p["punchInImage"]}
                                alt="Punch-in"
                                style={{
                                  width: "45px",
                                  height: "45px",
                                  borderRadius: "8px",
                                  border: "1px solid #ddd",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <span className="text-muted">No Image</span>
                            )}
                          </td>
                          <td>{p["Punch-out Time"]}</td>
                          <td>
                            {p.punchOutImage ? (
                              <img
                                src={p["punchOutImage"]}
                                alt="Punch-out"
                                style={{
                                  width: "45px",
                                  height: "45px",
                                  borderRadius: "8px",
                                  border: "1px solid #ddd",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <span className="text-muted">No Image</span>
                            )}
                          </td>
                          <td>{p["Login Time"]}</td>
                          <td>
                            <span
                              style={{
                                display: "inline-block",
                                maxWidth: "120px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                              title={p["Work Report"]}
                            >
                              {p["Work Report"]}
                            </span>
                          </td>
                          <td>
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              startIcon={<EditIcon />}
                              onClick={() => handleEditPunchActivity(p["id"])}
                              sx={{ borderRadius: 2, fontWeight: "bold" }}
                            >
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10" className="text-center text-muted">
                          No records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <Stack spacing={2} alignItems="center" sx={{ mt: 3 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    color="primary"
                    shape="rounded"
                    size="large"
                    showFirstButton
                    showLastButton
                  />
                </Stack>
              )}
            </div>
          </>
        )}
      </Base>
    </div>
  );
};
