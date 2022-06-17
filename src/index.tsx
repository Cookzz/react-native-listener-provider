import React, {
  useState,
  createContext,
  useContext
} from 'react'

const ListenerContext = createContext({})

export const useListenerProvider = () => {
  const { addEventListener, emit }: any = useContext(ListenerContext)

  return { addEventListener, emit }
}

const ListenerProvider = (props: any) => {
  const [listeners, setListeners]: any = useState({})

  const addEventListener = (event: string, callback: Function) => {
    setListeners({
      ...listeners,
      [event]: callback
    })
  }

  const emit = (event: string, data: any) => {
    if (listeners[event]) {
      listeners[event](data)
    }
  }

  const value = { addEventListener, emit }

  return (
    <ListenerContext.Provider
      value={value}
    >
      {props.children}
    </ListenerContext.Provider>
  )
}

export default ListenerProvider;
