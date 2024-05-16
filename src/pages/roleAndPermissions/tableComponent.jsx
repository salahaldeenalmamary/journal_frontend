import React, { useEffect, useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import Table from "../../common/table/table";
import { Anchor } from "react-bootstrap";

const TableComponent = ({
  roles,
  permissions,
  onEditPermission,
  onEditRole,
  onPermissionCheck,
  onRoleDelete,
  onPermissionDelete,
}) => {
  const [columns, setColumns] = useState([]);
  const handleTableColumns = () => {
    const rolesColumn = {
      key: "color",
      label: "Role Name",
      content: (role) => {
        return (
          <div className="py-2">
            <span className="me-auto">{role.name}</span>
            <div className="float-end">
              <Anchor
                className="icon-link text-primary mx-1"
                data-bs-toggle="tooltip"
                title={`Edit ${role.name}`}
                onClick={() => onEditRole(role)}
              >
                <BsPencilSquare />
              </Anchor>
              <Anchor
                className="icon-link text-danger mx-1"
                data-bs-toggle="tooltip"
                title={`Delete ${role.name}`}
                onClick={() => {
                  onRoleDelete(role.id);
                }}
              >
                <BsTrash />
              </Anchor>
            </div>
          </div>
        );
      },
    };
    const permissionsAsColumns = [
      rolesColumn,
      ...permissions.map((permission) => {
        const col = {
          key: permission.id,
          labelContent: () => {
            return (
              <div className="text-center">
                <span className="mx-auto">{permission.name}</span>
                <div className="float-end">
                  <Anchor
                    className="icon-link text-primary mx-1"
                    data-bs-toggle="tooltip"
                    title={`Edit ${permission.name}`}
                    onClick={() => onEditPermission(permission)}
                  >
                    <BsPencilSquare />
                  </Anchor>
                  <Anchor
                    className="icon-link text-danger mx-1"
                    data-bs-toggle="tooltip"
                    title={`Delete ${permission.name}`}
                    onClick={() => {
                      onPermissionDelete(permission.id);
                    }}
                  >
                    <BsTrash />
                  </Anchor>
                </div>
              </div>
            );
          },
          content: (role) => {
            return (
              <div className="d-flex">
                <input
                  className="form-check-input mx-auto"
                  type="checkbox"
                  checked={role.permissions.includes(permission.id)}
                  onChange={(e) =>
                    onPermissionCheck(role.id, permission.id, e.target.checked)
                  }
                />
              </div>
            );
          },
        };
        return col;
      }),
    ];
    setColumns(permissionsAsColumns);
  };
  useEffect(() => {
    handleTableColumns();
  }, [permissions]);
  return (
    <Table
      striped
      bordered
      className="align-middle"
      columns={columns}
      data={roles}
      onSort={() => {}}
      sortColumn={{ path: "", order: "asc" }}
    />
  );
};

export default TableComponent;
