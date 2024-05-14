
import StartPage from "@/pages/startPage";
import {useState} from "react";
import React from 'react';
import {Modal} from "@mui/base";
import styles from "@/modules/login.module.scss";
import Dialog from '@mui/material/Dialog';
import {DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface LoginProps {

    open: boolean;
    onClose: () => void;
}

const Login: React.FC<LoginProps> = ({open, onClose}) => {

    return (
        <div>
            <Dialog open={open} onClose={onClose} PaperProps={{
                className: styles.loginPopup,
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries((formData as any).entries());
                    const email = formJson.email;
                    console.log(email);
                    onClose();
                },
            }}>
                <CloseIcon className={styles.closeIcon} onClick={onClose}>Cancel</CloseIcon>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <button type="submit">Logga in</button>
                </DialogActions>
            </Dialog>

        </div>
    );
}

export default Login;