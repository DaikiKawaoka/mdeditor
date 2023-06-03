import { Dispatch, useState } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import DirectoryModel from "../Model/Directory";
import DirectorySaveModal from './DirectorySaveModal';
import DirectoryDeleteModal from './DirectoryDeleteModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  anchorEl: HTMLElement|null;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
  directory: DirectoryModel;
  directories: Array<DirectoryModel>;
  setDirectories: Dispatch<DirectoryModel[]>;
};

const DirectoryMenu = (props: Props) => {
  const open = Boolean(props.anchorEl);
  const [openDeleteModal, setDeleteModalOpen] = useState(false);
  const handleOpenDeleteModal = () => setDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);

  const [openSaveModal, setSaveModalOpen] = useState(false);
  const handleOpenSaveModal = () => setSaveModalOpen(true);
  const handleCloseSaveModal = () => setSaveModalOpen(false);

  return (
    <Menu
      anchorEl={props.anchorEl}
      open={open}
      onClose={props.handleClose}
      TransitionComponent={Fade}
    >
      <MenuItem onClick={handleOpenSaveModal}>
        <ListItemIcon>
          <EditIcon fontSize="small"/>
        </ListItemIcon>
        <Typography variant="inherit">
          フォルダを名称変更
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleOpenDeleteModal}>
        <ListItemIcon>
          <DeleteIcon fontSize="small"/>
        </ListItemIcon>
        <Typography variant="inherit">
          フォルダを削除
        </Typography>
      </MenuItem>
      <DirectorySaveModal open={openSaveModal} handleClose={handleCloseSaveModal} action='UPDATE' directory={props.directory} changeSelectedDirectory={null} directories={props.directories} setDirectories={props.setDirectories}/>
      <DirectoryDeleteModal openModal={openDeleteModal} handleCloseModal={handleCloseDeleteModal} directory={props.directory} directories={props.directories} setDirectories={props.setDirectories}/>
    </Menu>
  );
};

export default DirectoryMenu;