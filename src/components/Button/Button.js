import { Spinner } from "react-bootstrap";
import styles from "./styles.module.css";

const Button = ({ minWidth, loading, children, ...rest }) => {
	const Content = () => {
		if( loading )
			return <Spinner animation="border" role="status" />
		
		return children
	}
	
	const style = minWidth ? {minWidth: minWidth} : {}
	
	return (
		<button {...rest} className={styles.btn} style={style}>
			<Content />
		</button>
	);
};

export default Button;