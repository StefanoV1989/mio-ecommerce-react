import { createSelector } from "reselect";

export const selectUserState = state => state.user;

export const selectLoggedUser = createSelector(
    [selectUserState],
    user => user.loggedUser
)