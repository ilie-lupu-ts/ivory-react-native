import { useState } from "react";
import ReanimatedCarousel from "react-native-reanimated-carousel";
import { Dimensions, View } from "react-native";

import { useAppTheme } from "@/constants/theme";

type CarouselProps<T> = {
  items: T[];
  height: number;
  renderItem: ({ item, index }: { item: T; index: number }) => JSX.Element;
};

export const Carousel = <T,>({ items, renderItem, height }: CarouselProps<T>) => {
  const { width } = Dimensions.get("window");
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <>
      <ReanimatedCarousel
        width={width}
        height={height}
        data={items}
        onSnapToItem={(index) => setActiveSlide(index)}
        renderItem={({ index, item }) => renderItem({ item, index })}
      />
      <Pagination activeIndex={activeSlide} slidesCount={items.length} />
    </>
  );
};

type PaginationProps = {
  activeIndex: number;
  slidesCount: number;
};

const Pagination = ({ activeIndex, slidesCount }: PaginationProps) => {
  const theme = useAppTheme();

  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      {Array.from({ length: slidesCount }).map((_, index) => (
        <View
          key={index}
          style={{
            width: 8,
            height: 4,
            borderRadius: 10,
            backgroundColor:
              index === activeIndex
                ? theme.colors.brandPrimary
                : theme.colors.extended.neutrals[300],
            margin: 4,
          }}
        />
      ))}
    </View>
  );
};
