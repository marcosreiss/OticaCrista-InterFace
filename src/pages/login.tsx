
import { useState } from 'react';
import { useForm } from "react-hook-form";

import Box from '@mui/material/Box';
import { Button, Grid } from "@mui/material";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { useLogin } from '../hooks/useLogin';
import { LoginPayload, LoginResponse } from '../services/loginService';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


// ----------------------------------------------------------------------

const LoginPage = ()=> {

    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginPayload>();


    const { setToken, setUsername, setRole } = useAuth();
    const loginMutation = useLogin();
    const { addNotification } = useNotification();



    const handleSignIn = (data: LoginPayload) => {
        console.log(data);
        loginMutation.mutate(data, {
            onSuccess: (response: LoginResponse) => {
                addNotification("Login realizado com sucesso!", "success");
                if (response.token) {
                    setToken(response.token);
                    setUsername(response.user.username)
                    setRole(response.user.role)
                }
            },
            onError: () => {
                addNotification("Erro ao fazer login, tente novamente", "error")
            },
        });
    }




    const renderForm = (
        <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Grid container mb={3}>
                <TextField
                    fullWidth
                    // name="email"
                    label="Usuário"
                    InputLabelProps={{ shrink: true }}
                    {...register("username", { required: true })}
                />
                {errors?.username && (
                    <Typography
                        variant="body2"
                        color="error"
                        sx={{
                            fontWeight: "bold",
                            fontSize: "0.775rem",
                            display: "flex",
                            alignItems: "center",
                            mt: 1
                        }}
                    >
                        Preencha seu email
                    </Typography>
                )}
            </Grid>

            <Grid container mb={3}>
                <TextField
                    fullWidth
                    // name="password"
                    label="Senha"
                    InputLabelProps={{ shrink: true }}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    {showPassword ? (<VisibilityIcon />) : (<VisibilityOffIcon />)}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    {...register("password", { required: true })}
                />
                {errors?.password && (
                    <Typography
                        variant="body2"
                        color="error"
                        sx={{
                            fontWeight: "bold",
                            fontSize: "0.775rem",
                            display: "flex",
                            alignItems: "center",
                            mt: 1
                        }}
                    >
                        Preencha sua senha
                    </Typography>
                )}
            </Grid>

            <Button
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="contained"
                onClick={() => handleSubmit(handleSignIn)()}
                sx={{
                    "&:hover": {
                        backgroundColor: "#2E7D32", // Cor verde ecológica
                        color: "#ffffff", // Cor do texto branco para contraste
                    },
                }}
            >
                Entrar
            </Button> {/* Fechamento correto da tag */}


        </Box>
    );

    return (
        <>

            <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h5">Login</Typography>
            </Box>
            {renderForm}

            <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" paddingTop={2}>
                <Typography sx={{ color: "#2E7D32" }}>
                    ECO BRITO RECICLAGEM LTDA.
                </Typography>
            </Box>

        </>
    );
}

export default LoginPage;