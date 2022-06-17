# react-native-listener-provider

An alternative to [react-native-event-listener](https://github.com/meinto/react-native-event-listeners).

Either one is fine and has no difference in terms of functionality but this one is specifically built only for react and/or react native using react hooks.

I am also doing this to learn how to build my first react native library.

## Installation

```sh
npm install react-native-listener-provider
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
      // ...
    })
  }, [...])

  // ...

  return (
    // ...
    <TouchableOpacity onPress={()=>{
      ListenerProvider.emit('example', 'test')
    }}>
      <Text>Test Button</Text>
    </TouchableOpacity>
    // ..
  )
}
```

## Notes

There is no restrictions on what kind of data you can pass, so feel free to use strings, numbers, objects, etc.

## Contributing

Cookzz (myself)

## License

MIT
