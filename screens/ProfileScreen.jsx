import { View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'
import { firebaseAuth } from '../config/firebase.config';
import { SET_USER_NULL } from '../context/actions/userActions';

const ProfileScreen = () => {
  const user = useSelector(state => state.user.user);
  const navigation =useNavigation()
  const dispatch = useDispatch()

  console.log(user.fullname)

  const logout =async()=>
  {
    await firebaseAuth.signOut(()=>{
        dispatch(SET_USER_NULL());
        navigation.replace("LoginScreen")
    })
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-start mt-10">
        {/* icons  */}
        <View className="w-full flex-row items-center justify-between px-4">
        <TouchableOpacity onPress={()=> navigation.goBack()}>
         <Entypo  name="chevron-left" size={24} color="green" />
         </TouchableOpacity>
         <TouchableOpacity>
             <Entypo name="dots-three-vertical" size={24} color="green" />
             </TouchableOpacity>
        </View>
        
            {/* profile  */}
         <View className="items-center justify-center mt-5">
            <View className="relative border-2 border-primary p-3 rounded-full">
                <Image source={{uri:user?.profilePic}} className="w-24 h-24" resizeMode='contain'/>
            </View>
            <Text className="text-2xl font-semibold text-primaryBold pt-5">
                {user?.fullname}
            </Text>
            <Text className="text-lg font-semibold text-primaryText">
                {user?.providerData.email}
            </Text>
        </View>      
        {/* icons */}
         <View className="w-full py-2 flex-row items-center justify-evenly py-6">
            <View className="items-center justify-center">
                <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-lg bg-gray-400">
                <MaterialIcons name="messenger-outline" size={24} color={"#555"} />
                </TouchableOpacity>
                <Text className="text-sm text-primaryText py-1">Message</Text>
            </View>
            <View className="items-center justify-center">
                <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-lg bg-gray-400">
                <Feather name="video" size={24} color={"#555"} />
                </TouchableOpacity>
                <Text className="text-sm text-primaryText py-1">Video Call</Text>
            </View>
            <View className="items-center justify-center">
                <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-lg bg-gray-400">
                    <Entypo name="dots-three-vertical" size={24} color="green" />
                </TouchableOpacity>
                <Text className="text-sm text-primaryText py-1">Message</Text>
            </View>
         </View>


         {/* media shared option  */}
         <View className="w-full px-6  py-3 space-y-3">
            <View className="w-full flex-row items-center justify-between">
                <Text className="text-base font-semibold text-primaryText uppercase">Media Shared</Text>
                <TouchableOpacity>
                        <Text className="text-base font-semibold uppercase text-primaryText">
                            View All
                        </Text>
                </TouchableOpacity>
            </View>
            <View className="w-full flex-row items-center justify-between">
                <TouchableOpacity className="w-24 h-24 m-1 rounded-xl bg-gray-300 overflow-hidden">
                    <Image
                    source={{
                        uri:"https://cdn.pixabay.com/photo/2023/07/25/19/47/milky-way-8149815_1280.jpg"
                    }} className="w-full h-full"/> 
                </TouchableOpacity>
                <TouchableOpacity className="w-24 h-24 m-1 rounded-xl bg-gray-300 overflow-hidden">
                    <Image
                    source={{
                        uri:"https://cdn.pixabay.com/photo/2017/02/01/22/02/mountain-landscape-2031539_1280.jpg"
                    }} className="w-full h-full"/> 
                </TouchableOpacity>
                <TouchableOpacity className="w-24 h-24 m-1 rounded-xl bg-gray-300 overflow-hidden">
                    <Image
                    source={{
                        uri:"https://cdn.pixabay.com/photo/2023/05/12/19/02/mountains-7989160_1280.jpg"
                    }} className="w-full h-full"/> 
                </TouchableOpacity>
            </View>
            <View className="flex items-center justify-center py-8">
                <TouchableOpacity onPress={logout}>
                    <Text className="text-xl bg-primary p-2 px-7 rounded-lg text-white">
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
         </View>

    </SafeAreaView>
    
  )
}

export default ProfileScreen









// import { View, Text , Image ,TouchableOpacity } from 'react-native'
// import React from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { useNavigation } from '@react-navigation/native'
// import { useSelector } from 'react-redux'
// import { Entypo } from '@expo/vector-icons'
// const ProfileScreen = () => {
//     const navigation = useNavigation()
//     const user = useSelector(state => state.user.user);
  
//   return (
//         
        
       
//     </SafeAreaView>
//   )
// }

// export default ProfileScreen