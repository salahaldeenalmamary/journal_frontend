import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "antd";
import { NavigationBar, Footer, Loading, Logout } from "./components";
import ArticleDetails from "./pages/articleDetails";
import SubmissionForm from "./pages/submissionForm";
import Admin from "./pages/roleAndPermissions";
import Author, { AuthorSubmissions } from "./pages/author";
import Login from "./pages/login";
import HomePage from "./pages/home";
import Submissions from "./pages/submissions";
import Editor, { EditorSubmissions } from "./pages/editor";
import ReviewerManagerMain from "./pages/selectReviewer/mainSelectedReviewer";
import MainSubmissionDetails from "./pages/EditorDetailsSubmission";
import NotFound from "./pages/notFound";
import Register, { PreRegisterForm, RegisterForm } from "./pages/register";
import ProtectedRoutes from "./common/routes";
import Reviewer, {
  Recommendation,
  UnavailableDate,
  AssignEditorTable,
  QuestionsReviewer,
  ReviewPromptAgree,
  ReviewInvitations,
  PaddingAssignmentsReViewer,
  CompleteReviewAssignment,
  ReviewReportrecomendition
} from "./pages/reviewer"; //works
import SearchReviewerMain, {
  SelectedReviewertable, TabSearchReviewer,
  Selectedreviewers, InviteForm, ClassificationsSelected, ReviewerDetails,
  ManageSelectedreviewers
} from "./pages/searchReviewer";
import SearchPeople from "./pages/searchpeople/index";
import { userLoggedInWithToken } from "./store/auth";
import AssignEditor from "./pages/assignSubmissionEditor";
import EmailFormSend from "./pages/reviewer/EmailFormSend";
import EditPersonalInformation from "./pages/editPersonalInformation";
const { Content, Footer: AntFooter, Header } = Layout;
function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { user, selectedRole, isError } = useSelector((store) => store.auth);
  // const [user, setUser] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setIsSuccess(false);
    dispatch(userLoggedInWithToken());
    setIsLoading(false);
    setIsSuccess(true);
  }, []);

  return (
    <Router>
      <Layout>
        <Header suffixCls="0" prefixCls="0">
          <NavigationBar />
        </Header>
        <Content >
          <Routes>
          <Route path="layout" element={<Loading />} />
            {isSuccess && (
              <Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />}>
                  <Route index element={<PreRegisterForm />} />
                  <Route path="new" element={<RegisterForm />} />
                </Route>
                <Route
                  element={
                    <ProtectedRoutes isAuthenticated={Boolean(user.id)} />
                  }
                >
                  <Route>
                    {/* <Route index element={<Navigate to="/" />} /> */}
                    {user.selectedRole === "Author" && (
                      <Route path="/main">
                        <Route index element={<Author />} />
                        <Route
                          path="submission/:id"
                          element={<SubmissionForm />}
                        />
                        <Route path="submissions">
                          <Route
                            path=":status"
                            element={<AuthorSubmissions />}
                          />
                          <Route
                            path=":status/:id"
                            element={<MainSubmissionDetails />}
                          />
                        </Route>
                      </Route>
                    )}
                    {user.selectedRole === "Editor" && (
                      <Route path="/main">
                        
                        <Route index element={<Editor />} />
                        <Route
                          path="select_reviewer"
                          element={<ReviewerManagerMain />}
                        />
                        <Route path="admin" element={<Admin />} />
                        <Route
                          path="search_people"
                          element={<SearchPeople />}
                        />
                         <Route
                          path="search_reviewer"
                          element={<SearchReviewerMain />}
                        />
                        <Route path="submissions">
                          <Route
                            path=":status"
                            element={<EditorSubmissions />}
                          />
                          <Route
                            path=":status/:id"
                            element={<MainSubmissionDetails />}
                          />
                        </Route>
                        <Route
                          path="assignEditor/:id"
                          element={<AssignEditor />}
                        />
                        <Route path="selectedreviewertable/:id" element={<SelectedReviewertable />} />


                        <Route path="selectedreviewerMain/:id" element={<SearchReviewerMain />} />
                        <Route path="selectedreviewers/:id" element={<Selectedreviewers />} />
                        <Route path="manageSelectedreviewers/:id" element={<ManageSelectedreviewers />} />
                        <Route path="inviteEmail/:userid" element={<InviteForm />} />
                        <Route path="reviewerDetails/:userid" element={<ReviewerDetails />} />
                        <Route path="classificationsSelected" element={<ClassificationsSelected />} />
                       
                      </Route>
                    )}
                    {user.selectedRole === "Reviewer" && (
                      <Route path="/main">
                        <Route index element={<Reviewer />} />
                        <Route
                          path="reviewInvitations"
                          element={<ReviewInvitations />}
                        />
                        <Route
                          path="pendingReviewAssignment"
                          element={<PaddingAssignmentsReViewer />}
                        />
                        <Route
                          path="completedReviewAssignment"
                          element={<CompleteReviewAssignment />}
                        />   <Route path="recommendation/:submissionid/:id/:attachmentId" element={<Recommendation />} />
                       <Route path="reportrecomendition/:id/:attachmentId" element={<ReviewReportrecomendition />} />
                        <Route
                          path="emailFormSend"
                          element={<EmailFormSend />}
                        />
                      </Route>
                    )}
                    <Route
                      path="/main/updateInformation"
                      element={<EditPersonalInformation />}
                    />
                    <Route path="logout" element={<Logout />} />
                    <Route path="submissions">
                      <Route path=":status" element={<Submissions />}></Route>
                      <Route
                        path=":status/:id"
                        element={<MainSubmissionDetails />}
                      />
                    </Route>
                    <Route path="/main" element={<Navigate to="/login" />} />
                  </Route>
                </Route>
                <Route path="/article/:id" element={<ArticleDetails />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/not-found" element={<NotFound />} />
                <Route path="/" element={<Navigate to="/home" />} />
                {/* <Route path="*" element={<Navigate to="/not-found" />} /> */}
                <Route path="*" element={<NotFound />} />
                {/* Add more routes as needed */}
              </Route>
            )}
            <Route path="*" element={<Loading />} />
           

          </Routes>
        </Content>
        <AntFooter>
          <Footer />
        </AntFooter>
      </Layout>
    </Router>
  );
}

export default App;
