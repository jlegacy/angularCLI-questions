export interface IQuestion {
    question: string;
    ontest: string;
    answers: IAnswer[];
}

export interface IAnswer {
    answer: string;
    correct: string;
}