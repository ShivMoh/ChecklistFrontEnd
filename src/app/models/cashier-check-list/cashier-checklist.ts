import { Comment } from "../comment";
import { Signature } from "../signature";
import { CashierTask } from "./attributes/cashier-task";

export interface CashierChecklist {
    id: string;
    cashierTask : CashierTask;
    comment: Comment;
    signature: Signature;
    date: string;
    listReferenceTypeId?: string;

}
