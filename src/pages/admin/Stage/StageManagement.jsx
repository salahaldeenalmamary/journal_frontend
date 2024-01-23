
import React, { useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStages, createStage, updateStage, deleteStage }  from '../../../redux/Stage/stagesSlice';
import { Button, Modal } from 'react-bootstrap';
import StageTable from './StageTable';
import AddStageForm from './AddStageForm';
import StageForm from './StageForm';

const StageManagement = () => {
  const dispatch = useDispatch();
  const Stages = useSelector((state) => state.stages.data);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedStage, setSelectedStage] = useState(null);

  useEffect(() => {
    dispatch(fetchStages());
    console.log('salah');
  }, [dispatch]);
  const handleAdd = async (newStage) => {
    await dispatch(createStage(newStage));
   await dispatch(fetchStages());
  };
  const handleDelete = async (id) => {
   
    await dispatch(deleteStage(id));
  };
  const handleUpdate = (Stage) => {
    setSelectedStage(Stage);
    setShowDialog(true);
  };
  const handleEditSubmit = async (updatedStage) => {
    
    await dispatch(updateStage({ id: updatedStage.id, StageData: updatedStage }));
    
    setShowDialog(false);
    
  };
  return (
    <>
      <AddStageForm onSubmit={handleAdd} />

      <StageTable stages={Stages} onDelete={handleDelete} onUpdate={handleUpdate} />

      <Modal show={showDialog} onHide={() => setShowDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedStage ? 'Edit' : 'Add'} Stage</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StageForm  Stage={selectedStage} onSubmit={handleEditSubmit} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default StageManagement;

