## SkeletonPlaceholder

SkeletonPlaceholder is a React Native library to easily create an amazing loading effect with FlexBox.<br/>
Android and iOS

## Changes

I (nicolaslazzos) improved this library so you can pass custom components as children. See the example.

![](https://i.imgur.com/3aDeSTZ.gif)

### Installation

> Note: This package requires the dependency **@react-native-community/masked-view**.<br/>If your project includes the react-navigation >= 4.x you probably already have it installed and you can SKIP de Step #1

###### Step #1

Using yarn:

```bash
yarn add @react-native-community/masked-view
```

Using npm:

```bash
npm install @react-native-community/masked-view --save
```

If you are running a **react-native** version below 0.60:

```bash
react-native link @react-native-community/masked-view
```

Otherwise:

```bash
cd ios
pod install
```

&nbsp;&nbsp;

###### Step #2

Using yarn:

```bash
yarn add react-native-skeleton-placeholder
```

Using npm:

```bash
npm install react-native-skeleton-placeholder --save
```

### Usage

```javascript
import React from "react";
import { View } from "react-native";
import { SkeletonContainer, Skeleton } from "react-native-skeleton-placeholder";

const App = () => {
  return (
    <SkeletonContainer>
      <View style={{ flexDirection: "row", alignContent: "center", padding: 16 }}>
        <Skeleton style={{ height: 70, width: 70, borderRadius: 6 }} />
        <View style={{ flex: 1, justifyContent: "center", marginLeft: 16 }}>
          <Skeleton style={{ height: 16, width: "50%", borderRadius: 6, marginBottom: 10 }} />
          <Skeleton style={{ height: 16, width: "30%", borderRadius: 6, marginBottom: 10 }} />
          <Skeleton style={{ height: 16, width: "70%", borderRadius: 6 }} />
        </View>
      </View>
    </SkeletonContainer>
  );
};
```

Also you can do things like this, that wasn't possible with the original library.

```javascript
import React from "react";
import { View } from "react-native";
import { SkeletonContainer, Skeleton } from "react-native-skeleton-placeholder";

const App = () => {
  return (
    <SkeletonContainer>
      <ListItem />
      <ListItem />
    </SkeletonContainer>
  );
};

const ListItem = () => {
  return (
    <View style={{ flexDirection: "row", alignContent: "center", padding: 16 }}>
      <Skeleton style={{ height: 70, width: 70, borderRadius: 6 }} />
      <View style={{ flex: 1, justifyContent: "center", marginLeft: 16 }}>
        <Skeleton style={{ height: 16, width: "50%", borderRadius: 6, marginBottom: 10 }} />
        <Skeleton style={{ height: 16, width: "30%", borderRadius: 6, marginBottom: 10 }} />
        <Skeleton style={{ height: 16, width: "70%", borderRadius: 6 }} />
      </View>
    </View>
  );
};
```

### Properties

#### SkeletonContainer

|      Prop       |                  Description                   |  Type  |  Default  |
| :-------------: | :--------------------------------------------: | :----: | :-------: |
| backgroundColor |      Determines the color of placeholder       | string | _#E1E9EE_ |
| highlightColor  | Determines the highlight color of placeholder  | string | _#F2F8FC_ |
|      speed      | Determines the animation speed in milliseconds | number |   _800_   |

#### Skeleton

| Prop |         Description         | Type | Default |
| :--: | :-------------------------: | :--: | :-----: |
| any  | Any view props was accepted | any  |

### Contributing

You are welcome to contribute!

### License

[MIT](https://choosealicense.com/licenses/mit/)
