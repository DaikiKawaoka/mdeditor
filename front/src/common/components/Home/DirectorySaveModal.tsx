import { Dispatch, useState } from "react";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import DirectoryModel from "../Model/Directory";

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
  open: boolean;
  handleClose: Function;
  action: string;
  directory: DirectoryModel | null;
  directories: Array<DirectoryModel>;
  setDirectories: Dispatch<DirectoryModel[]>;
  changeSelectedDirectory: Dispatch<DirectoryModel> | null;
};
const ACTION_LIST: Array<string> = ["CREATE", "UPDATE"];

export default function TransitionsModal(props: Props) {
  const isActionCreate = props.action === ACTION_LIST[0];
  const [directoryName, setDirectoryName] = useState<string>(
    isActionCreate ? "" : props.directory!.name
  );

  const [errors, setErrors] = useState({
    name: []
  });

  async function createDirectory() {
    // ファイル保存
    const newDirectory = {
      id: 0,
      name: directoryName,
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios
        .post(process.env.REACT_APP_API_URL + "/directory", {
          id: newDirectory.id,
          name: newDirectory.name,
        })
        .then((res) => {
          props.directories.push(res.data.directory);
          props.setDirectories(props.directories);
          props.changeSelectedDirectory!(res.data.directory);
          props.handleClose();
          setDirectoryName('');
        })
        .catch((error) => {
          if (error.response.status === 422) {
            setErrors(error.response.data.errors);
          }
        });
    });
  }

  async function updateDirectory() {
    // ファイル編集
    const newDirectory = {
      id: props.directory!.id,
      name: directoryName,
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios
        .put(process.env.REACT_APP_API_URL + "/directory", {
          id: newDirectory.id,
          name: newDirectory.name,
        })
        .then((res) => {
          const updatedDirectories = props.directories.map((directory) => {
            if (directory.id === newDirectory.id) {
              return {
                ...directory,
                name: newDirectory.name,
              };
            } else {
              return directory;
            }
          });
          props.setDirectories(updatedDirectories);
          props.handleClose();
          setDirectoryName('');
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={() => props.handleClose()}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <Typography id="transition-modal-title">
              {isActionCreate ? "新規フォルダ" : "フォルダ名編集"}
            </Typography>
            <Box
              id="transition-modal-description"
              sx={{ display: "flex", mt: "15px", width: "100%" }}
            >
              <Typography align="center" sx={{ width: "15%" }}>
                名前：
              </Typography>
              <Box sx={{ width: "85%" }}>
                <TextField
                  required
                  name="name"
                  focused
                  size="small"
                  sx={{ width: "100%" }}
                  value={directoryName}
                  onChange={(event) => setDirectoryName(event.target.value)}
                  color="primary"
                  error={errors.name && errors.name.length > 0}
                  helperText={errors.name && errors.name.length > 0 ? errors.name[0] : ""}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: "25px",
                pt: "15px",
                borderTop: 1,
                width: "100%",
              }}
            >
              <Button
                onClick={() => props.handleClose()}
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
                onClick={isActionCreate ? createDirectory : updateDirectory}
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
