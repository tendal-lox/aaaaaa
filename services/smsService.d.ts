export default class SmsServiceListAccess {
    constructor();
    smsListAccess(): Promise<{
        receivedSmsList: any;
        samehAccessToken: any;
        message?: undefined;
        statusCode?: undefined;
        err?: undefined;
    } | {
        message: string;
        statusCode: number;
        err: unknown;
        receivedSmsList?: undefined;
        samehAccessToken?: undefined;
    }>;
    smsSender(): Promise<{
        message: string;
    }>;
}
