

export const globalConfig = {
  endpoints: {
    baseURL: '/api/v1/questionbank',
    uploadQuestionURL: '/upload',
    uploadParentQuestionURL: '/questions/parentquestion',
    listQuestionURL: '/questions/',
  },
  alertmessages: {
    questionUploadSuccess: 'Question successfully uploaded',
    questionUploadFailure: 'Something went wrong while uploading',
  },
  buttontext: {
    questionUpload: 'Upload Questions',
    questionUploadInProgess: 'Saving Questions...',
  },
  constants: {
    questionDescImage: 'questiondescimage',
    scannedQuestionFile: 'scannedquestionfile',
    hintImage: 'hintimage'
  }
}
