export interface Question {
    questionsId: number;
    questionStatement: string;
    answers: Answer[];
  }
  
  export interface Answer {
    id: number;
    answerText: string;
    correct: boolean;
  }