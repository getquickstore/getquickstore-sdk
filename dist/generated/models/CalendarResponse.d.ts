import type { CalendarItem } from './CalendarItem';
export type CalendarResponse = {
    scope: 'day' | 'week';
    date: string;
    timezone: string;
    fromLocal?: string;
    toLocal?: string;
    from: string;
    to: string;
    items: Array<CalendarItem>;
};
