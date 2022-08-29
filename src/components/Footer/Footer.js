import React from 'react'
import { Container } from 'react-bootstrap'
import { FaGithub } from 'react-icons/fa';
import styles from './styles.module.css';

const Footer = () => {
    return (
        <footer>
            <Container fluid className={styles.footerContainer}>
                <span>All Rights Reserved &copy; 2022</span>
                <a href="https://github.com/Lian-La-Fey/" className={styles.link}>
                    <FaGithub />
                </a>
            </Container>
        </footer>
    )
}

export default Footer
