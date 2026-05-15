import type { ProfileAddress } from './ProfileAddress';
import type { ProfilePushPreferences } from './ProfilePushPreferences';
import type { ProfileUser } from './ProfileUser';
export type ProfileResponse = {
    ok?: boolean;
    profile?: ProfileUser;
    addresses?: Array<ProfileAddress>;
    pushPreferences?: ProfilePushPreferences;
};
