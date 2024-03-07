import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useCallback, useMemo, useRef, useState } from "react";
import { BottomSheetView, BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";

import { AppTheme, useAppTheme } from "@/constants/theme";
import { TouchableRipple } from "react-native-paper";

type SelectOptionProps = {
  label: string;
  placeholder: string;
  options: SelectOptionItem[];
  value?: string;
  onChange?: (value: string) => void;
};

type SelectOptionItem = {
  text: string;
  value: string;
};

export const SelectOption: React.FC<SelectOptionProps> = ({
  label,
  placeholder,
  value,
  options,
  onChange,
}) => {
  const theme = useAppTheme();
  const styles = getThemedStyles(theme);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%"], []);
  const selectedOption = options.find((option) => option.value === value);

  const openBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const closeBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  return (
    <>
      <View style={styles.selectOptionContainer}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <TouchableRipple style={styles.fieldContainer} onPress={openBottomSheet}>
          <View style={styles.fieldContent}>
            <Text
              style={[
                styles.fieldText,
                selectedOption && { color: theme.colors.extended.neutrals[900] },
              ]}
            >
              {selectedOption ? selectedOption.text : placeholder}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" style={styles.fieldIcon} size={24} />
          </View>
        </TouchableRipple>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        enableDynamicSizing={true}
        onChange={() => {}}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            onPress={() => {}}
            pressBehavior={"close"}
            {...props}
          />
        )}
      >
        <BottomSheetView style={styles.bottomSheetContent}>
          <View style={styles.bottomSheetTitle}>
            <Text style={theme.textStyles.heading4}>{placeholder}</Text>
            <TouchableRipple onPress={closeBottomSheet}>
              <MaterialIcons name="close" size={20} />
            </TouchableRipple>
          </View>
          <View style={styles.bottomSheetOptionsContainer}>
            {options.map(({ value: optionValue, text }, key) => {
              const isSelected = value === optionValue;

              return (
                <TouchableRipple
                  key={key}
                  onPress={() => {
                    onChange?.(isSelected ? "" : optionValue);
                    closeBottomSheet();
                  }}
                >
                  <View
                    style={[
                      styles.bottomSheetOption,
                      isSelected && { backgroundColor: theme.colors.extended.neutrals[100] },
                    ]}
                  >
                    <Text style={theme.textStyles.heading4}>{text}</Text>
                    {isSelected && (
                      <MaterialIcons
                        name="check"
                        size={24}
                        color={theme.colors.extended.green[600]}
                      />
                    )}
                  </View>
                </TouchableRipple>
              );
            })}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

function getThemedStyles(theme: AppTheme) {
  const { backgroundColor, borderColor, color } = getColors(theme);

  return StyleSheet.create({
    selectOptionContainer: {
      gap: 4,
    },
    fieldLabel: {
      ...theme.textStyles.labelSmall,
    },
    fieldContainer: {
      backgroundColor,
      borderColor,
      borderWidth: 1,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    fieldContent: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    fieldText: {
      ...theme.textStyles.bodyRegular,
      color,
    },
    fieldIcon: {
      color: theme.colors.extended.neutrals[700],
    },
    bottomSheetContent: {
      paddingTop: 16,
      paddingBottom: 24,
    },
    bottomSheetTitle: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: theme.spacings.screen.paddingHorizontal,
    },
    closeButton: {
      width: 20,
      height: 20,
    },
    bottomSheetOptionsContainer: {
      marginTop: 16,
    },
    bottomSheetOption: {
      paddingHorizontal: theme.spacings.screen.paddingHorizontal,
      paddingVertical: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  });

  function getColors(theme: AppTheme) {
    return {
      backgroundColor: theme.colors.extended.neutrals[100],
      borderColor: theme.colors.extended.neutrals[400],
      color: theme.colors.extended.neutrals[500],
    };
  }
}
