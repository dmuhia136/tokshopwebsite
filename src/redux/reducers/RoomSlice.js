import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rooms: [],
}

export const RoomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    getAllRooms: (state, {payload}) => {
      state.value = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAllRooms } = RoomSlice.actions;

export default RoomSlice.reducer;
