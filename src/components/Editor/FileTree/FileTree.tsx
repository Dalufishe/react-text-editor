import { useState, useContext } from "react";
import { AiOutlineCaretDown, AiOutlineCaretRight } from "react-icons/ai";
import { useSpring, animated } from "@react-spring/web";
import { EditorContext } from "../Editor";

const Dir = ({ name, item }: { name: string; item: unknown }) => {
  const editor = useContext(EditorContext);
  const [open, setOpen] = useState(true);
  return (
    <li className="pl-4">
      {item instanceof File ? (
        <span
          onClick={async () => {
            editor.setFileName(item.name);
            editor.setFileType(item.type);
            editor.setFileSize(item.size);
            const content = await item.text();
            editor.setContent(content.split("\n"));
          }}
          className="pl-4 hover:underline"
        >
          {name}
        </span>
      ) : (
        <span
          onClick={() => {
            setOpen(!open);
          }}
          className="flex items-center gap-1 hover:underline"
        >
          {open ? <AiOutlineCaretRight /> : <AiOutlineCaretDown />}
          {name}
        </span>
      )}
      {item instanceof Object && open && <FileTree data={item} />}
    </li>
  );
};

const FileTree = ({ data }) => {
  const srping = useSpring({ from: { opacity: 0.5 }, to: { opacity: 1 } });
  return (
    <animated.ul style={srping} className="text-sm cursor-pointer">
      {Object.entries(data).map(([name, item]) => (
        <Dir key={name} name={name} item={item} />
      ))}
    </animated.ul>
  );
};

export default FileTree;
