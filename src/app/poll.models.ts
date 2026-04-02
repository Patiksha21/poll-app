export interface OptionVote {
voteCount: any;
    option: string;
    votes: number;
}
export interface Poll {
    id: number;
    question: string;
    options: OptionVote[];
}
