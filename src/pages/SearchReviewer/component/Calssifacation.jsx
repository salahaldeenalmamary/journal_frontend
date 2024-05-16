import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClassifications } from '../../../store/entities/classification';
import TreeTransfer from '../../../common/TreeTransfer';
import { targetKeysUpdated } from '../../../store/UI/searchReviewers';
import { Link , useNavigate} from "react-router-dom";
import {  Button, Space, Row } from 'antd';
import {  SaveOutlined, FastBackwardFilled } from '@ant-design/icons';
const ClassificationsSelected = () => {
    const { targetKeys } = useSelector((store) => store.UIS.SearchReviewers);
    const dispatch = useDispatch();
    const history=useNavigate();
    const classifications = useSelector((state) => state.entities.classifications.classifications);
    const loading = useSelector((state) => state.entities.classifications.loading);
    const error = useSelector((state) => state.entities.classifications.error);

    const onChange = (keys) => {
        dispatch(targetKeysUpdated(keys));
    };

    useEffect(() => {
        dispatch(fetchClassifications());
    }, [dispatch]);

    const handleSave = () => {
   window.close();
      history("/main/selectedreviewertable/string");
    };

    return (
        <div>
            <h1>Classifications</h1>
            <TreeTransfer
                dataSource={classifications}
                targetKeys={targetKeys}
                onChange={onChange}
            />
            <Row><Space>
                    <Button icon={< FastBackwardFilled />} >
                        Cancell process
                    </Button>

                </Space> <Space>
                        <Button icon={<SaveOutlined /> } onClick={handleSave} >
                            Save
                        </Button>

                    </Space></Row>
        </div>
    );
};

export default ClassificationsSelected;
