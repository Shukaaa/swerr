export interface ErroggerConfig {
    meta: {
        projectName: string;
        version: string;
        description: string;
    };
    paths: {
        scanDir: string;
        sourceOutputDir: string;
    };
    options: {
        ignoreDirs: string[];
        whitelistExtensions: string[];
    }
}