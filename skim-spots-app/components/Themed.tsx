import * as React from "react";
import {
  Text as DefaultText,
  View as DefaultView,
  ScrollView as DefaultScrollView,
} from "react-native";
import { Button as DefaultButton } from "react-native-paper";
import Colors from "../constants/Colors";
import { ThemeContext } from "../context/ThemeContext";

export const useThemeColor = (
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) => {
  const { theme } = React.useContext(ThemeContext);
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
};

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type ScrollViewProps = ThemeProps & DefaultScrollView["props"];

export const Text = (props: TextProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <DefaultText
      style={[{ fontFamily: "OpenSans-Light" }, { color }, style]}
      {...otherProps}
    />
  );
};

export const View = (props: ViewProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
};

export const ScrollView = (props: ScrollViewProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultScrollView style={[{ backgroundColor }, style]} {...otherProps} />
  );
};

export const Button = (props: any) => {
  const { style, lightColor, darkColor, onPress, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  // @ts-ignore
  return (
    <DefaultButton
      color={color}
      mode="outlined"
      style={[
        { borderRadius: 15, borderColor: color, fontFamily: "OpenSans-Bold" },
        style,
      ]}
      onPress={onPress}
      {...otherProps}
    />
  );
};
