export type StoreReturnPolicy = {
    /**
     * Whether this store accepts product returns.
     */
    returnsEnabled: boolean;
    /**
     * Return window in days. Null means no fixed public window.
     */
    returnWindowDays?: number | null;
};
