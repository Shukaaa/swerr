export type ErroggerScheme = {
    name: string;
    description: string;
    version: string;
    errors: ErroggerSchemeError[];
}

export type ErroggerSchemeError = {
    name: string;
    description: string;
    tags: ErroggerSchemeTag[];
}

export type ErroggerSchemeTag = {
    name: string;
    description: string;
}