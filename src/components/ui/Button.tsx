import React from "react";

interface Props {
  children: React.ReactNode;
  onClick?: (evt: React.MouseEvent) => void;
}

export default function Button(props: Props) {
  return (
    <button
      onClick={props.onClick}
      className="bg-gray-900 px-4 py-2 rounded-md hover:bg-opacity-60 transition-all mx-4"
    >
      {props.children}
    </button>
  );
}
