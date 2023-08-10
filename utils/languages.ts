export enum Direction {
    ltr = 'ltr',
    rtl = 'rtl',
}

export interface Language {
    code: string;
    iso?: string;
    name: string;
    file?: string;
    dir: Direction;
    flag?: string;
}

export const langs: Language[] = [
    {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en-US.json',
        dir: Direction.ltr,
        flag: 'https://cdn.ipregistry.co/flags/noto/gb.png',
    },
    {
        code: 'ar',
        iso: 'ar-EG',
        name: 'Arabic',
        file: 'ar-SA.json',
        dir: Direction.rtl,
        flag: 'https://cdn.ipregistry.co/flags/noto/eg.png',
    },
];
