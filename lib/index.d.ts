import * as React from "react";
import { ViewProps } from "react-native";
interface SkeletonContextProps {
    backgroundColor?: string;
}
export declare const SkeletonContext: React.Context<SkeletonContextProps>;
interface SkeletonContainerProps {
    children?: React.ReactNode;
    backgroundColor?: string;
    highlightColor?: string;
    speed?: number;
}
export declare const SkeletonContainer: React.FunctionComponent<SkeletonContainerProps>;
export default SkeletonContainer;
export declare const Skeleton: React.FunctionComponent<ViewProps>;
//# sourceMappingURL=index.d.ts.map