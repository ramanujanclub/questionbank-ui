export interface QuestionuploadModel {
  id: string ;
  questionDescription: string ;
  questionHeader: string ;
  // questionDescriptionImage: File ;
  // scannedQuestionFile: File ;
  questionOptions: QuestionOptions ;
  questionCorrectAnswer: QuestionCorrectAnswer ;
  chapterId: number;
  classId: number;
  questionComplexityLevel: string ;
  questionMetadata: QuestionMetaData ;
  questionOwnerDetails: QuestionOwnerDetails ;
  questionHint: QuestionHint ;
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
