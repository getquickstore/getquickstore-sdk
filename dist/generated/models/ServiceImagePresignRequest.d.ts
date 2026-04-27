export type ServiceImagePresignRequest = {
    filename: string;
    contentType?: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/avif';
};
