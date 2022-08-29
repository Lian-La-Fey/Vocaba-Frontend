import styles from './styles.module.css';

const IconButton = ({ children, ...rest }) => {
  return (
    <button className={styles.btnIcon} {...rest}>
      {children}
    </button>
  );
};

export default IconButton;
