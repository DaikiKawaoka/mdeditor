import { Dispatch, useState } from "react";
import axios from 'axios';
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FileModel from "../Model/File";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#251f2a",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type Props = {
  openModal: boolean;
  handleCloseModal: Function;
  file: FileModel;
  files: Array<FileModel>;
  setFiles: Dispatch<FileModel[]>;
  initFiles: () => void;
};

export default function TransitionsModal(props: Props) {

  const handleDeleteFile = () => {
    console.log(props.file);
    if (props.file.is_registered) {
      console.log('削除');
      deleteFile(props.file.id);
    }
    const newFiles = props.files.filter((file: FileModel) => file.id !== props.file.id);

    if (newFiles.length === 0) {
      // ファイルが削除され、フォルダの中にファイルが0件の場合にファイル一覧を初期化
      props.initFiles();
    }

    props.setFiles(newFiles);
    props.handleCloseModal();
  }

  async function deleteFile(id :number) {
    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.delete(
        process.env.REACT_APP_API_URL + '/file',
        {
          data: { id: id }
        }
      )
      .then((res) => {
        console.log('ファイル削除処理成功');
        console.log(res);
      }).catch(error => {
        console.log('ファイル削除処理失敗');
        console.log(error);
        props.handleCloseModal();
      });
    });
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.openModal}
        onClose={()=>props.handleCloseModal()}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.openModal}>
          <Box sx={style}>
            <Typography id="transition-modal-title" sx={{ mb: "10px", fontWeight: "bold" }}>
              このファイルを削除してもよろしいですか?
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "25px" , pt: "15px", borderTop: 1, width: "100%" }}>
            <Button
                onClick={()=>props.handleCloseModal()}
                size="small"
                variant="contained"
                sx={{
                  bgcolor: "#5c5760",
                  fontSize: "15px",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#5c5760",
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
              >
                キャンセル
              </Button>
              <Button
                onClick={handleDeleteFile}
                size="small"
                variant="contained"
                sx={{
                  ml: "10px",
                  bgcolor: "#cfa828",
                  fontSize: "15px",
                  "&:hover": {
                    backgroundColor: "#cfa828",
                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
              >
                OK
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
