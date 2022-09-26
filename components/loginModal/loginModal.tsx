import React, { useState } from 'react';
import Login from '../loginPageBuilder/loginPageBuilder';
import Modal from 'react-modal';
import { ErrorModal } from 'mv-shared-components/dist';
import styles from './loginModal.module.css';

const customStyles = {
    content: {
        top: '15%',
        left: '5%',
        right: '5%',
        bottom: '10%',
        borderRadius: 20,
        padding: 0,
        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85))'
    }
};

function LoginModal({ closeModal, modalIsOpen }: any) {
    const [errorString, setErrorString] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModalHandler = () => {
        setIsModalOpen(false);
    }

    return (
        <div>
            <ErrorModal modalIsOpen={isModalOpen} closeModal={closeModalHandler} stringToShow={errorString} />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <span
                    className={styles.crossIcon}
                    onClick={closeModal}
                >
                    <img src="/images/crossIcon.ico" alt="crossIcon" />
                </span>
                <Login
                    closeModal={closeModal}
                    setErrorString={setErrorString}
                    setIsModalOpen={setIsModalOpen}
                />
            </Modal>
        </div>
    );
}

export default LoginModal;