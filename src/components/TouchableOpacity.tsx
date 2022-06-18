import React, {
  useEffect
} from 'react'
import {
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native'
import { useListenerProvider } from '../provider/Provider'

interface TouchableOpacityListenerProps extends TouchableOpacityProps {
  name?: string;
  onPress?: (event: any, data?: any) => void;
}

const TouchableOpacityListener = (props: TouchableOpacityListenerProps): JSX.Element => {
  const temp_name = "touchable-event"

  const { addEventListener, removeEventListener, emit } = useListenerProvider()

  useEffect(()=>{
    const id = addEventListener((props?.name ? props.name : temp_name), ()=>{})

    return () => {
      removeEventListener(id)
    }
  }, [])

  const onListenerPressed = (event: any) => {
    if (props?.onPress){
      props.onPress(event)
    }

    emit((props?.name ? props.name : temp_name), event)
  }

  //appends a listener to the button instead and also allow the user to still use the normal onPress function
  return (
    <TouchableOpacity
      {...props}
      onPress={onListenerPressed}
    />
  )
}

export default TouchableOpacityListener
