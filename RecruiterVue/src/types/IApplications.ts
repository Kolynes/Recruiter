interface IApplication {
    id?: number;
    job: IJob;
    user: IAccount;
    test: ITest;
    testScore: ITestScore;
    interviewLink: string;
    status: "Approved" | "Declined" | "Pending";
    createdOn: string;
}