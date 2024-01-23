import Inbox from "./components/Inbox";
import NavigationBar from "./components/templates/navbar";
import Footer from "./components/templates/footer";
import ArticleDetails from "./pages/ArticleDetails/ArticleDetails";
import AuthorSubmissionForm from "./components/AuthorSubmissionForm";
import Admin from "./components/Admin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Author from "./components/author";
import Login from "./components/Login";
import HomePage from "./pages/home/HomePage";
import ReviewerManagerMain from "./pages/SelectReviewer/MainselectedReviewer";
import MainSubmainDetails from "./pages/EditorDetailsSubmission/MainSubmainDetails";
import SearchReviewerMain from "./pages/SearchReviewer/Mian";
import MainSubmmsionEditor from "./pages/Submission/MainSubmmsionEditor";
import EmailFormSend from "./pages/SelectReviewer/EmailFormSend";
import AuthorActionTable from "./pages/Author/ActionTable";
import Reviews from "./pages/Reviewer/Reviews";
import RecommendationReviewer from "./pages/Reviewer/Recommendation"
import ReviewerAssgientment from "./pages/Reviewer/ReviewerAssgientment";
import UnavailableDate from "./pages/Reviewer/UnavailableDate";
import Reviewerinvatiations from "./pages/Reviewer/Reviewerinvatiations";
import PaddingAssignmentsReViewer from "./pages/Reviewer/PaddingAssignments";
import ReviewPromptAgree from "./pages/Reviewer/ReviewPromptAgree";
import AssignEditorTable from "./pages/Reviewer/assigneEditor";
import MainAdmin from "./pages/admin/Mian";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/author" element={<Author />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/ArticleDetails" element={<ArticleDetails />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/ArticleDetails/:id" element={<ArticleDetails />} />
        <Route path="/reviewerManagerMain" element={<ReviewerManagerMain />} />
        <Route path="/mainSubmainDetails" element={<MainSubmainDetails />} />
        <Route path="/searchReviewerMain" element={<SearchReviewerMain />} />
        <Route path="/mainSubmmsionEditor" element={<MainSubmmsionEditor />} />
        <Route path="/emailFormSend" element={<EmailFormSend />} />
        <Route path="/recommendationReviewer" element={<RecommendationReviewer />} />
        <Route path="/reviewerAssgientment" element={<ReviewerAssgientment />} />
        <Route path="/unavailableDate" element={<UnavailableDate />} />
        <Route path="/assignEditorTable" element={<AssignEditorTable />} />
        <Route path="/mainAdmin" element={<MainAdmin />} />

       
        <Route path="/reviewPromptAgree" element={<ReviewPromptAgree />} />

        <Route path="/paddingAssignmentsReViewer" element={<PaddingAssignmentsReViewer />} />
        <Route path="/reviewerinvatiations" element={<Reviewerinvatiations />} />
        <Route
          path="/AuthorSubmissionForm"
          element={<AuthorSubmissionForm />}
        />
        <Route path="/Admin" element={<Admin />} />
        {/* Add more routes as needed */}
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
