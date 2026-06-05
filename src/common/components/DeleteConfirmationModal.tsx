import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import deleteImg from "../../assets/images/deleteImg.png"

 export interface DeleteConfirmationDialogProps {
  open: boolean;
  title?: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmationModal({open,title,onClose,onConfirm}:DeleteConfirmationDialogProps) {
  return (
    <>


      <Dialog open={open} onClose={onClose} maxWidth="xs">
        <DialogTitle>{title}</DialogTitle>

        <DialogContent sx={{textAlign:"center"}}>

            <img src={deleteImg} alt="delete icon"  width="80x" />
           <Typography variant ="h6"> Are you sure you want to delete this item?</Typography>

        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
