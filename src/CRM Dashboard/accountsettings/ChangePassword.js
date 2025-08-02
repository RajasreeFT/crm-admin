import React, { useState } from "react";
import { Base } from "../components/Base";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import Swal from "sweetalert2";
import useAxios from "../auth/useAxios";
import { API_BASE_URL } from "../auth/Api";
import CircularProgress from "@mui/material/CircularProgress";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment, TextField } from "@mui/material";

export const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [errors, setErrors] = useState({});
  const api = useAxios();

  const validate = () => {
    const newErrors = {};
    
    if (!passwords.oldPassword) newErrors.oldPassword = "Old password is required";
    if (!passwords.newPassword) newErrors.newPassword = "New password is required";
    if (!passwords.confirmPassword) newErrors.confirmPassword = "Confirm password is required";
    
    if (passwords.newPassword && passwords.confirmPassword && 
        passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }
    
    if (passwords.oldPassword && passwords.newPassword && 
        passwords.oldPassword === passwords.newPassword) {
      newErrors.newPassword = "New password must be different from old password";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTogglePassword = (field) => {
    setShowPassword((prevState) => ({ ...prevState, [field]: !prevState[field] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setLoading(true);
  
    try {
      // Debug: Log the payload before sending
      console.log("Sending payload:", {
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
        confirmPassword: passwords.confirmPassword
      });

      const response = await api.post(
        `${API_BASE_URL}/crm/admin/change-password`,
        {
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
          confirmPassword: passwords.confirmPassword
        },
        {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        }
      );

      console.log("Response:", response); // Debug response

      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: response.data || "Password changed successfully",
          icon: "success",
        });
        setPasswords({
          oldPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
      }
    } catch (error) {
      console.error("Error details:", error); // Detailed error logging
      
      let errorMessage = "An error occurred while changing the password";
      
      if (error.response) {
        // More detailed error parsing
        if (error.response.data) {
          if (typeof error.response.data === 'string') {
            errorMessage = error.response.data;
          } else if (error.response.data.message) {
            errorMessage = error.response.data.message;
          }
        }
        
        if (error.response.status === 400) {
          errorMessage = errorMessage || "Invalid request. Please check your inputs";
        } else if (error.response.status === 401) {
          errorMessage = "Session expired. Please login again";
        }
      }
      
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Base>
      <div className="pt-3 mt-5" style={{ display: "flex", justifyContent: "flex-end", paddingRight: "20px" }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link underline="hover" key="1" color="inherit" href="/dashboard" sx={{ color: "darkslategrey", fontWeight: "bold" }}>Home</Link>
          <Link underline="hover" key="2" color="inherit" href="/change-password" sx={{ color: "darkslategrey", fontWeight: "bold" }}>Change Password</Link>
        </Breadcrumbs>
      </div>

      <div className="pt-5">
        <h2 className="text-center fw-bold" style={{ color: "darkslategrey" }}>Change Password</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <hr style={{ width: "90%" }} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ padding: "0 20px" }}>
            
            {/* Old Password Field */}
            <div className="row pb-3">
              <div className="col-sm-3" style={{ display: "flex", justifyContent: "center" }}>
                <label htmlFor="oldPassword" className="col-sm-6 col-form-label fw-bold">Old Password*</label>
              </div>
              <div className="col-sm-8">
                <TextField
                  fullWidth
                  name="oldPassword"
                  type={showPassword.old ? "text" : "password"}
                  value={passwords.oldPassword}
                  onChange={handleChange}
                  required
                  error={!!errors.oldPassword}
                  helperText={errors.oldPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => handleTogglePassword("old")} edge="end">
                          {showPassword.old ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>

            {/* New Password Field */}
            <div className="row pb-3">
              <div className="col-sm-3" style={{ display: "flex", justifyContent: "center" }}>
                <label htmlFor="newPassword" className="col-sm-6 col-form-label fw-bold">New Password*</label>
              </div>
              <div className="col-sm-8">
                <TextField
                  fullWidth
                  name="newPassword"
                  type={showPassword.new ? "text" : "password"}
                  value={passwords.newPassword}
                  onChange={handleChange}
                  required
                  error={!!errors.newPassword}
                  helperText={errors.newPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => handleTogglePassword("new")} edge="end">
                          {showPassword.new ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="row pb-3">
              <div className="col-sm-3" style={{ display: "flex", justifyContent: "center" }}>
                <label htmlFor="confirmPassword" className="col-sm-6 col-form-label fw-bold">Confirm Password*</label>
              </div>
              <div className="col-sm-8">
                <TextField
                  fullWidth
                  name="confirmPassword"
                  type={showPassword.confirm ? "text" : "password"}
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                  required
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => handleTogglePassword("confirm")} edge="end">
                          {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <hr style={{ width: "90%" }} />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "darkslategray",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} style={{ color: "white" }} /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </Base>
  );
};