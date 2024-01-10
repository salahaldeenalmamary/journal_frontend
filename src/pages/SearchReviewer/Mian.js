import TabSearchReviewer from "./TabSearchReviewer";
import CustomLayout from "./layout";
import CustomSidebar from "./CustomSidebar";
import KeywordSearch from "./KeywordSearch";

const SearchReviewerMain = () => {
  const handleKeywordSearch = (keyword) => {
    // Implement your search logic here using the keyword
    console.log('Searching for keyword:', keyword);
  };
  return (
    <div>
      <CustomLayout CustomSidebar={
        <CustomSidebar></CustomSidebar>
      }


      >
   <TabSearchReviewer></TabSearchReviewer>
      </CustomLayout>


    </div>
  );
};

export default SearchReviewerMain;