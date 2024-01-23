import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import SectionPolicyTable from './SectionPolicyTable';
import AddSectionPolicyForm from './AddSectionPolicyForm';
import {
  fetchSectionPolicies,
  createSectionPolicy,
  updateSectionPolicy,
  deleteSectionPolicy,
} from '../../../redux/SectionPolicy/sectionPoliciesSlice';

const SectionPolicyManagement = () => {
  const dispatch = useDispatch();
  const sectionPolicies = useSelector((state) => state.sectionPolicies.data);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedSectionPolicy, setSelectedSectionPolicy] = useState(null);

  useEffect(() => {
    // Fetch section policies when the component mounts
    dispatch(fetchSectionPolicies());
  }, [dispatch]);

  const handleAdd = async (newSectionPolicy) => {
    // Dispatch the createSectionPolicy action
    await dispatch(createSectionPolicy(newSectionPolicy));
    setShowDialog(false);
  };

  const handleDelete = async (id) => {
    // Dispatch the deleteSectionPolicy action
    await dispatch(deleteSectionPolicy(id));

    if (selectedSectionPolicy && selectedSectionPolicy.id === id) {
      setSelectedSectionPolicy(null);
    }
  };

  const handleUpdate = (sectionPolicy) => {
    setSelectedSectionPolicy(sectionPolicy);
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setSelectedSectionPolicy(null);
    setShowDialog(false);
  };

  const handleDialogSave = async (updatedSectionPolicy) => {
    // Dispatch the updateSectionPolicy action
    await dispatch(
      updateSectionPolicy({ id: updatedSectionPolicy.id, sectionPolicyData: updatedSectionPolicy })
    );
    handleDialogClose();
  };

  return (
    <>
      <Button variant="primary" className="mt-2" onClick={() => setShowDialog(true)}>
        <FaPlus /> Add SectionPolicy
      </Button>

      <SectionPolicyTable
        sectionPolicies={sectionPolicies}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />

      <Modal show={showDialog} onHide={handleDialogClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedSectionPolicy ? 'Edit SectionPolicy' : 'Add SectionPolicy'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddSectionPolicyForm
            onSubmit={selectedSectionPolicy ? handleDialogSave : handleAdd}
            sectionPolicy={selectedSectionPolicy} // Pass selectedSectionPolicy as a prop
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SectionPolicyManagement;
