import BaseResponse from "../common/common.model";

export const getCurrentTimestamp = () => Math.floor(Date.now() / 1000);

export const get200ConsoleMessage = (name: String, res: BaseResponse) => `
@@@@@@@@@@ [${name}] SUCCEED TO SEND:\n${JSON.stringify(res, null, "\t")}
`;
