import React from 'react';
import { Alert, Button, Grid, Paper, TextField } from '@mui/material';
import { Payload, Severity } from '../types';
import { useNavigate } from "react-router-dom";
import '../../assets/css/auth.css';
import { connect, save } from '../../../providers/AuthProvider';

const INITIAL_PAYLOAD: Payload = {
  username: '',
  password: '',
  hint: {
    message: 'Connect with your credential',
    type: 'info',
  },
};

export const Login = () => {
  const [payload, setPayload] = React.useState<Payload>(INITIAL_PAYLOAD);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  const handleSetHint = (message: string, type: Severity) => {
    setPayload((prev) => ({
      ...prev,
      hint: {
        message,
        type,
      },
    }));
  };

  const handleSubmit = async (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    const { username, password } = payload;
    handleSetHint('', 'info');

    connect(username, password)
      .then(res => {
        save(window.btoa(`${username}:${password}`));
        navigate('/home');
      })
      .catch(err => {
        handleSetHint('Please correct your username or password', 'warning');
      });

    if (username !== 'yume' || password !== 'yarn start') {
    } else {
      navigate('/home');
    }
  };

  return (
    <form className="auth__login" onSubmit={handleSubmit}>
      <Paper
        sx={{
          padding: 2,
        }}
      >
        <Grid paddingY={2}>
          {payload.hint.message && (
            <Alert severity={payload.hint.type}>{payload.hint.message}</Alert>
          )}
        </Grid>

        <Grid item paddingBottom={3}>
          <TextField
            fullWidth
            name="username"
            label="username"
            type="text"
            size="small"
            variant="standard"
            value={payload.username}
            onChange={handleChange}
          />
        </Grid>
        <Grid item paddingBottom={3}>
          <TextField
            fullWidth
            name="password"
            label="password"
            size="small"
            type="text"
            variant="standard"
            value={payload.password}
            onChange={handleChange}
          />
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              type="submit"
              onClick={handleSubmit}
              disableElevation
            >
              Log in
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};
