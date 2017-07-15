import { IAnswer } from '../questions/question.interface';

export interface ITest {
    question: string;
    ontest: string;
    _id: string;
    answers: IAnswer[];
}


export interface ITestAnswer {
    question: string;
    answer: string;
}

export interface ITestAnswers {
    firstName: string,
    lastName: string,
    email: string,
    questions: [
        { 'answer': string },
        { 'question': string }];
}

export interface ITestReturnQuestion {
    'answer': string,
    'question': string,
    'id': string;
    'correct' : string;
}


export interface ITestReturn {
    _id: string,
    firstName: string;
    lastName: string,
    email: string,
    questions: ITestReturnQuestion[];

}