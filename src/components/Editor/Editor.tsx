import readDirectory from "../../utils/readDirectory";
import Button from "../ui/Button";
import styles from "./Editor.module.scss";
import React, { useState, useEffect } from "react";
import _ from "lodash";
import FileTree from "./FileTree/FileTree";

export const EditorContext = React.createContext<any>(null);

export default function Editor() {
  const [dir, setDir] = useState({});
  const [line, setLine] = useState(0);

  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("未指定");
  const [fileSize, setFileSize] = useState(0);
  const [content, setContent] = useState<string[]>([]);

  useEffect(() => {
    setLine(content.length);
  }, [content]);

  return (
    <EditorContext.Provider
      value={{
        fileName,
        setFileName,
        fileType,
        setFileType,
        fileSize,
        setFileSize,
        content,
        setContent,
      }}
    >
      <div className="w-[70%] h-screen py-12">
        <div className={styles.innerbox}>
          {/* Logo */}
          <div></div>
          {/* Top bar */}
          <div className="w-full h-[35px] bg-gray-800 flex items-center justify-center">
            {fileName}
          </div>
          {/* Left area */}
          <div className="absolute left-0 top-[35px] h-full">
            {/* Left bar */}
            <div className="w-[48px] h-full absolute top-0 left-0 bg-gray-800 border-t border-gray-500"></div>
            {/* File managerment */}
            <div className="w-[260px] h-[calc(100%-35px)] absolute top-0 left-[48px] bg-gray-800 border-gray-500 border border-b-0 flex flex-col justify-between">
              <div className="flex flex-col py-4 gap-3 overflow-auto">
                {_.isEmpty(dir) ? (
                  <>
                    <Button
                      onClick={async () => {
                        const directoryHandle =
                          await window.showDirectoryPicker();
                        const dir = await readDirectory(directoryHandle);
                        setDir(dir);
                      }}
                    >
                      開啟資料夾
                    </Button>
                    <Button
                      onClick={async () => {
                        const [fileHandle] = await window.showOpenFilePicker();
                        const file = await fileHandle.getFile();
                        setFileName(file.name);
                        setFileType(file.type);
                        setFileSize(file.size);
                        if (fileType.split("/")[0] === "image") {
                          const arraybuffer = await file.arrayBuffer();
                          const blob = new Blob([arraybuffer], {type:fileType})
                        
                          const url = window.URL.createObjectURL(blob)
                        console.log(url); 
                          setContent([url]);
                        } else {
                          const content = await file.text();
                          setContent(content.split("\n"));
                        }
                      }}
                    >
                      開啟文件
                    </Button>
                  </>
                ) : (
                  <ul>
                    <FileTree data={dir} />
                  </ul>
                )}
              </div>
              <div className="flex flex-col text-sm">
                <div className="w-full border-t border-gray-500 flex justify-center">
                  <p>行數: {line}</p>
                </div>
                <div className="w-full border-t border-gray-500 flex justify-center">
                  <p>檔案類型: {fileType || "未知"}</p>
                </div>
                <div className="w-full border-t border-gray-500 flex justify-center">
                  <p>檔案大小: {(fileSize / 1024).toFixed(2)} kb</p>
                </div>
              </div>
            </div>
          </div>
          {/* Right area */}
          <div className="absolute left-[308px] top-[35px] w-[calc(100%-308px)] h-[calc(100%-35px)] overflow-auto">
            {fileType.split("/")[0] === "image" ? (
              <img src={content[0]} alt="" />
            ) : (
              <pre className="w-full h-full p-4 whitespace-pre-wrap">
                {content.map((line, index) => (
                  <div key={index} className="flex">
                    <div className="w-12 text-gray-400">{index + 1}</div>
                    <div>{line + "\n"}</div>
                  </div>
                ))}
              </pre>
            )}
          </div>
        </div>
      </div>
    </EditorContext.Provider>
  );
}
