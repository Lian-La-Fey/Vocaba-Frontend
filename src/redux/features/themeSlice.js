import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: 0,
  },
  reducers: {
    switchTheme: (state, action) => {
      if (state.theme) {
        document.body.classList.remove("darkTheme");
        localStorage.setItem("userPrefences", JSON.stringify({ theme: 0 }));
        state.theme = 0
        return;
      }

      document.body.classList.add("darkTheme");
      localStorage.setItem("userPrefences", JSON.stringify({ theme: 1 }));
      state.theme = 1;
    },
    
    setLoginTheme: (state, action) => {
      state.theme = JSON.parse(localStorage.getItem("userPrefences")).theme
      if ( state.theme ) document.body.classList.add("darkTheme");
      else document.body.classList.remove("darkTheme");
    }
    
  },
});

export const { switchTheme, setLoginTheme } = themeSlice.actions;
export default themeSlice.reducer;
