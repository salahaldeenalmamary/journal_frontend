import React, { useState,useEffect } from "react";
import { Card,List, Checkbox, Button, Row, Col } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { getReviewerClassification } from "../../store/entities/editorreviewerSlice";
import { useNavigate } from "react-router-dom";
import { targetKeysUpdated } from "../../store/UI/searchReviewers";
const ClassificationListContent = ({ classifications, onSearch }) => {
  const [selectedClassifications, setSelectedClassifications] = useState([]);

  const handleCheckboxChange = (classification) => {
    
    setSelectedClassifications((prevSelected) => {
      if (prevSelected.includes(classification)) {
        return prevSelected.filter((item) => item !== classification);
      } else {
        return [...prevSelected, classification];
      }
    });
  };

  const handleSearch = () => {
    console.log(selectedClassifications);
    onSearch(selectedClassifications);
  };

  return (


<Card >
          <List size="small">
            {classifications.map((classification, index) => (
              <List.Item key={index}  justify="space-around" >
                <Row justify="space-around"  >
                  <Col >
                    <Checkbox 
                      type="checkbox"
                      id={`classification-${index}`}
                    
                      checked={selectedClassifications.includes(
                        classification.id
                      )}
                      onChange={() => handleCheckboxChange(classification.id)}
                    >{classification.name}</Checkbox>
                  </Col>
                  {`(${classification.total} reviews)`}
                </Row>
              </List.Item>
            ))}
          </List>
        


      <Row className="mt-3">
        <Col className="text-center">
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </Col>
      </Row>
      </Card>
   
  );
};

const ClassificationList = ({submissionId}) => {
  const { selectedRows, loading , reviewerClassificationData} = useSelector(state => state.entities.SelectedReviwer);
  const { targetKeys } = useSelector((store) => store.UIS.SearchReviewers);
  const dispatch = useDispatch();
  const history=useNavigate();
 
  const handleSearch = (selectedClassifications) => {
    dispatch(targetKeysUpdated(selectedClassifications));
    history("/main/selectedreviewertable/"+submissionId);

  };
  useEffect(() => {
    dispatch(getReviewerClassification());
  console.log(reviewerClassificationData);
      }, [dispatch]);
  return (
    <div>
      <ClassificationListContent loading={loading}
        classifications={reviewerClassificationData}

        onSearch={handleSearch}
      />
    </div>
  );
};

export default ClassificationList;
