import React, { useState } from "react";
import Tables from "../../common/table_with_header_and_body/table";

const SearchReviewerTable = () => {
    const data = [

        { reviewername: '', boardmember: "", classifacations: '', reviewerstatistacts: '' },


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
                // rowActions={rowActions}
                checkboxActions={checkboxActions}
            />
        </div>
    );



};

export default SearchReviewerTable;
