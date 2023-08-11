import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Entypo, MaterialIcons } from '@expo/vector-icons'

const UserTextInput = ({placeholder,isPass,setStateValue,setgetEmailValidation}) => {
    const [value, setValue] = useState("")
    const [showpassword, setShowPassword] = useState(false)
    const [icon, setIcon] = useState(null)
    const [isEmailValid, setisEmailValid] = useState(false)




    const handleTextChange = (text) => {
        setValue(text)
        setStateValue(text);

        if(placeholder==="Email")
        {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const status = emailRegex.test(value);
            setisEmailValid(status)
            setgetEmailValidation(status)
        }
    }

    
    useLayoutEffect(() => {
        switch (placeholder) {
            case "Full Name":
                return setIcon("person")
            case "Email":
                return setIcon("email")
            case "Password":
                return setIcon("lock")
        }

    }, [])


  return (
    <View className={`border rounded-2xl px-4 py-4 flex-row items-center justify-between space-x-4 my-2 ${!isEmailValid && placeholder=='Email'&& value.length>0?"border-red-500":"border-gray-200" }`}>
      <MaterialIcons name={icon}  size={24} color ={"#6c6d83"} />
                
      <TextInput className="flex-1  text-base text-primaryText font-semibold -mt-1" 
      placeholder={placeholder} 
      value={value} 
      onChangeText={handleTextChange}
      secureTextEntry={isPass && showpassword}
      autoCapitalize='none'
      ></TextInput>
    
      {
                isPass && <TouchableOpacity onPress={() => { setShowPassword(!showpassword) }}>
                    <Entypo name={`${showpassword ? "eye" : "eye-with-line"}`} size={26} color="black" />
                </TouchableOpacity>
    }
    
    </View>
  )
}

export default UserTextInput