import { MoreVert } from "@mui/icons-material";
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useState } from "react";


 export interface IMenuActions{
        label:string;
        icon:React.ReactNode;
        color:string;
        onClick:(id:string)=>void;

    }
    export interface IProps{
        actions:IMenuActions[];
        itemId:string;
    }

export default function ActionMenu({actions,itemId}:IProps) {

  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>
     <IconButton onClick={handleOpen}>
        <MoreVert />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {actions.map((action:IMenuActions, index:number) => (
          <MenuItem
            key={index}
            onClick={() => {
              action.onClick(itemId);
              handleClose();
            }}

          >
            <ListItemIcon
              sx={{
                color: action.color,
              }}
            >
              {action.icon}
            </ListItemIcon>

            <ListItemText>
              {action.label}
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
