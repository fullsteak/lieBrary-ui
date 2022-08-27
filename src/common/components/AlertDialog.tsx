import * as React from 'react';
import Button from '@mui/material/Button';
import {Dialog, DialogActions, Alert} from '@mui/material';
import { AlertDialog as propTypes } from '../../types/data/AlertDialog';

export default function AlertDialog({ undoDelete }: propTypes) {
  return (
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClick={() => undoDelete('undo')}
      >
        <DialogActions>
          <Alert severity="warning">
            Element deleted
          </Alert>
          <Button onClick={() => undoDelete('undo')} autoFocus>
            undo
          </Button>
        </DialogActions>
      </Dialog>
  );
}
