import { Image,View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, TextInput } from 'react-native'
import React from 'react'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { firestoreDB } from '../config/firebase.config'

const ChatScreen = ({route}) => {
    const{room} = route.params
    console.log(message)
    const navigation =useNavigation();
    const [isLoading, setisLoading] = useState(true)
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState(null)
    const textInputRef = useRef();


    
   const user = useSelector(state => state.user.user);
    

    const handleKeyboardOpen = ()=>{
      if(textInputRef.current)
       textInputRef.current.focus();  
    }
 


    const sendMessage = async()=>{
    // console.log(message)

        const timeStamp = serverTimestamp()
        const id = `${Date.now()}`
        const _doc = {
            _id : id,
            roomId: room._id,
            timeStamp: timeStamp,
            message:message,
            user:user
        }
        setMessage("")
        await addDoc(collection(doc(firestoreDB,"chats" , room._id),"messages"),
        _doc)
        .then(()=>{})
        .catch((err)=>console.log(err))

    }


    useEffect(() => {
      const msgQuery = query(
        collection(firestoreDB,"chats",room?._id,"messages"),
        orderBy("timeStamp","asc")
      )
    
      const unsubscribe = onSnapshot(msgQuery,(querySnap)=>{
        const upMsg = querySnap.docs.map((doc) => doc.data())
        setMessages(upMsg)
        setisLoading(false)
      })

      return unsubscribe
     
    }, [])
    

  return (

    <View className="flex-1">
       <View className="w-full bg-primary px-5 py-6 flex-[0.22]">
       <View className=" flex-row items-center justify-between w-full px-3 py-12">
        {/* go back   */}
        <TouchableOpacity onPress={()=> navigation.goBack()}>
         <Entypo  name="chevron-left" size={24} color="white" />
         </TouchableOpacity>
         {/* middel  */}
         <View className=" flex-row items-center justify-between space-x-3">
                 <View className="w-12 h-12 rounded-full border border-white flex items-center justify-center">
                 <FontAwesome name='users' size={24} color="#fbfbfb"/>
                 </View>
             </View>
         
             <View >
             <Text className="text-gray-100 text-sm " >{room.chatName.length > 14 ? `${room.chatName.slice(0,14)}..`:room.chatName}{" "}</Text>
             <Text className="text-gray-100 text-sm font-semibold capitalize">
                 online
             </Text>
             </View>
     

         {/* lats section  */}
         <View className=" flex-row items-center justify-center space-x-4">
             <TouchableOpacity>
             <FontAwesome name="video-camera" size={24} color="white" />
             </TouchableOpacity>
             <TouchableOpacity>
             <FontAwesome name="phone" size={24} color="white" />
             </TouchableOpacity>
             <TouchableOpacity>
             <Entypo name="dots-three-vertical" size={24} color="white" />
             </TouchableOpacity>
         </View>
     </View>



    </View>
    {/* bottom section  */}
    <View className="w-full bg-white px-3 py-4 rounded-3xl flex-1 rounded-t-[50px] -mt-10">
      
        <>
        <ScrollView>
            {
                isLoading ? (
                <>
                    <View className="w-full flex items-center justify-center">
                        <ActivityIndicator size={"large"} color={"#43C651"}/>
                    </View>
            </>
         
               
                ):(
                <>
                {/* message */}
                {
                    messages?.map((msg , i) => msg.user.providerData.email === user.providerData.email ? (
                    
                        <View className="m-1" key={i}>
                    <View style={{alignSelf :"flex-end"}} className="px-4 py-2 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl bg-primary w-auto relative">
                            <Text className="text-base font-semibold text-white">
                                {msg.message}
                            </Text>
                        </View>
                        <View>
                            <View style={{alignSelf:"flex-end"}}>
                                {
                                    msg?.timeStamp?.seconds && (
                                        <Text>
                                            {new Date(parseInt(msg?.timeStamp?.seconds) * 1000).toLocaleTimeString('en-IN', {
                                                hour: "numeric",
                                                minute: "numeric",
                                                hour12: true,
                                            })}
                                        </Text>
                                    )
                                }

                            </View>
                        </View>
                    </View>
                    
                    ):(
                        
                            <View key ={i}  style={{alignSelf: "flex-start"}} className="flex items-center justify-center skew-x-2">
                                <View className="flex-row items-center justify-center space-x-2">
                                    {/* image  */}
                                    <Image className="w-12 h-12  rounded-full " resizeMode='cover' source={{uri: msg?.user?.profilePic}}/>
                                    {/* <Image className="w-12 h-12 rounded-full" 
                                    resizeMode="cover" 
                                    source={{url: msg?.user?.profilePic}} /> */}
                                    {/* text  */}
                                    <View  >
                                        <View style={{alignSelf :"flex-start"}} className="px-6 py-2 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl bg-green-800 w-auto relative">
                                                <Text className="text-base font-semibold text-white">
                                                    {msg.message}
                                                </Text>
                                        </View>
                                        <View>
                                            <View style={{alignSelf:"flex-end"}}>
                                            {
                                                msg?.timeStamp?.seconds && (
                                            <Text>
                                                    {new Date(parseInt(msg?.timeStamp?.seconds) * 1000).toLocaleTimeString('en-IN', {
                                                        hour: "numeric",
                                                        minute: "numeric",
                                                        hour12: true,
                                                    })}
                                            </Text>
                                            )
                                            }

                                     </View>
                                </View>
                            </View>
                    </View>

         </View>

                    ))
                }
                </>
                )
            }
            
        </ScrollView>
        <View className="w-full flex-row items-center justify-center px-8">
            <View className="bg-gray-200 rounded-2xl px-4 space-x-4 py-2 flex-row items-center justify-center">
            <TouchableOpacity onPress={handleKeyboardOpen}>
            <Entypo name="emoji-happy" size={24} color="grey" />    
            </TouchableOpacity>
            <TextInput className="flex-1 h-8 text-base text-primaryText font-semibold" placeholder='type here....' value={message} onChangeText={(text)=>setMessage(text)
            }/>
            
            <TouchableOpacity>
                 <Entypo name="mic" size={24} color="green" />    
            </TouchableOpacity>
            </View>
            <TouchableOpacity className="ml-2" onPress={sendMessage}>
            <FontAwesome name="send" size={24} color="black" />    
            </TouchableOpacity>


        </View>
        </>
    
     </View>
</View>
  )
}

export default ChatScreen