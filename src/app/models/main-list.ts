import { Aromatics } from "./aromatics";
import { AromaticsServer } from "./aromatics-server";
import { ArrivalBasics } from "./arrival-basics";
import { BrothPrep } from "./broth-prep";
import { CashierChecklist } from "./cashier-checklist";
import { CleanRestaurantServer } from "./clean-restaurant-server";
import { Comment } from "./comment";
import { FinalPrep } from "./final-prep";
import { FinalPrepServer } from "./final-prep-server";
import { PrepProteins } from "./prep-proteins";
import { PrepSauces } from "./prep-sauces";
import { PrepSaucesServer } from "./prep-sauces-server";
import { SaladPrep } from "./salad-prep";
import { SaladPrepServer } from "./salad-prep-server";
import { Signature } from "./signature";
import { StirFryVeg } from "./stir-fry-veg";
import { StockOpeningCheckList } from "./stock-opening-check-list";
import { ToppingsPrep } from "./toppings-prep";

export interface MainList {
    id : string;
    // kitchen
    aromatics : Aromatics;
    arrivalBasics: ArrivalBasics;
    brothPrep: BrothPrep;
    finalPrep: FinalPrep;
    prepProteins: PrepProteins;
    prepSauces: PrepSauces;
    saladPrep: SaladPrep;
    stirFryVeg: StirFryVeg;
    toppingsPrep: ToppingsPrep;

    // server
    aromaticsServer : AromaticsServer;
    cleanRestaurantServer: CleanRestaurantServer;
    finalPrepServer: FinalPrepServer;
    prepSaucesServer: PrepSaucesServer;
    saladPrepServer: SaladPrepServer;
    cashierChecklist: CashierChecklist;
    stockOpeningCheckList: StockOpeningCheckList;

    signature : Signature;
    comment : Comment;    
    date : Date;

}
