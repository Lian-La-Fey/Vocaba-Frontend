import { FaSearch } from 'react-icons/fa';
import styles from './styles.module.css';

const Search = ({ style, ...rest }) => {
  
  return (
    <div className={`${styles.searchDiv} ${style ? styles.mob : ""}`}>
      <input style={style} type="text" {...rest} />
      <FaSearch />
    </div>
  );
};

export default Search;
