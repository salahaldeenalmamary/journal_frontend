
import React, { useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCategories, createCategory, updateCategory, deleteCategory }  from '../../../redux/Category/categoriesSlice';

import { Button, Modal } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import CategoryTable from './CategoryTable';
import AddCategoryForm from './AddCategoryForm';
import CategoryForm from './CategoryForm';

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {

    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAdd = async (newCategory) => {
    
    await dispatch(createCategory(newCategory));
  };

  const handleDelete = async (id) => {
   
    await dispatch(deleteCategory(id));
  };

  const handleUpdate = (category) => {
    setSelectedCategory(category);
    setShowDialog(true);
  };

  const handleEditSubmit = async (updatedCategory) => {
    
    await dispatch(updateCategory({ id: updatedCategory.id, categoryData: updatedCategory }));
    setShowDialog(false);
  };

  return (
    <>
      <AddCategoryForm onSubmit={handleAdd} />

      <CategoryTable categories={categories} onDelete={handleDelete} onUpdate={handleUpdate} />

      <Modal show={showDialog} onHide={() => setShowDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCategory ? 'Edit' : 'Add'} Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoryForm  category={selectedCategory} onSubmit={handleEditSubmit} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CategoryManagement;

