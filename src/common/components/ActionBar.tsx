import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Delete, Save, Cancel } from "@mui/icons-material";
import { Actionbar as propTypes } from "../../types/data/ActionBar";
import { IconButton, useMediaQuery } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDataProvider } from "../../utils/hooks/useDataProvider";
import AlertDialog from "./AlertDialog";

export const ActionBar: React.FC<propTypes> = ({ resource, context, data }) => {
  const { deleteOne, update, save } = useDataProvider<any>();
  const [open, setOpen] = useState(false);
  const displayFull = useMediaQuery("(min-width: 398px)");
  const navigate = useNavigate();
  const { id } = useParams();

  const deletePermanently = async () => {
    if (id) {
      await deleteOne(resource, +id);
      navigate(`/home/${resource}`);
    }
  };

  useEffect(() => {
    const idTimeOut = setTimeout(() => {
      if (open) {
        deletePermanently();
        navigate(`/home/${resource}`);
      }
    }, 3000);

    return () => clearTimeout(idTimeOut);
  }, [open]);

  const handleDelete = async (action: string) => {
    if (action === "undo") {
      setOpen(false);
    }
  };

  const handleSave = async () => {
    if (context === "update" && id) {
      await update(resource, +id, data);
    } else {
      await save(resource, data);
    }
    navigate(`/home/${resource}`);
  };

  return (
    <>
      {open && <AlertDialog undoDelete={handleDelete} />}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        sx={{
          width: "100%",
        }}
      >
        <Stack direction="row" spacing={2}>
          {displayFull ? (
            <>
              <Button
                variant="contained"
                color="primary"
                endIcon={<Save color="primary" />}
                disableElevation
                onClick={handleSave}
              >
                Save
              </Button>

              <Button
                color="error"
                startIcon={<Cancel />}
                disableElevation
                onClick={() => navigate(`/home/${resource}`)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <IconButton onClick={handleSave}>
                <Save color="primary" />
              </IconButton>

              <IconButton onClick={() => navigate(`/home/${resource}`)}>
                <Cancel color="error" />
              </IconButton>
            </>
          )}
        </Stack>

        {id != 'create' ? (displayFull ? (
          <Button
            variant="contained"
            color="error"
            startIcon={<Delete />}
            disableElevation
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        ) : (
          <IconButton onClick={() => setOpen(true)}>
            <Delete color="error" />
          </IconButton>
        )) : ''}
      </Stack>
    </>
  );
};
