import React, { useState } from 'react';
import EditFormSubmission from './EditFormSubmission';

const MainSubmainDetails = () => {
  const [formData, setFormData] = useState({
    transferredFromPublicationName: '',
    duplicateSubmissionCheck: false,
    similarityCheck: '',
    referenceCheckingResults: '',
    correspondingAuthor: '',
    correspondingAuthorEmail: '',
    authorComments: '',
    articleType: '',
    abstract: '',
    background: 'Dysferlinopathies are autosomal recessive disorders caused by',
    shortTitle: '',
    sectionCategory: '',
    keywords: '',
    classifications: '',
    initialDateSubmitted: '',
    editorialStatusDate: '',
    currentEditorialStatus: '',
    finalDispositionTerm: '',
    submissionFlags: false,

    manuscriptNotes: '',
    manuscriptNotescheck: false,
    TransimattalForm: '',

    BindedEditor: [{
      name: 'salahaldeen Almamary',
      role: '',
      dateAssign: '',
      dateCompleted: '',
      elapsedDays: '',
      recommendation: ''
    }, {
      name: 'salahaldeen Almamary',
      role: '',
      dateAssign: '',
      dateCompleted: '',
      elapsedDays: '',
      recommendation: ''
    }],

    AlternateReviewers: [{ name: '' }],
    ReviewersProposedbyEditors: [{ name: '' }],
    // NoAuthors have been invited to this manuscr
    ProductionTasks: {
      SubmissionTargetOnlinePublication: '',
      Date: '',
      TargetNumberofPages: '',
      BlackandWhiteImageCount: '',
      SubmissionTargetPublicationDate: '',
      SubmissionTargetVolume: '',
      SubmissionTargetIssue: '',
      ColorImageCount: '',
      ProductionNotes: '',
    }


  });


  const handleSave = (data) => {
    console.log('Saving data:', data);
    // Implement your save logic here
  };

  return (
    <div>
      <h1>Edit Form</h1>
      <EditFormSubmission initialValues={formData} onSave={handleSave} />
    </div>
  );
};

export default MainSubmainDetails;
