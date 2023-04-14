import { createSelector } from '@reduxjs/toolkit';

export const categoriesSelector = (state) => state.categories.data;
export const itemsSelector = (state) => state.items.data;

export const currentUserSelector = (state) => state.auth.currentUser;
export const isLoggedInSelector = (state) => state.auth.isLoggedIn;