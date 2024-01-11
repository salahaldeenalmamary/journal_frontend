import Inbox from "./components/Inbox";
import NavigationBar from "./components/templates/navbar";
import Footer from "./components/templates/footer";
import ArticleDetails from "./components/artical/ArticleDetails";
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
function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/author" element={<Author />} />
        <Route path="/ArticleDetails" element={<ArticleDetails />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/ArticleDetails/:id" element={<ArticleDetails />} />
        <Route path="/reviewerManagerMain" element={<ReviewerManagerMain />} />
        <Route path="/mainSubmainDetails" element={<MainSubmainDetails />} />
        <Route path="/searchReviewerMain" element={<SearchReviewerMain />} />
        <Route path="/mainSubmmsionEditor" element={<MainSubmmsionEditor />} />
        <Route
          path="/AuthorSubmissionForm"
          element={<AuthorSubmissionForm />}
        />
        <Route path="/Admin" element={<Admin />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
