import type { ProfileAddress } from './ProfileAddress';
import type { ProfileUser } from './ProfileUser';
export type ProfileResponse = {
    ok?: boolean;
    profile?: ProfileUser;
    addresses?: Array<ProfileAddress>;
};
