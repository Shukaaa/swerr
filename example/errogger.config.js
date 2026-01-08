export default {
    meta: {
        projectName: "Muffin API - Error Documentation",
        description: "The API description",
        version: "1.0.5",
    },
    paths: {
        scanDir: "./src/exceptions",
        sourceOutputDir: "./docs",
    },
    options: {
        ignoreDirs: [],
        whitelistExtensions: [
            ".js"
        ],
    }
}