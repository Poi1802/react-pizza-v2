import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  pizzas: [],
  status: 'loading',
};

export const fetchPizza = createAsyncThunk(
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
  extraReducers: {
    [fetchPizza.pending]: (state) => {
      state.status = 'loading';
      state.pizzas = [];
    },
    [fetchPizza.fulfilled]: (state, action) => {
      state.status = 'success';
      state.pizzas = action.payload;
    },
    [fetchPizza.rejected]: (state) => {
      state.status = 'error';
      state.pizzas = [];
    },
  },
});

export default fetchSlice.reducer;
