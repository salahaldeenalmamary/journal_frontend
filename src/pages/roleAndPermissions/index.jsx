import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  roleModalClosed,
  roleModalShowed,
  permissionModalClosed,
  permissionModalShowed,
} from "../../store/UI/rolesAndPermissions";
import {
  roleAdded,
  roleUpdated,
  roleDeleted,
  permissionAddedToRole,
  permissionDeletedFromAllRoles,
  fetchRoles,
} from "../../store/entities/roles";
import {
  permissionAdded,
  permissionUpdated,
  permissionDeleted,
} from "../../store/entities/permissions";
import TableComponent from "./tableComponent";
import PermissionModal from "./permissionModal";
import RoleModal from "./roleModal";

const Admin = (props, ...res) => {
  const dispatch = useDispatch();
  const { roles, apiRoles } = useSelector((store) => store.entities.Roles);
  const { permissions } = useSelector((store) => store.entities.Permissions);
  const {
    rolesModalState,
    permissionsModalState,
    currentPermission,
    currentRole,
  } = useSelector((store) => store.UIS.RolesAndPermissionsTable);
  const history = useNavigate();
  useEffect(() => {
    dispatch(fetchRoles());
  }, []);
  console.log(apiRoles);
  //roles methods
  const handleRoleModalShow = (role) => {
    dispatch(roleModalShowed(role));
  };
  const handleRoleModalClose = () => {
    dispatch(roleModalClosed());
  };
  const handleRoleSubmit = (role) => {
    if (role.id) dispatch(roleUpdated(role));
    else dispatch(roleAdded(role));

    handleRoleModalClose();
  };
  const handlePermissionCheck = (roleId, permissionId, value) => {
    dispatch(permissionAddedToRole({ roleId, permissionId, value }));
  };
  const handleRoleDelete = (roleId) => {
    dispatch(roleDeleted(roleId));
  };
  //permissions methods
  const handlePermissionModalShow = (permission) => {
    dispatch(permissionModalShowed(permission));
  };
  const handlePermissionModalClose = () => {
    dispatch(permissionModalClosed());
  };
  const handlePermissionSubmit = (permission) => {
    if (permission.id) {
      dispatch(permissionUpdated(permission));
    } else {
      dispatch(permissionAdded(permission));
    }
    handlePermissionModalClose();
  };

  const handlePermissionDelete = (permissionId) => {
    dispatch(permissionDeletedFromAllRoles(permissionId));
    dispatch(permissionDeleted(permissionId));
  };

  return (
    <>
      <Row>
        <Col sm="12">
          <Card>
            <Card.Header className="d-flex justify-content-between flex-wrap">
              <div className="header-title">
                <h4 className="card-title mb-0">Role & Permission</h4>
              </div>
              <div>
                <Button
                  className="btn-primary me-2 mt-lg-0 mt-md-0 mt-3"
                  onClick={() => handlePermissionModalShow()}
                >
                  New Permission
                </Button>
                <Button
                  className="btn-primary mt-lg-0 mt-md-0 mt-3"
                  onClick={() => handleRoleModalShow()}
                >
                  New Role
                </Button>
                <PermissionModal
                  onClose={handlePermissionModalClose}
                  onSubmit={handlePermissionSubmit}
                  permission={currentPermission}
                  show={permissionsModalState}
                />
                <RoleModal
                  onClose={handleRoleModalClose}
                  onSubmit={handleRoleSubmit}
                  role={currentRole}
                  show={rolesModalState}
                />
              </div>
            </Card.Header>
            <Card.Body>
              <TableComponent
                roles={roles}
                permissions={permissions}
                onEditPermission={handlePermissionModalShow}
                onEditRole={handleRoleModalShow}
                onPermissionCheck={handlePermissionCheck}
                onRoleDelete={handleRoleDelete}
                onPermissionDelete={handlePermissionDelete}
              />
              <Button
                onClick={() => history("/author")}
                variant="primary"
                className="float-end btn-lg"
              >
                Save
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default Admin;
