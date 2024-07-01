import { PrepSauces } from "./attributes/prep-sauces";
import { Aromatics } from "./attributes/aromatics";
import { ArrivalBasics } from "./attributes/arrival-basics";
import { BrothPrep } from "./attributes/broth-prep";
import { FinalPrep } from "./attributes/final-prep";
import { PrepProteins } from "./attributes/prep-proteins";
import { SaladPrep } from "./attributes/salad-prep";
import { StirFryVeg } from "./attributes/stir-fry-veg";
import { ToppingsPrep } from "./attributes/toppings-prep";
import { Signature } from "../signature";
import { Comment } from "../comment";

export interface KitchenCheckList {
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

    comment: Comment;
    signature: Signature;
    date: string;

  
}
