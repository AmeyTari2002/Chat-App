import React, { useState } from 'react'
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, Text,Image, TouchableOpacity, TextInput } from 'react-native'
import { useSelector } from 'react-redux'
import { Entypo } from '@expo/vector-icons';
import { doc, setDoc } from 'firebase/firestore'
import { firestoreDB } from '../config/firebase.config'

const AddToChartScreen = () => {
    const navigation =useNavigation()
    const [addChat, setaddChat] = useState("")
  const user = useSelector(state => state.user.user);
  

  const createNewChat=async()=>
  {
    let id = `${Date.now()}`
    const _doc = {
        _id : id,
        user : user,
        chatName: addChat
    }

    if(addChat !== " ")
    {
        setDoc(doc(firestoreDB,"chats",id),_doc).then(()=>{
            setaddChat("")
            navigation.replace("HomeScreen")
        }).catch((err)=>{
                alert("Error : " , err);
        })
    }
  }
  const onName = (text)=>{
    setaddChat(text)
  }


  return (
    <View className="flex-1">
       <View className="w-full bg-primary px-5 py-6 flex-[0.28]">
       <View className=" flex-row items-center justify-between w-full px-4 py-12">
           {/* go back   */}
           <TouchableOpacity onPress={()=> navigation.goBack()}>
            <Entypo  name="chevron-left" size={24} color="white" />
            </TouchableOpacity>

            {/* lats section  */}
            <View className=" flex-row items-center justify-center space-x-3">
            <Image source={{uri:user?.profilePic}} className="w-12 h-12" resizeMode='contain'/>
            </View>
        </View>

       </View>
       {/* bottom section  */}
       <View className="w-full bg-white px-4 py-6 rounded-3xl flex-1 rounded-t-[50px] -mt-10">
        <View className=" w-full px-4 py-4 ">
            <View className="w-full  px-4 flex-row items-center justify-between py-3 rounded-xl border border-gray-200 space-x-2">
               {/* icon */}
               <Ionicons name="chatbubbles" size={24} color="black" />
                {/* text  */}
                <TextInput onChangeText={onName} value={addChat} className="flex-1 text-lg text-primaryText -mt-2 h-13 w-full" placeholder='Create a Chat' placeholderTextColor={"#999"}/>
                {/* icon  */}
                <TouchableOpacity onPress={createNewChat}>
                <FontAwesome name="send" size={24} color="black" />
                </TouchableOpacity>                
                </View>

        </View>

       </View>

    </View>
  )
}

export default AddToChartScreen
