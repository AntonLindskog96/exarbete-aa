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

    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin)
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());

        if (isLogin) {

            const {email, password} = formJson;
            localStorage.setItem("user", JSON.stringify({email, password}));
        } else {
            const {email, password, confirmPassword} = formJson;
            if (password !== confirmPassword) {
                alert("Lösenorden matchar inte");
                return;
            }
            localStorage.setItem("user", JSON.stringify({email, password}));
        }

        onClose();


    };


    return (
        <div>
            <Dialog open={open} onClose={onClose} PaperProps={{
                className: styles.loginPopup,
                component: 'form',
                onSubmit: handleSubmit,
            }}>
                <CloseIcon className={styles.closeIcon} onClick={onClose}>Cancel</CloseIcon>
                <DialogTitle>{isLogin ? "Logga in" : "Registrera"}</DialogTitle>
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
                        label="Lösenord"
                        type="password"
                        fullWidth
                        variant="standard"
                    />
                    {!isLogin && (
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="confirmPassword"
                            label="Bekräfta lösenord"
                            type="password"
                            fullWidth
                            variant="standard"
                        />
                    )}
                </DialogContent>
                <button type="submit">{isLogin ? "Logga in" : "Registrera dig"}</button>
                <DialogActions>
                    <p className={styles.registrationText} onClick={toggleForm}>
                        {isLogin ? "Har du inget konto? Registrera dig här" : "Har du redan ett konto? Logga in här"}
                    </p>
                </DialogActions>
            </Dialog>

        </div>
    );
}

export default Login;