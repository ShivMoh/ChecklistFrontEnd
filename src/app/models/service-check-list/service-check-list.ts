import { Comment } from "../comment";
import { Signature } from "../signature";
import { AromaticsServer } from "./attributes/aromatics-server";
import { CleanRestaurantServer } from "./attributes/clean-restaurant-server";
import { FinalPrepServer } from "./attributes/final-prep-server";
import { PrepSaucesServer } from "./attributes/prep-sauces-server";
import { SaladPrepServer } from "./attributes/salad-prep-server";

export interface ServiceCheckList {
    id: string;
    
    aromaticsServer : AromaticsServer;
    cleanRestaurantServer: CleanRestaurantServer;
    finalPrepServer: FinalPrepServer;
    prepSaucesServer: PrepSaucesServer;
    saladPrepServer: SaladPrepServer;
   
    comment: Comment;
    signature: Signature;
    date: string;

}
