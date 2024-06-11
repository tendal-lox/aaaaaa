export declare const samehSmsAuth: ({ username, password }: {
    username: string;
    password: string;
}) => Promise<{
    message: string;
    statusCode: number;
    accessToken?: undefined;
} | {
    accessToken: any;
    message?: undefined;
    statusCode?: undefined;
}>;
