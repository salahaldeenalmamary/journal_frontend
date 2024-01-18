
import ProposedReviewer from './ProposedReviewer';
import ReviewerManager from './selectedList';
import EmailFormSend from './EmailFormSend';
import CustomLayout from '../SearchReviewer/layout';
import CustomSidebar from './CustomSidebar';
import { BsDownload, BsShare } from "react-icons/bs";

import SearchReviewerTable from './SelectTable';


const ReviewerManagerMain = () => {
 
  return (
    <div>
     
<CustomLayout  CustomSidebar={<CustomSidebar>

  
</CustomSidebar>} >

<ReviewerManager/>
        <br/>
        <br/>
  
   <ProposedReviewer></ProposedReviewer>

<SearchReviewerTable></SearchReviewerTable>
</CustomLayout>
       
   
    </div>
  );
};

export default ReviewerManagerMain;




