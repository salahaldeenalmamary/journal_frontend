
import ProposedReviewer from './ProposedReviewer';
import ReviewerManager from './selectedList';
import EmailFormSend from './EmailFormSend';
import CustomLayout from '../SearchReviewer/layout';
import CustomSidebar from './CustomSidebar';



const ReviewerManagerMain = () => {
 
  return (
    <div>
     
<CustomLayout  CustomSidebar={<CustomSidebar>

  
</CustomSidebar>} >

<ReviewerManager/>
        <br/>
        <br/>
   
   <ProposedReviewer></ProposedReviewer>
  <EmailFormSend></EmailFormSend>

</CustomLayout>
       
   
    </div>
  );
};

export default ReviewerManagerMain;
