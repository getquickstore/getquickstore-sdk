export type ServiceImage = {
    id: string;
    serviceId: string;
    key: string;
    url: string;
    alt?: string | null;
    isPrimary: boolean;
    position: number;
    createdAt: string;
};
