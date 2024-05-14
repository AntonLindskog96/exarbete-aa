import styles from "@/styles/Home.module.scss";
import StartPage from "@/pages/startPage";
import {useState} from "react";
import React from 'react';
import {Modal} from "@mui/base";
import Dialog from '@mui/material/Dialog';

interface LoginProps {

    open: boolean;
    onClose: () => void;
}

const Login: React.FC<LoginProps> = ({open, onClose}) => {

    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <h2>Login</h2>
            </Dialog>

        </div>
    );
}

export default Login;