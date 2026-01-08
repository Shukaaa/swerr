export type JsdocTag = {
    /** Tag name without "@" (e.g. "param", "throws", "error") */
    name: string;
    /** The full tag line content after "@name" (may include multiple lines if indented) */
    raw: string;
};

export type JsdocBlock = {
    filePath: string;
    /** 1-based line number where the block starts */
    startLine: number;
    /** The entire raw block including /** *\/ delimiters */
    raw: string;
    /** Free text before the first @tag */
    description: string;
    /** All tags in encounter order */
    tags: JsdocTag[];
};