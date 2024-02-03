export interface AnswerRespon {
    id:      number;
    correct: boolean;
}
export const answers: AnswerRespon[] = [
    { id: 1, correct: true },
    { id: 2, correct: false },
    { id: 3, correct: true },
    // ... puedes continuar según sea necesario
  ];
  
  export interface  AnswerCorrect{
    answers: AnswerRespon[];
    score:   number;
}

export const responseAnswer  : AnswerCorrect = {
    answers: answers,
    score: 0,
}