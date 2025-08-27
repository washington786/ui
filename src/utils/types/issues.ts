export type IssueStatus = 'open' | 'in-progress' | 'resolved';
export type IssuePriority = 'low' | 'medium' | 'high';

export interface Issue {
    id: string;
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