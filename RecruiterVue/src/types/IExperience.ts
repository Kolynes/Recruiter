interface IExperience {
    id?: number;
    details: string
    institution: string;
    fromDate: string;
    toDate: string;
    type: "Work" | "Education";
}