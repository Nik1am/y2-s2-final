import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { DiaryEntry } from '../../types';

interface DiaryState {
  entries: DiaryEntry[];
  selectedEntry: DiaryEntry | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DiaryState = {
  entries: [],
  selectedEntry: null,
  isLoading: false,
  error: null,
};

const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    setEntries: (state, action: PayloadAction<DiaryEntry[]>) => {
      state.entries = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addEntry: (state, action: PayloadAction<DiaryEntry>) => {
      state.entries.unshift(action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    selectEntry: (state, action: PayloadAction<DiaryEntry | null>) => {
      state.selectedEntry = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setEntries, addEntry, setError, setLoading, selectEntry, clearError } =
  diarySlice.actions;
export default diarySlice.reducer;
