export type IssueStatus = 'open' | 'in-progress' | 'resolved';
export type IssuePriority = 'low' | 'medium' | 'high';

export interface Issue {
    _id: string;
    title: string;
    description: string;
    status: IssueStatus;
    priority: IssuePriority;
    createdBy: {
        name: string;
        email: string;
    };
    createdAt: string;
    updatedAt: string;
}
export interface IssueView extends Omit<Issue, '_id'> {
    id: string;
}