import type { CalendarDayItem } from './CalendarDayItem';
export type CalendarDayResponse = {
    date?: string;
    fromLocal?: string;
    toLocal?: string;
    from?: string;
    to?: string;
    items?: Array<CalendarDayItem>;
};
