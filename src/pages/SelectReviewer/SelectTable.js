import React, { useState } from "react";
import Tables from "../../common/table_with_header_and_body/table";

const SearchReviewerTable = () => {
    const data = [
        {
          reviewername: '',
          boardmember: '',
          classifacations: {
            reviews_in_progress: '1',
            completed_reviews: '1',
            unassigned_after_agreeing: '1',
            terminated_after_agreeing: '1',
            last_review_agreed: '1',
            last_review_completed: '1',
            last_review_declined: '1',
            avg_days_outstanding: '1',
            manuscript_rating: '1',
            avg_review_rating: '1',
          },
          reviewerstatistacts: {
            Date_Last_Invited: '',
            Outstanding_Invitations: '',
            Agreed: '',
            Declined: '',
            Uninvited_Before_Agreeing: '',
            Terminated: '',
            Total_Invitations: '',
          },
        },
      ];
      
    const columns = [
        { path: "reviewername", label: "Reviewer Name" },
        { path: "boardmember", label: " Doard Member" },
        { path: "classifacations", label: "Classifacation" },
        { path: "reviewerstatistacts", label: "Reviewer Statistacts" },
        { path: "invationstatistacts", label: "Invitation Statistacts" },


    ];


    const checkboxActions = [
        { label: "Inv. ", },
        { label: "Alt.", },
        { label: "Prop.", },
    ];






    const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });


    const handleSort = (path) => {
        setSortColumn((prevSortColumn) => ({
            path,
            order: prevSortColumn.order === "asc" ? "desc" : "asc",
        }));

    };

    return (
        <div>
            <h2></h2>
            <Tables
                columns={columns}
                sortColumn={sortColumn}
                onSort={handleSort}
                data={data}
                onSelectedAction={(s)=>
console.log(s)
                

                }
                // rowActions={rowActions}
                checkboxActions={checkboxActions}
            />
        </div>
    );



};

export default SearchReviewerTable;
