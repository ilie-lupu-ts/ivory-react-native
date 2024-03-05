import { useAppTheme } from "@/constants/theme";
import { ReactNode } from "react";
import { Button as DefaultButton } from "react-native-paper";

type ButtonProps = {
  variant?: "primary" | "secondary";
  onPress?: () => void;
  children?: ReactNode;
  loading?: boolean;
};

export const Button = ({ variant = "primary", ...props }: ButtonProps) => {
  const theme = useAppTheme();
  const colors = getColors();
  const styles = getStyles();

  return (
    <DefaultButton
      mode={variant === "secondary" ? "outlined" : "contained"}
      onPress={props.onPress}
      loading={props.loading}
      contentStyle={{
        height: 48,
        paddingRight: props.loading ? 18 : 0,
        flexDirection: "row-reverse",
      }}
      style={[
        styles,
        {
          backgroundColor: colors?.backgroundColor,
          borderColor: colors?.textColor,
        },
      ]}
      labelStyle={[theme.textStyles.labelMedium, { color: colors?.textColor }]}
    >
      {props.children}
    </DefaultButton>
  );

  function getColors() {
    if (variant === "primary") {
      if (props.loading || !props.onPress) {
        return {
          backgroundColor: theme.colors.neutrals[300],
          textColor: theme.colors.neutrals[500],
        };
      }

      return {
        backgroundColor: theme.colors.primary,
        textColor: theme.colors.onPrimary,
      };
    } else if (variant === "secondary") {
      if (props.loading || !props.onPress) {
        return {
          backgroundColor: "transparent",
          textColor: theme.colors.neutrals[300],
        };
      }
      return {
        backgroundColor: "transparent",
        textColor: theme.colors.brandSecondary,
      };
    }
  }

  function getStyles() {
    if (variant === "secondary") {
      return {
        borderRadius: 4,
        borderWidth: 2,
      };
    }

    return { borderRadius: 4 };
  }
};
