import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type Pizza = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface FetchState {
  pizzas: Pizza[];
  status: Status;
}

const initialState: FetchState = {
  pizzas: [],
  status: Status.LOADING,
};

export const fetchPizza = createAsyncThunk<Pizza[], Record<string, string>>(
  'pizza/fetchPizza',
  async ({ pages, filterByCat, sortByCat, search }) => {
    const res = await axios.get(
      `https://react-pizza-server.onrender.com/pizzas/?${pages}${filterByCat}${sortByCat}${search}`
    );

    return res.data;
  }
);

const fetchSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state) => {
      state.status = Status.LOADING;
      state.pizzas = [];
    });
    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.pizzas = action.payload;
    });
    builder.addCase(fetchPizza.rejected, (state) => {
      state.status = Status.ERROR;
      state.pizzas = [];
    });
  },
  // extraReducers: {
  //   [fetchPizza.pending]: (state) => {
  //     state.status = 'loading';
  //     state.pizzas = [];
  //   },
  //   [fetchPizza.fulfilled]: (state, action) => {
  //     state.status = 'success';
  //     state.pizzas = action.payload;
  //   },
  //   [fetchPizza.rejected]: (state) => {
  //     state.status = 'error';
  //     state.pizzas = [];
  //   },
  // },
});

export const selectPizzaFetch = (state: RootState) => state.pizza;

export default fetchSlice.reducer;
