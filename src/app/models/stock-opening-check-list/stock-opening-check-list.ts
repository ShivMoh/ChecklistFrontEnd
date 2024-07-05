import { Comment } from "../comment";
import { Signature } from "../signature";
import { StockTask } from "./attributes/stock-task";

export interface StockOpeningCheckList {
    id: string;
    stockTask : StockTask;
    comment: Comment;
    signature: Signature;
    date: string;
    listReferenceTypeId?: string;

}
