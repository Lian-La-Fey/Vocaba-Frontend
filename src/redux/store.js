import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import WordReducer from "./features/wordSlice";
import UserReducer from "./features/userSlice";
import dictionaryWord from "./features/dictionaryWordSlice";
import ThemeReducer from "./features/themeSlice";

export default configureStore({
	reducer: {
		auth: AuthReducer,
		word: WordReducer,
		user: UserReducer,
		dictionaryWord: dictionaryWord,
		theme: ThemeReducer
	}
});
