import { Button, Dialog, DialogActions, DialogContent, DialogTitle, useTheme } from "@mui/material";

 export interface IDataModalProps{
    open:boolean;
    onClose:()=>void;
    title:string;
    mode:"view" |"update" |"add";
    children:React.ReactNode;
    onSave?:()=>void;
    isPending?:boolean;


 }


export default function DataModal({open,onClose,mode,title,children,onSave,isPending}:IDataModalProps) {
     const modalTitle =
    title || (mode === "update" ? "Update Room" : "View Room");
    const theme=useTheme();

  return (
    <div>
<Dialog open={open}  fullWidth>

      <DialogTitle  sx={{backgroundColor:theme.palette.primary.main,color:"white"}}>
        {modalTitle}
      </DialogTitle>

      <DialogContent>
        {children}
      </DialogContent>
          <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>



  {(mode === "add" || mode === "update")  && (
    <Button
      variant="contained"
      size="large"
      onClick={onSave}
      disabled={isPending}
    >
     {isPending
      ? "Saving..."
      : mode === "add"
      ? "Add  New Facility"
      : "Update Change"}
    </Button>
  )}


      </DialogActions>

    </Dialog>
    </div>
  )
}
