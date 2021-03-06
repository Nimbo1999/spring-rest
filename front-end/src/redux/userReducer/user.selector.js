import { createSelector } from 'reselect'

const selectUser = state => state.user

export const selectUserLoggedIn = createSelector(
  [selectUser],
  data => data.user
)

export const selectUserAuthenticated = createSelector(
  [selectUser],
  data => data.user.isAuthenticated
)

export const selectToken = createSelector(
  [selectUser],
  data => data.user.token
)

export const selectUserLoading = createSelector(
  [selectUser],
  data => data.loading
)