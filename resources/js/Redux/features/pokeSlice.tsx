import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import fetchPokemon from '../thunk/pokeThunk'
import { PokeType } from '@/types/global';

const initialPaginationState = {
    currentPage: 1,
    totalPages: 1,
    pagesPerPage: 9
};


const initialState: PokeType = {
  status: 'idle',
  errors: '',
  pokeList: [],
  pagination: initialPaginationState
}

const pokeSlice = createSlice({
  name: 'poke',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
        state.pagination.currentPage = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchPokemon.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchPokemon.fulfilled, (state, action) => {
        state.status = 'succeeded';
		state.pokeList = action.payload;
        state.pagination.totalPages = Math.floor(action.payload.length / state.pagination.pagesPerPage);
        state.errors = ''
    });
    builder.addCase(fetchPokemon.rejected, (state, action) => {
      state.status = 'error';
      state.errors = action.error?.message;
    });
  },
})

export const { setCurrentPage } = pokeSlice.actions
export default pokeSlice.reducer
