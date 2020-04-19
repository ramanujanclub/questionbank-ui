export const globalConfig = {
  endpoints: {
    baseURL: '/api/v1/questionbank/questions/',
    uploadQuestionURL: 'question',
    uploadParentQuestionURL: 'parentquestion',
    uploadImageURL: '/images/upload',
    questionByUserURL: 'users/',
    parentQuestionByUserURL: 'parentquestion/users/'
  },
  alertmessages: {
    questionUploadSuccess: 'Question successfully uploaded',
    questionUploadFailure: 'Something went wrong while uploading',
    verifyQuestionSuccess: 'Question verified successfully',
    verifyQuestionFailure: 'Something went wrong while verification',
  },
  buttontext: {
    questionUpload: 'Upload Questions',
    questionUploadInProgess: 'Saving Questions...',
    verifyQuestion: 'Verify Question',
    verifyQuestionInProgress: 'Verifying Question...',
    questionEdit: 'Edit Questions',
  },
  constants: {
    questionEvent: 'question',
    parentQuestionEvent: 'parentquestion',
    questionDescImage: 'questiondescimage',
    scannedQuestionFile: 'scannedquestionfile',
    hintImage: 'hintimage'
  }
};
