export interface InfoModel {
    mint: string;
    owner: string;
    tokenAmount: TokenAmountModel
}

export interface TokenAmountModel {
    amount: string;
    decimals: number,
    uiAmount: number,
    uiAmountString: string,
}

export interface ParsedInfo {
    info: InfoModel
}

export interface ParsedToken {
    parsed: ParsedInfo,
    program: string
}
