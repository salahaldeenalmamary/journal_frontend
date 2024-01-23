
import CustomLayout from "./layout";
import CustomSidebar from "./CustomSidebar";

// Routes.js
import React from "react";


import SectionPolicyManagement from "./SectionPolicy/SectionPolicyManagement";

import SectionPolicyOfSectionsManagement from "./SectionPolicyOfSections/SectionPolicyOfSectionsManagement";
import CategoryManagement from "./Category/CategoryManagement";
import StageManagement from "./Stage/StageManagement";


const MainAdmin = () => {
  const handleKeywordSearch = (keyword) => {
   
    console.log('Searching for keyword:', keyword);
  };
  return (
    <div>
      <CustomLayout CustomSidebar={
        <CustomSidebar></CustomSidebar>
      }
      >
<SectionPolicyManagement></SectionPolicyManagement>
<SectionPolicyOfSectionsManagement sectionPolicyOfSections={[]}></SectionPolicyOfSectionsManagement>
<CategoryManagement></CategoryManagement>

<StageManagement></StageManagement>
      </CustomLayout>


    </div>
  );
};

export default MainAdmin;