export interface QuestionuploadModel {
  questionId: string ;
  questionDescription: string ;
  questionHeader: string ;
  questionOptions: QuestionOptions ;
  questionCorrectAnswer: QuestionCorrectAnswer ;
  chapterId: number;
  classId: number;
  questionComplexityLevel: string ;
  questionMetadata: QuestionMetaData ;
  questionOwnerDetails: QuestionOwnerDetails ;
  questionHint: QuestionHint ;
  questionStatus: QuestionStatus;
}
export interface QuestionOptions {
  multipleQuestionOption: Array<QuestionOption>;
}

export interface QuestionOption {
  optionKey: string;
  optionValue: string;
}

export interface QuestionCorrectAnswer {
  correctAnswers: Array<CorrectAnswer>;
}

export interface CorrectAnswer {
  answerKey: string;
  answerValue: string;
}

export interface QuestionMetaData {
  name: string;
  value: string;
}

export interface QuestionOwnerDetails {
  name: string;
  emailId: string;
  schoolName: string;
  instituteName: string;
  address: string;
}

export interface  QuestionHint {
  hint: string;
}

export interface QuestionStatus {
  questionStatusId: number;
  isVerified: boolean;
  verifiedDate: string;
  isApproved: boolean;
  approvedDate: string;
  submittedByUserId: string;
  verifiedByUserId: string;
  submittedDate: string;
  approvedByUserId: string;
}
