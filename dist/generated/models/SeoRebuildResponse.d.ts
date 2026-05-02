export type SeoRebuildResponse = {
    ok: boolean;
    processed: number;
    createdOrUpdated: number;
    skipped?: number;
    stores?: number;
    searchPages?: number;
};
