import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategory: 0,
  page: 1,
  activeList: {
    name: 'сначала популярные',
    sortProp: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    setActiveList(state, action) {
      state.activeList = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setFilters(state, action) {
      state.activeCategory = Number(action.payload.activeCategory);
      state.page = Number(action.payload.page);
      state.activeList = action.payload.sortProperties;
    },
  },
});

export const { setActiveCategory, setActiveList, setPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
