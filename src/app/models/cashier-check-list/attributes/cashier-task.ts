
export interface CashierTask {
    id: string;
    checkCash: boolean;
    ensurePrinter: boolean;
    ensureChange: boolean;
    tidyWorkstation: boolean;
    fileContainerTypeId : string;
    
}
