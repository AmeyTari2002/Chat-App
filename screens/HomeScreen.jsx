import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Logo } from '../assets';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {  collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { firestoreDB } from '../config/firebase.config';


const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [chats,setChats] = useState(null)
  const user = useSelector(state => state.user.user);
  const navigation = useNavigation()



  useLayoutEffect(()=>{
    const chatQuery = query(collection(firestoreDB,"chats"),orderBy("_id","desc"))
    //event listenner in firestore whenever a new data or exisiting data will be deleted / or modified/this will trigger otomatically
    const unsubcribe = onSnapshot(chatQuery,(querySnapShot)=>{
    
      const chatRooms = querySnapShot.docs.map(doc=>doc.data())
      setChats(chatRooms)
      setIsLoading(false)
    })
    // return the unscribe to stop listining to the upadates
    return unsubcribe
  },[])



  return (
    <ScrollView className="w-full px-4 pt-4 ">
    <View className="flex-1 ">
      
      <SafeAreaView>

        <View className="w-full flex-row items-center justify-between px-4 py-9">
        <Image source={Logo} className="w-12 h-12" resizeMode='contain'/>
        <TouchableOpacity onPress={()=> navigation.navigate("ProfileScreen")} className="w-12 h-12 rounded-full border border-primary flex items-center justify-center ">
        <Image source={{uri:user?.profilePic}} className="w-12 h-12" resizeMode='contain'/>
        </TouchableOpacity>
        </View>
       
        

        

          <View className="w-full px-4 ">
            <View >
              <View className="w-full flex-row items-center justify-between px-0">
                <Text className="text-primaryText text-base font-extrabold pb-1">
                  Message
                </Text>
                <TouchableOpacity onPress={()=> navigation.navigate("AddToChartScreen")}>
                  <Ionicons name="chatbox" size={28} color="#555"/>
                </TouchableOpacity>
              </View>
            </View>


          {isLoading ?  <><View className="w-full flex items-center justify-center">
              <ActivityIndicator size={"large"} color={"#43C651"}/>
            </View></> : <>
            {
              chats && chats?.length > 0 ? (<>
              {chats?.map(room=> <MessageCard key={room._id} room={room}/> 
              )}
              </>
              ):(<></>)
            }
            </>}

          </View>


      </SafeAreaView>
    </View>    
 </ScrollView>

  )
}


const MessageCard =({room})=>
{
  const navigation = useNavigation()
  
  return (
    <TouchableOpacity onPress={()=> navigation.navigate("ChatScreen" , {room:room})} className="w-full flex-row items-center justify-start py-2 px-0">
      {/* image */}
      <View className="w-16 h-16 rounded-full flex items-center border-2  border-primary p-0 justify-center">
        <FontAwesome name='users' size={24} color="#555"/>
      </View>
      {/* content */}
      <View className="flex-1 flex items-start justify-center mt-4 ml-5">
          <Text className="text-[#333] text-base font-semibold capitalize">{room.chatName}</Text>
          <Text className="text-primaryText text-sm">
            Lorem ipsum dolor sit amet 
          </Text>
      </View>
      {/* time  */}
      <Text className="text-primary px-4 text-base  font-semibold">27 min</Text>
    </TouchableOpacity>
  )
}
  
export default HomeScreen