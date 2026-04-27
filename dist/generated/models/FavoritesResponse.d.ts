import type { Favorite } from './Favorite';
export type FavoritesResponse = {
    ok: boolean;
    items: Array<Favorite>;
};
