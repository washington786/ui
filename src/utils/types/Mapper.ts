import type { Issue, IssueView } from "./issues";

export const mapIssue = (issue: Issue): IssueView => ({
    ...issue,
    id: issue._id,
});

export const mapIssues = (issues: Issue[]): IssueView[] => issues.map(mapIssue);