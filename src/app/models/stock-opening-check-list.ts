import { Comment } from "./comment";
import { Signature } from "./signature";

export interface StockOpeningCheckList {
    id: string;
    beverages: boolean;
    checkUtensils: boolean;
    towels: boolean;
    coldCups: boolean;
    condiments: boolean;
    ramenBar:boolean;
    straws: boolean;
    tissuesPacks: boolean;
    tissues: boolean;
    teaBags: boolean;
    takeoutBox: boolean;

    comment: Comment;
    signature: Signature;
    date: string;
}
