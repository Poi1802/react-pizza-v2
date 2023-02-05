import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortItem } from '../../components/Sort';
import { RootState } from '../store';

export interface FilterState {
  activeCategory: number;
  page: number;
  activeList: SortItem;
  searchValue: string;
}

const initialState: FilterState = {
  activeCategory: 0,
  page: 1,
  activeList: {
    name: 'сначала популярные',
    sortProp: 'rating',
  },
  searchValue: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<number>) {
      state.activeCategory = action.payload;
    },
    setActiveList(state, action: PayloadAction<SortItem>) {
      state.activeList = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterState>) {
      state.activeCategory = Number(action.payload.activeCategory);
      state.page = Number(action.payload.page);
      state.activeList = action.payload.activeList;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const { setActiveCategory, setActiveList, setPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
