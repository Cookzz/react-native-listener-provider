# react-native-listener-provider

[![npm version](https://badge.fury.io/js/react-native-listener-provider.svg)](https://badge.fury.io/js/react-native-listener-provider)

An alternative to [react-native-event-listener](https://github.com/meinto/react-native-event-listeners).

Either one is fine and has no difference in terms of functionality. This library is only made with react/react-native in mind and is created with react hooks and typescript.

## Installation

Either npm or yarn works.

```sh
npm install react-native-listener-provider

yarn add react-native-listener-provider
```

## Usage

Add this to the root of your project (either index.js or App.js)

```js
import ListenerProvider from 'react-native-event-listener'

// ...

return (
  <ListenerProvider>
    <App />
  </ListenerProvider>
)
```

Afterwards, you can start using hooks to add listeners and trigger it.

```js
import { useListenerProvider } from 'react-native-event-listener'

// ...

const ExamplePage = (props) => {
  const ListenerProvider = useListenerProvider()

  useEffect(()=>{
    ListenerProvider.addEventListener('example', (data)=>{
      console.log("data", data)
    })
  }, [])

  // ...

  return (
    <View>
      <TouchableOpacity onPress={()=>{
        ListenerProvider.emit('example', 'test')
      }}>
        <Text>Test Button</Text>
      </TouchableOpacity>
    <View>
  )
}
```


### TouchableOpacityListener

It is basically `<TouchableOpacity>` but instead of manually adding an `emit(...)` function to it, it will create a listener based on the provided name, then create an `emit` and merge with your existing `onPress` props.

```js
import { TouchableOpacityListener } from 'react-native-listener-provider'
import { useListenerProvider } from 'react-native-event-listener'

const ExamplePage = (props) => {
  const ListenerProvider = useListenerProvider()

  useEffect(()=>{
    ListenerProvider.addEventListener('example-button', (data)=>{
      console.log("got button", data)
    })
  }, [])
  //...

  return (
    <View>
      <TouchableOpacityListener name="example-button">
        <Text>Press Me</Text>
      </TouchableOpacityListener>
    </View>
  )
}
```

## API

```js
//import and wrap at top level component
import ListenerProvider from 'react-native-listener-provider'

//import hook and custom component
import { useListenerProvider, TouchableOpacityListener } from 'react-native-listener-provider'
```

### Hook methods

Methods/functions returned when using `useListenerProvider()` hook

| Methods             | Parameter         | Returns           | Description                                                           |
| :------------------ | :---------------- | :-----------------| :---------------------------------------------------------------------|
| addEventListener    | string            | string \| boolean | Returns either a unique event listener id or false if an error occurs |
| removeEventListener | string            | boolean           | True if success, false if fail to remove                              |
| removeAllListeners  | void              | void              | Removes all listeners                                                 |
| emitEvent           | string, any       | void              | Sends data over a specified event name                                |
| on                  | string            | string \| boolean | **shorthand** for addEventListener                                    |
| rm                  | boolean           | boolean           | **shorthand** for removeEventListener                                 |
| rmAll               | boolean           | boolean           | **shorthand** for removeAllListeners                                  |
| emit                | string, any       | void              | **shorthand** for emitEvent                                           |


### TouchableOpacityListener Props

Inherits all of `TouchableOpacity`'s props with some additional custom/new props added.

| Name               | Type     | Required | Default         | Description                                                |
| ------------------ | -------- | -------- | --------------- | ---------------------------------------------------------- |
| name               | string   | No       | touchable-event | Unnamed components will share the same default event name  |
| onPress            | function | No       |                 |                                                            |

## Notes

There is no restrictions on what kind of data you can pass, so feel free to use strings, numbers, objects, etc.

## Contributing

Cookzz (myself)

## License

MIT
