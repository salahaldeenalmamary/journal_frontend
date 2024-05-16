import { Outlet, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getCurrentUser } from "../../services/authService";

const ProtectedRoutes = ({ redirectTo, isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};
ProtectedRoutes.propTypes = {
  isAuthenticated: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  redirectTo: PropTypes.string,
};
ProtectedRoutes.defaultProps = {
  redirectTo: "/login",
};

export default ProtectedRoutes;
