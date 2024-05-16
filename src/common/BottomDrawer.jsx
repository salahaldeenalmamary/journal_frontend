import React, { useState, useEffect, useRef } from 'react';

import { Button, Drawer, Radio, Space, Card, Menu, Layout } from 'antd';
import { BsFilter, BsMenuApp } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenpandel } from '../store/UI/homefiltersSlice';
const { Sider, Content } = Layout;


export const BottomDrawer = ({ children, ...rest }) => {
  const Openpandel = useSelector((state) => state.UIS.homefilters.Openpandel);
  const dispatch = useDispatch();


  const [placement] = useState('bottom');
  const drawerRef = useRef(null);
  const [drawerHeight, setDrawerHeight] = useState('auto');
  const screenHeight = window.screen.height;

  useEffect(() => {
    if (drawerRef?.current && Openpandel) {
      const childrenHeight = drawerRef.current.children[0].offsetHeight;
      setDrawerHeight(childrenHeight > screenHeight ? screenHeight : childrenHeight);
    }
  }, [ drawerRef.current,Openpandel, screenHeight, children]);

  const showDrawer = () => {

    dispatch(setOpenpandel(true));
  };


  const onClose = () => {
    dispatch(setOpenpandel(false));
    drawerRef.current = null;
  };

  return (
    <>
      <Button icon={<BsFilter />} type="primary" onClick={showDrawer}>

      </Button>
      <Drawer
        {...rest}
        size="small"
        placement={placement}

        onClose={onClose}
        visible={Openpandel}
        style={{ zIndex: 999, margin: 0 }}
        height={drawerHeight}
        headerStyle={{ margin: 0, overflow: 'hidden', clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0% 85%)' }}
        bodyStyle={{ padding: '2px', maxHeight: screenHeight-40}}
        closeIcon={<BsFilter />}
        maskClosable={false}



        ref={drawerRef}
      >

        <div style={{ overflow: 'auto',  maxHeight: screenHeight-40 }}>
          {children}

        </div>
      </Drawer>
    </>
  );
};

export const Drawers = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [placement] = useState('left');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Assuming 768px as mobile breakpoint
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize); // Listen to window resize event

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      {isMobile ? (<><Button icon={<BsMenuApp></BsMenuApp>} type="primary" onClick={showDrawer}>

      </Button>


        <Drawer
          size='small'
          placement={placement}
          rootStyle={{ zIndex: 999, margin: 0, overflow: 'hidden' }}
          styles={{ zIndex: 999, margin: 0, overflow: 'hidden' }}
          style={{ zIndex: 999, margin: 0, overflow: 'hidden' }}
          headerStyle={{ zIndex: 999, margin: 0, overflow: 'hidden' }}

          closeIcon={<BsFilter />}



          onClose={onClose}
          visible={open}

        // footer={
        //   <Space>
        //     <Button onClick={onClose}>Cancel</Button>
        //     <Button type="primary" onClick={onClose}>
        //       OK
        //     </Button>
        //   </Space>
        // }




        >
          {children}
        </Drawer></>) : children}

    </>
  );
};

