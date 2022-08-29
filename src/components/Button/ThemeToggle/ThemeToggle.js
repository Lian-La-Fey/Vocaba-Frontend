import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { switchTheme } from "../../../redux/features/themeSlice";

const ThemeToggle = ({ cNameDiv, cNameText }) => {
  const { theme } = useSelector((state) => ({ ...state.theme }));
  const dispatch = useDispatch()
  

  return (
    <div className={cNameDiv} onClick={() => dispatch(switchTheme( 1 ))}>
      { theme ? <FaMoon /> : <FaSun /> }
      <span className={cNameText}>{ theme ? "Dark" : "Light" }</span>
    </div>
  );
};

export default ThemeToggle;

// const DarkMode = () => {
//   let clickedClass = "clicked";
//   const body = document.body;
//   const lightTheme = "light";
//   const darkTheme = "darkTheme";
//   let theme;

//   if (localStorage) {
//     theme = localStorage.getItem("theme");
//   }

//   if (theme === lightTheme || theme === darkTheme) {
//     body.classList.add(theme);
//   } else {
//     body.classList.add(lightTheme);
//   }

//   const switchTheme = (e) => {
//     if (theme === darkTheme) {
//       body.classList.replace(darkTheme, lightTheme);
//       e.target.classList.remove(clickedClass);
//       localStorage.setItem("theme", "light");
//       theme = lightTheme;
//     } else {
//       body.classList.replace(lightTheme, darkTheme);
//       e.target.classList.add(clickedClass);
//       localStorage.setItem("theme", "dark");
//       theme = darkTheme;
//     }
//   };

//   return (
//     <button
//       className={theme === "dark" ? clickedClass : ""}
//       onClick={(e) => switchTheme(e)}
//     ></button>
//   );
// };

// export default DarkMode;
