import type { ProfilePushPreferences } from './ProfilePushPreferences';
export type ProfilePushPreferencesResponse = {
    ok?: boolean;
    preferences?: ProfilePushPreferences;
    pushPreferences?: ProfilePushPreferences;
};
