export interface Question {
    name: string;
    label: string;
    type: string;
    value: null | string ;
    disabled: boolean;
    isRequired: boolean;
}

export interface ResponseQuestions {
    data: Question[];
}
