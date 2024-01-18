

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCategories, createCategory, updateCategory, deleteCategory }  from '../../redux/Category/categoriesSlice';

const ExampleComponent = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data);

  useEffect(() => {
    
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCreateCategory = (categoryData) => {
   
    dispatch(createCategory(categoryData));
  };
console.log(categories);
  const handleUpdateCategory = (id, categoryData) => {
  
    dispatch(updateCategory({ id, categoryData }));
  };

  const handleDeleteCategory = (id) => {
    
    dispatch(deleteCategory(id));
  };

  return (
    <div>
   
      {categories.map((category) => (
        <div key={category.id}>
            {category.id}
          {category.name}
          {category.description}
       
        </div>
      ))}
    </div>
  );
};

export default ExampleComponent;
