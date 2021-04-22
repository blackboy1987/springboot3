export type SystemInfo = {
    SDKVersion: string;
    batteryLevel: number;
    benchmarkLevel: number;
    brand: string;
    deviceOrientation: string;
    devicePixelRatio: number;
    enableDebug: boolean;
    fontSizeSetting: number;
    language: string;
    model: string;
    pixelRatio: number;
    platform: string;
    safeArea: {
        bottom: number;
        height: number;
        left: number;
        right: number;
        top: number;
        width: number;
    }
    screenHeight: number;
    screenWidth: number;
    statusBarHeight: number;
    system: string;
    version: string;
    windowHeight: number;
    windowWidth: number;
}


type BookItem = {
    url: string;
    img: string;
    name: string;
    wordCount: string;
    author: string;
    category: string;
    info: string;
}

type ListItem = {
    books: BookItem[];
    title: string;
    more: string;
}
