"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skeleton = exports.SkeletonContainer = exports.SkeletonContext = void 0;
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const masked_view_1 = __importDefault(require("@react-native-community/masked-view"));
const SCREEN_WIDTH = react_native_1.Dimensions.get("window").width;
exports.SkeletonContext = React.createContext({
    backgroundColor: "#E1E9EE"
});
const skeletonContainerDefaultProps = {
    backgroundColor: "#E1E9EE",
    speed: 800,
    highlightColor: "#F2F8FC"
};
const SkeletonContainer = (props) => {
    const { children, backgroundColor, speed, highlightColor } = props;
    const [context, setContext] = React.useState({ backgroundColor });
    const [layout, setLayout] = React.useState();
    const animatedValue = React.useMemo(() => new react_native_1.Animated.Value(0), []);
    const translateX = React.useMemo(() => animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-SCREEN_WIDTH, SCREEN_WIDTH]
    }), [animatedValue]);
    React.useEffect(() => {
        setContext({ backgroundColor });
    }, [backgroundColor]);
    React.useEffect(() => {
        const loop = react_native_1.Animated.loop(react_native_1.Animated.timing(animatedValue, {
            toValue: 1,
            duration: speed,
            easing: react_native_1.Easing.ease,
            useNativeDriver: true
        }));
        if ((layout === null || layout === void 0 ? void 0 : layout.width) && (layout === null || layout === void 0 ? void 0 : layout.height)) {
            loop.start();
        }
        return () => loop.stop();
    }, [animatedValue, speed, layout === null || layout === void 0 ? void 0 : layout.width, layout === null || layout === void 0 ? void 0 : layout.height]);
    const absoluteTranslateStyle = React.useMemo(() => (Object.assign(Object.assign({}, react_native_1.StyleSheet.absoluteFillObject), { transform: [{ translateX }] })), [translateX]);
    const getChildren = () => {
        return <exports.SkeletonContext.Provider value={context}>{children}</exports.SkeletonContext.Provider>;
    };
    return (layout === null || layout === void 0 ? void 0 : layout.width) && (layout === null || layout === void 0 ? void 0 : layout.height) ? (<masked_view_1.default style={{ height: layout.height, width: layout.width }} maskElement={<react_native_1.View>{getChildren()}</react_native_1.View>}>
      <react_native_1.View style={{ flexGrow: 1, backgroundColor }}/>
      <react_native_1.Animated.View style={[{ flexDirection: "row" }, absoluteTranslateStyle]}>
        {Array.from({ length: SCREEN_WIDTH }).map((_, index) => {
        const opacity = new react_native_1.Animated.Value(index);
        return (<react_native_1.Animated.View key={index} style={{
            width: 1,
            backgroundColor: highlightColor,
            opacity: opacity.interpolate({
                inputRange: [0, SCREEN_WIDTH / 2, SCREEN_WIDTH],
                outputRange: [0, 1, 0]
            })
        }}/>);
    })}
      </react_native_1.Animated.View>
    </masked_view_1.default>) : (<react_native_1.View onLayout={(event) => setLayout(event.nativeEvent.layout)}>{getChildren()}</react_native_1.View>);
};
exports.SkeletonContainer = SkeletonContainer;
exports.SkeletonContainer.defaultProps = skeletonContainerDefaultProps;
exports.default = exports.SkeletonContainer;
const Skeleton = (props) => {
    const { backgroundColor } = React.useContext(exports.SkeletonContext);
    return <react_native_1.View {...props} style={[props.style, { backgroundColor }]}/>;
};
exports.Skeleton = Skeleton;
//# sourceMappingURL=index.js.map