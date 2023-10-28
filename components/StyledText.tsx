import React, { ReactNode, FC } from "react";
import { Text, TextStyle } from "react-native";

interface DefaultTextProps {
  children: ReactNode;
  className?: string;
}

const classStyles: { [key: string]: TextStyle } = {
  "text-black": { color: "black" },
};

const DefaultText: FC<DefaultTextProps> = ({ children, className }) => {
  const style = className ? classStyles[className] : {};
  return <Text style={{ fontFamily: "Inter", ...style }}>{children}</Text>;
};

export default DefaultText;
