interface IJsonResponse {
    status: number;
    data?: any;
    error?: IErrors;
    hasNextPage?: boolean;
    nextPage?: number;
    previousPage?: number;
    numberOfPages?: number;
}

interface IErrors {
    summary: string;
    fields?: {[key:  string]: string}
}