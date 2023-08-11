import { View, Text, Dimensions,Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { BGImage, Logo } from '../assets'
import { UserTextInput } from '../components';
import { useNavigation } from '@react-navigation/native';
import { avatars } from '../utils/supports';
import { Entypo } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth, firestoreDB } from '../config/firebase.config';
import { Firestore, doc, setDoc } from 'firebase/firestore';





const SignUpScreen = () => {
  const screenWidth = Math.round(Dimensions.get("window").width);
  const screenHeight = Math.round(Dimensions.get("window").height);

  const [name, setName] = useState(" ")
  const[email,setEmail]=useState("")
  const [password, setpassword] = useState(" ")
  const [isAvatarMenu, setisAvatarmenu] = useState(false)
  const [getEmailValidation,setgetEmailValidation]= useState(false)


  const [avatar, setavatar] = useState(avatars[0].image.asset.url)
  const navigation = useNavigation()

  
  const handleAvatar = (item) => {
    setavatar(item.image.asset.url)
    setisAvatarmenu(false)
}

//authentication handle now push the data to firebase database
const handleSignUP= async ()=>{
  if(getEmailValidation && email!== "")
  {
    await createUserWithEmailAndPassword(firebaseAuth,email,password).then((userCred)=>{
        const data = {
          _id :userCred?.user.uid,
          fullname: name,
          profilePic: avatar,
          providerData: userCred.user.providerData[0]
        }
        setDoc(doc(firestoreDB,'users',userCred?.user.uid), data).then(()=>{
          navigation.navigate("LoginScreen")
        })
    })
  }
    
}

  return (
    <View className="flex-1 items-center justify-start">
    <Image source={BGImage} resizeMode="cover" className="h-96" style={{ width: screenWidth }}/>

    {/* list of avatar */}
    {
                    isAvatarMenu && <View className="absolute inset-0  z-10" style={{ width: screenWidth, height: screenHeight }}>
                        <ScrollView>
                            <BlurView className="w-full h-full px-4 py-5 flex-row flex-wrap items-center justify-evenly" tint='light' intensity={90} style={{ width: screenWidth, height: screenHeight }}>
                                {avatars?.map((item) => (
                                    <ScrollView >
                                        <TouchableOpacity key={item._id} onPress={() => handleAvatar(item)}  className="w-20 h-20 mt-7 ml-1 rounded-full border-2 border-primary relative">
                                            <Image source={{ uri: item.image.asset.url }} className="w-full h-full " resizeMode='contain' />
                                        </TouchableOpacity>
                                    </ScrollView>
                                ))}
                            </BlurView>
                        </ScrollView>
                    </View>
                }       


    {/* Main view */}
    <View className="w-full h-full bg-white rounded-tl-[90px] -mt-60 flex items-center justify-start py-8 px-6 space-y-6">
    <Image source={Logo} className="w-16 h-16" resizeMode='contain' />
    <Text className="py-0 text-primaryText text-xl font-semibold">
    Join with us!
      
        </Text>


                <View className="w-full flex items-center justify-center">
                

                    {/* avatar */}
                    <View className="w-full flex items-center justify-center relative my-0">
                        <TouchableOpacity onPress={() => setisAvatarmenu(true)} className="w-20 h-20 rounded-full border-2 border-primary relative" >
                            <Image source={{ uri: avatar }} className="w-full h-full " resizeMode='contain' />
                            <View className="w-6 h-6 bg-primary rounded-full absolute top-0 right-0 flex items-center justify-center">
                                <Entypo name="edit" size={18} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>


                    {/* Full Name */}
                    <UserTextInput placeholder="Full Name" isPass={false} setStateValue={setName} />

                    {/* email */}
                    <UserTextInput placeholder="Email" isPass={false} setStateValue={setEmail} setgetEmailValidation={setgetEmailValidation}/>

                    {/* passward */}
                    <UserTextInput placeholder="Password" isPass={true} setStateValue={setpassword} />

                    {/* login button */}
                  
                    <TouchableOpacity onPress={handleSignUP} className="w-full px-2 py-3 rounded-xl bg-primary my-3 flex items-center">
                        <Text className="text-cyan-50 font-bold">Sign Up</Text>
                    </TouchableOpacity>
                    <View className="w-full py-0 flex-row items-center justify-center">
                    <Text className=" text-primaryText">Have an Account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                        <Text >Login Here</Text>
                    </TouchableOpacity>

                </View>
              
        </View>
      </View> 

    </View>
  )
}

export default SignUpScreen