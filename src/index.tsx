import * as React from "react";
import { Animated, View, StyleSheet, Easing, ViewProps, Dimensions, LayoutRectangle } from "react-native";
import MaskedView from "@react-native-community/masked-view";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface SkeletonContextProps {
  backgroundColor?: string;
}

export const SkeletonContext = React.createContext<SkeletonContextProps>({
  backgroundColor: "#E1E9EE"
});

interface SkeletonContainerProps {
  children?: React.ReactNode;
  backgroundColor?: string;
  highlightColor?: string;
  speed?: number;
}

const skeletonContainerDefaultProps: SkeletonContainerProps = {
  backgroundColor: "#E1E9EE",
  speed: 800,
  highlightColor: "#F2F8FC"
};

export const SkeletonContainer: React.FunctionComponent<SkeletonContainerProps> = (props) => {
  const { children, backgroundColor, speed, highlightColor } = props;

  const [context, setContext] = React.useState({ backgroundColor });
  const [layout, setLayout] = React.useState<LayoutRectangle>();
  const animatedValue = React.useMemo(() => new Animated.Value(0), []);
  const translateX = React.useMemo(
    () =>
      animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-SCREEN_WIDTH, SCREEN_WIDTH]
      }),
    [animatedValue]
  );

  React.useEffect(() => {
    setContext({ backgroundColor });
  }, [backgroundColor]);

  React.useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: speed,
        easing: Easing.ease,
        useNativeDriver: true
      })
    );
    if (layout?.width && layout?.height) {
      loop.start();
    }
    return () => loop.stop();
  }, [animatedValue, speed, layout?.width, layout?.height]);

  const absoluteTranslateStyle = React.useMemo(
    () => ({ ...StyleSheet.absoluteFillObject, transform: [{ translateX }] }),
    [translateX]
  );

  const getChildren = () => {
    return <SkeletonContext.Provider value={context}>{children}</SkeletonContext.Provider>;
  };

  return layout?.width && layout?.height ? (
    <MaskedView style={{ height: layout.height, width: layout.width }} maskElement={<View>{getChildren()}</View>}>
      <View style={{ flexGrow: 1, backgroundColor }} />
      <Animated.View style={[{ flexDirection: "row" }, absoluteTranslateStyle]}>
        {Array.from({ length: SCREEN_WIDTH }).map((_, index) => {
          const opacity = new Animated.Value(index);
          return (
            <Animated.View
              key={index}
              style={{
                width: 1,
                backgroundColor: highlightColor,
                opacity: opacity.interpolate({
                  inputRange: [0, SCREEN_WIDTH / 2, SCREEN_WIDTH],
                  outputRange: [0, 1, 0]
                })
              }}
            />
          );
        })}
      </Animated.View>
    </MaskedView>
  ) : (
    <View onLayout={(event) => setLayout(event.nativeEvent.layout)}>{getChildren()}</View>
  );
};

SkeletonContainer.defaultProps = skeletonContainerDefaultProps;

export default SkeletonContainer;

export const Skeleton: React.FunctionComponent<ViewProps> = (props) => {
  const { backgroundColor } = React.useContext(SkeletonContext);

  return <View {...props} style={[props.style, { backgroundColor }]} />;
};
