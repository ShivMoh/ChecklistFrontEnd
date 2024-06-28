import { Comment } from "./comment";
import { Signature } from "./signature";

export interface CashierChecklist {
    id: string;
    checkCash: boolean;
    ensurePrinter: boolean;
    ensureChange: boolean;
    tidyWorkstation: boolean;

    comment: Comment;
    signature: Signature;
    date: string;
}
