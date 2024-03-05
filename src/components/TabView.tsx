import { useAppTheme } from "@/constants/theme";
import { memo, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableRipple } from "react-native-paper";

type Props = {
  initialTabIndex?: number;
  tabs: TabItem[];
  disabled?: boolean;
};

export type TabItem = {
  title: string;
  content: React.ReactNode;
};

export const TabView: React.FC<Props> = ({
  initialTabIndex = 0,
  disabled = false,
  tabs,
}) => {
  const [activeTabIndex, setIndex] = useState(initialTabIndex);

  return (
    <View style={{ flex: 1 }}>
      <TabBar
        disabled={disabled}
        tabs={tabs.map((tab) => tab.title)}
        activeIndex={activeTabIndex}
        onTabPress={(i) => setIndex(i)}
      />
      {tabs[activeTabIndex].content}
    </View>
  );
};

export function TabBar({
  disabled,
  tabs,
  activeIndex,
  onTabPress,
}: {
  disabled: boolean;
  tabs: string[];
  activeIndex: number;
  onTabPress: (index: number) => void;
}) {
  const styles = getThemedStyles();

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab, index) => (
        <TouchableRipple
          key={index}
          rippleColor={styles.activeTab.backgroundColor}
          style={[
            styles.tab,
            activeIndex === index && styles.activeTab,
            index === 0 && styles.firstTab,
            index === tabs.length - 1 && styles.lastTab,
          ]}
          disabled={disabled}
          onPress={() => onTabPress(index)}
        >
          <Text style={styles.tabText}>{tab}</Text>
        </TouchableRipple>
      ))}
    </View>
  );

  function getThemedStyles() {
    const theme = useAppTheme();

    return StyleSheet.create({
      tabView: {
        flex: 1,
      },
      tabBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: theme.colors.neutrals[300],
        borderRadius: 8,
        height: 32,
        padding: 1,
      },
      tab: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      tabText: {
        ...theme.textStyles.labelSmall,
        color: disabled
          ? theme.colors.neutrals[500]
          : theme.colors.neutrals[900],
      },
      activeTab: {
        backgroundColor: disabled
          ? theme.colors.neutrals[100]
          : theme.colors.white,
      },
      firstTab: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
      },
      lastTab: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
      },
    });
  }
}
