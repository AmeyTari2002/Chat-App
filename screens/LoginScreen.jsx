import { View, Text, Dimensions,Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { BGImage, Logo } from '../assets'
import { UserTextInput } from '../components';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth, firestoreDB } from '../config/firebase.config';
import { useDispatch } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { SET_USER } from '../context/actions/userActions';


const LoginScreen = () => {
  const screenWidth = Math.round(Dimensions.get("window").width);
  const[email,setEmail]=useState("")
  const [password, setpassword] = useState(" ")
  const [getEmailValidation,setgetEmailValidation]= useState(false)
  
  const [alert, setAlert] = useState(false)
  const [alertMessage, setalertMessage] = useState("")
  const navigation = useNavigation()

  const dispatch  = useDispatch()


  const handleLogin=async()=>{
    if(getEmailValidation && email!== "")
    {
      await signInWithEmailAndPassword(firebaseAuth,email,password).then((userCred)=>{
        if(userCred)
        {
          console.log("User Id", userCred?.user.uid);
          getDoctDoc(doc(firestoreDB,'users', userCred?.user.uid)).then((docSnap) =>{
            if(docSnap.exists())
            {
              console.log("User Data: ",docSnap.data());
              dispatch(SET_USER(docSnap.data()))
            }
          })
        }
      })
      .catch(err =>{
        console.log("Error: ", err.message)
        if(err.message.includes("wrong-password"))
        {
          setAlert(true)
          setalertMessage("Password MisMatch")
        }
        else if(err.message.includes("user-not-found"))
        {
          setAlert(true);
          setalertMessage("User Not Found")
        }
        else
        {
          setAlert(true)
          setalertMessage("Invalid Email")
        }
        setInterval(() => {
          setAlert(false)
        }, 4000);

      })
    }


  }

  
  return (
    <View className="flex-1 items-center justify-start">
    <Image source={BGImage} resizeMode="cover" className="h-96" style={{ width: screenWidth }}/>

    {/* Main view */}
    <View className="w-full h-full bg-white rounded-tl-[90px] -mt-60 flex items-center justify-start py-12 px-6 space-y-6">
    <Image source={Logo} className="w-16 h-16" resizeMode='contain' />
    <Text className="py-2 text-primaryText text-xl font-semibold">
      Welcome Back
        </Text>
        <View className="w-full flex items-center justify-center">

                    {/* alert */}
                    {
                      alert && (
                    <Text className="text-base text-red-600">{alertMessage}</Text>

                      )
                    }
                    {/* email */}
                    <UserTextInput placeholder="Email" isPass={false} setStateValue={setEmail} setgetEmailValidation={setgetEmailValidation} />

                    {/* passward */}
                    <UserTextInput placeholder="Password" isPass={true} setStateValue={setpassword} />

                    {/* login button */}
                  
                    <TouchableOpacity onPress={handleLogin} className="w-full px-2 py-4 rounded-xl bg-primary my-3 flex items-center">
                        <Text  className="text-cyan-50 font-bold">Sign In</Text>
                    </TouchableOpacity>
                    <View className="w-full py-0 flex-row items-center justify-center">
                    <Text className=" text-primaryText">Don't have an Account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
                        <Text > Create Here</Text>
                    </TouchableOpacity>

                </View>
        </View>
      </View> 
    </View>
  )
}

export default LoginScreen