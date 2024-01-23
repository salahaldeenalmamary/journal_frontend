import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import SectionPolicyOfSectionsTable from './SectionPolicyOfSectionsTable';
import AddSectionPolicyOfSectionsForm from './AddSectionPolicyOfSectionsForm';
import {
  fetchSectionPolicyOfSections,
  createSectionPolicyOfSection,

  updateAllSectionPolicyToSection,
} from '../../../redux/SectionPolicyOfSections/sectionPolicyOfSectionsSlice';


const SectionPolicyOfSectionsManagement = () => {
  const dispatch = useDispatch();
  const sectionPolicyOfSections = useSelector((state) => state.sectionPolicyOfSections.data);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState({

    sectionId: 1,
    name: '',
    description: 'string',
  });

  useEffect(() => {
    
    dispatch(fetchSectionPolicyOfSections());
  }, [dispatch]);

  const handleAdd = async () => {
  
    await dispatch(createSectionPolicyOfSection(sectionPolicyOfSectionsFormData));
    setShowDialog(false);
  };

  const handleUpdate = async () => {
 
    await dispatch(updateAllSectionPolicyToSection(selectedItem));
    setShowDialog(false);
  };

  const handleDelete =async (item) => {
    
  };

  return (
    <>
      <Button variant="primary" className="mt-2" onClick={() => setShowDialog(true)}>
        <FaPlus /> Add Section Policy of Sections
      </Button>

      <SectionPolicyOfSectionsTable
        sectionPolicyOfSections={[selectedItem]}
        onDelete={handleDelete}
        onUpdate={() => setShowDialog(true)}
      />

      <Modal show={showDialog} onHide={() => setShowDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedItem ? 'Edit' : 'Add'} Section Policy of Sections</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddSectionPolicyOfSectionsForm
            onSubmit={selectedItem ? handleUpdate : handleAdd}
            sectionPolicyOfSections={sectionPolicyOfSections}
            selectedItem={selectedItem}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SectionPolicyOfSectionsManagement;
