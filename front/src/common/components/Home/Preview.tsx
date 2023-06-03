import Box from "@mui/material/Box";
import ReactMarkdown from "react-markdown";
import { File } from "../Model/File";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
// import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  file: File | null;
  isPreviewMode: boolean
};

const Preview = (props: Props) => {
  return (
    <Box
      sx={{
        height: "100%",
        overflowY: "scroll",
        padding: "0.5rem",
      }}
    >
      {props.file === null ? (
        ""
      ) : props.file.content === "" && props.isPreviewMode === false ? (
        <Box sx={{ color: "#666", fontSize: "17px" }}>Preview ...</Box>
      ) : (
        // <ReactMarkdown>{props.file.content}</ReactMarkdown>
        <ReactMarkdown
          children={props.file.content}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  children={String(children).replace(/\n$/, "")}
                  style={okaidia}
                  language={match[1]}
                  PreTag="div"
                />
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              );
            },
          }}
        />
      )}
    </Box>
  );
};

export default Preview;
