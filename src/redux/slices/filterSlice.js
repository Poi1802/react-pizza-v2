import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategory: 0,
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
  },
});

export const { setActiveCategory, setActiveList } = filterSlice.actions;

export default filterSlice.reducer;
