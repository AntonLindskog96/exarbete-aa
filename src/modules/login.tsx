import StartPage from "@/pages/startPage";
import {useState} from "react";
import React from 'react';
import {Modal} from "@mui/base";
import styles from "@/modules/login.module.scss";
import Dialog from '@mui/material/Dialog';
import {DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {set} from "immutable";

interface LoginProps {

    open: boolean;
    onClose: () => void;
}

const Login: React.FC<LoginProps> = ({open, onClose}) => {

    const [isLogin, setIsLogin] = useState(true);
    const [formError,setFormError] = useState<string | null>(null);


    const toggleForm = () => {
        setIsLogin(!isLogin);
        setFormError(null);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());

        const { email, password } = formJson;

        if (isLogin) {

            const storedUser = JSON.parse(localStorage.getItem(email as string) as string)

            if(!storedUser || storedUser.password !== password) {
                setFormError("Fel email eller password");
                return;
            }

            localStorage.setItem("currentUser", JSON.stringify({email}));
            onClose();

        } else {
            const { confirmPassword} = formJson;

            if (password !== confirmPassword) {
                setFormError("Lösenorden matchar inte");
                return;
            }
            localStorage.setItem("currentUser", JSON.stringify({email, password}));
            onClose();

        }
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
                        {formError && <p className={styles.errorText}>{formError}</p>}
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