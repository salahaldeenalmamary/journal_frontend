import ProposedReviewer from "./proposedReviewer";
import ReviewerManager from "./selectedList";
import EmailFormSend from "./emailFormSend";

import CustomSidebar from "./customSidebar";

const ReviewerManagerMain = () => {
  return (
    <div>
      <CustomLayout CustomSidebar={<CustomSidebar />}>
        <ReviewerManager />
        <br />
        <br />

        <ProposedReviewer />
        <EmailFormSend />
      </CustomLayout>
    </div>
  );
};

export default ReviewerManagerMain;
