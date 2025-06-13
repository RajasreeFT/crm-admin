import React from "react";
import { FaMapMarkedAlt, FaHandshake, FaSearchDollar, FaUsers, FaLeaf } from "react-icons/fa";

const WhyChooseUs = () => {
  // Color palette
  const colors = {
    primary: "#1a365d",       // Deep blue
    secondary: "#c53030",     // Rich red
    accent: "#2f855a",        // Forest green
    lightBg: "#f7fafc",       // Very light gray
    cardBg: "#ffffff",        // White
    textDark: "#2d3748",      // Dark gray
    textMedium: "#4a5568",    // Medium gray
    textLight: "#718096",     // Light gray
  };

  const features = [
    {
      icon: <FaMapMarkedAlt />,
      title: "Regional Expertise, Unmatched Insight",
      description: "Our deep roots and extensive experience across Telangana and Andhra Pradesh give us unparalleled knowledge of local markets, emerging opportunities, and the unique potential of every plot we offer."
    },
    {
      icon: <FaSearchDollar />,
      title: "Curated Portfolio of Opportunity",
      description: "We meticulously source and present a diverse selection of prime open plots and fertile farmland, focusing on locations with strong growth potential, clear titles, and inherent value."
    },
    {
      icon: <FaHandshake />,
      title: "Commitment to Transparency & Trust",
      description: "Honesty is our cornerstone. We foster long-term relationships built on clear communication, ethical practices, and ensuring every transaction is smooth, secure, and beneficial for our clients."
    },
    {
      icon: <FaUsers />,
      title: "Your Vision, Our Priority",
      description: "We listen. We understand your goals – be it investment, agriculture, or building a personal haven – and strive to match you with land that perfectly aligns with your aspirations."
    },
    {
      icon: <FaLeaf />,
      title: "Building Communities, Nurturing Growth",
      description: "We don't just sell land; we contribute to the development of thriving communities and support the agricultural backbone of the region through thoughtful land utilization."
    }
  ];

  return (
    <section style={{
      padding: "6rem 0",
      backgroundColor: colors.lightBg,
      position: "relative"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 2rem",
        position: "relative"
      }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2 style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: colors.primary,
            marginBottom: "1.5rem",
            lineHeight: "1.2"
          }}>
            Why Choose <span style={{ color: colors.secondary }}>Rajasree Townships</span>?
          </h2>
          <div style={{
            width: "100px",
            height: "4px",
            background: `linear-gradient(90deg, ${colors.secondary}, ${colors.accent})`,
            margin: "0 auto",
            borderRadius: "2px",
            opacity: "0.8"
          }}></div>
          <p style={{
            maxWidth: "700px",
            margin: "2rem auto 0",
            color: colors.textMedium,
            fontSize: "1.1rem",
            lineHeight: "1.6"
          }}>
            Discover the difference that comes with working with a trusted regional leader in land investments.
          </p>
        </div>
        
        {/* Features Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2.5rem",
          position: "relative",
          zIndex: "1"
        }}>
          {features.map((feature, index) => (
            <div key={index} style={{
              background: colors.cardBg,
              borderRadius: "12px",
              padding: "2.5rem 2rem",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)",
              transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
              border: "1px solid rgba(0, 0, 0, 0.03)",
              position: "relative",
              overflow: "hidden",
              ":hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }
            }}>
              {/* Icon Container */}
              <div style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.75rem",
                color: "white",
                fontSize: "1.75rem",
                boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
              }}>
                {feature.icon}
              </div>
              
              {/* Content */}
              <h3 style={{
                fontSize: "1.375rem",
                fontWeight: "600",
                color: colors.primary,
                marginBottom: "1rem",
                lineHeight: "1.3"
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: colors.textMedium,
                lineHeight: "1.7",
                fontSize: "1.05rem",
                margin: 0
              }}>
                {feature.description}
              </p>
              
              {/* Decorative accent */}
              <div style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "100%",
                height: "4px",
                background: `linear-gradient(90deg, ${colors.secondary}, ${colors.accent})`,
                opacity: "0.7"
              }}></div>
            </div>
          ))}
        </div>
        
        {/* Background decorative element */}
        <div style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(197,48,48,0.1) 0%, rgba(255,255,255,0) 70%)`,
          zIndex: "0"
        }}></div>
      </div>
    </section>
  );
};

export default WhyChooseUs;