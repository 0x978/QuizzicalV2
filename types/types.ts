export interface quizDataType{
    questions: string[]
    correctAns: string[]
    selectedAnswers:string[]
    allAnswers:string[][]
}

export interface quizType{
    id: number,
    userId: string,
    quizData: quizDataType,
    score: number,
    date: string
}

