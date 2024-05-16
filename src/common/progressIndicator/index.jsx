import React from "react";
import PropTypes from "prop-types";

const ProgressIndicator = ({ segments }) => {
  return (
    <div className="progress-stacked">
      {segments.map((segment) => (
        <div
          key={segment.label + segment.size}
          className="progress"
          role="progressbar"
          aria-label={segment.label}
          aria-valuenow={segment.size}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: segment.size + "%" }}
        >
          <div className={`progress-bar bg-${segment.color}`}></div>
        </div>
      ))}
    </div>
  );
};
ProgressIndicator.propTypes = {
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      size: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      label: PropTypes.string.isRequired,
      color: PropTypes.oneOf([
        "secondary",
        "warning",
        "success",
        "info",
        "primary",
        "danger",
        "light",
        "dark",
        "white",
        "black",
      ]).isRequired,
    })
  ),
};
export default ProgressIndicator;
