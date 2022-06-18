import React, {
  useState,
  createContext,
  useContext
} from 'react'

interface ListenerContextProps {
  addEventListener: (event: string, callback: Function) => string
  removeEventListener: (eventId: string) => boolean
  removeAllListeners: () => void
  emitEvent: (event: string, data: any) => void
  on: (event: string, callback: Function) => string
  rm: (eventId: string) => boolean
  rmAll: () => void
  emit: (event: string, data: any) => void
}

const ListenerContext = createContext({} as ListenerContextProps)

export const useListenerProvider = () => useContext(ListenerContext)

const ListenerProvider = (props: any) => {
  const [listeners, setListeners]: any = useState({})

  const addEventListener = (event: string, callback: Function): any => {
    if (
      typeof event === 'string' &&
      typeof callback === 'function'
    ){
      const eventId = `${event}-${Date.now()}`

      setListeners({
        ...listeners,
        [eventId]: {
          name: event,
          callback
        }
      })

      return eventId
    }

    return false
  }

  const removeEventListener = (eventId: string): boolean => {
    if (typeof eventId === 'string') {
      const newListeners = { ...listeners }

      delete newListeners[eventId]

      setListeners(newListeners)

      return true
    }

    return false
  }

  const removeAllListeners = (): void => {
    setListeners({})
  }

  const emitEvent = (event: string, data: any): void => {
    Object.keys(listeners).forEach((id: string) => {
      if (listeners?.[id]?.name === event) {
        listeners[id].callback(data)
      }
    })
  }

  /* shortener */
  const on = (event: string, callback: Function): string => {
    return addEventListener(event, callback)
  }

  const rm = (eventId: string): boolean => {
    return removeEventListener(eventId)
  }

  const rmAll = (): void => {
    removeAllListeners()
  }

  const emit = (event: string, data: any): void  => {
    emitEvent(event, data)
  }

  const value = {
    addEventListener,
    removeEventListener,
    removeAllListeners,
    emitEvent,

    emit,
    on,
    rm,
    rmAll
  }

  return (
    <ListenerContext.Provider
      value={value}
    >
      {props.children}
    </ListenerContext.Provider>
  )
}

export default ListenerProvider;
