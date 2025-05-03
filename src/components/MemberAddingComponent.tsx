import { ScrollView, StyleSheet, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import ThemedInput from './ThemedInput'
import DropDownPicker from 'react-native-dropdown-picker'
import ThemedButton from './ThemedButton'
import { useTheme } from '../theme/ThemeContext'
import { dimensions } from '../constants/dimensions'
import { memberErrorsPayload, memberPayload } from '../types/commonTypes'
import { memberApi } from '../api/api'
import { AxiosError } from 'axios'
import { toast } from 'sonner-native'
import useAppNavigation from '../hooks/useAppNavigation'
import useToggler from '../hooks/useToggler'
import ConfirmationModal from './ConfirmationModal'
import { storage } from '../storage/storage'
import useLoader from '../hooks/useLoader'
import LoaderScreen from './LoaderScreen'

type Props = {
  memberData?: memberPayload,
  isUpdating: boolean,
  onPress:(userData:memberPayload) => void, 
  onDelete?:any,
  memberId?:string
}

const MemberAddingComponent = ({ memberData, isUpdating,onPress,onDelete,memberId }: Props) => {
  const { theme } = useTheme();

  const { navigateToDashBoardScreen } = useAppNavigation()

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ]);

  const [userData, setUserData] = useState<memberPayload>({
    age: isUpdating ? Number(memberData?.age) : Number(''),
    email: isUpdating ? memberData?.email || '' : '',
    gender: isUpdating ? memberData?.gender || '' : '',
    name: isUpdating ? memberData?.name || '' : ''
  });

  const [genderValue, setGenderValue] = useState<string | null>(isUpdating ? memberData?.gender || null : null);

  useEffect(() => {
    if (genderValue) {
      setUserData((prev) => ({ ...prev, gender: genderValue }));
    }
  }, [genderValue]);

  const [errors,setErrors] = useState<memberErrorsPayload>({
    email:'',
    age: '',
    gender:'',
    name:''
  })

  const { loading,startLoading,stopLoading } = useLoader()
  const validationCheck = () => {
    let hasError = false;
    const newErrors: memberErrorsPayload = {
      email: '',
      age: '',
      gender: '',
      name: ''
    };
  
    if (userData.name.trim() === '') {
      newErrors.name = 'Please enter member name';
      hasError = true;
    }
    if (userData.email.trim() === '') {
      newErrors.email = 'Please enter email id';
      hasError = true;
    }
    if (userData.age === 0 || isNaN(userData.age)) {
      newErrors.age = 'Please enter age';
      hasError = true;
    }
    if (userData.gender.trim() === '') {
      newErrors.gender = 'Please choose gender';
      hasError = true;
    }
  
    if (hasError) {
      setErrors(newErrors);
      return false;
    } else {
      setErrors({
        email: '',
        age: '',
        gender: '',
        name: ''
      });
      return true;
    }
  };

  const handleRegisterMember = () => {
    startLoading()
    const hasPermitted = validationCheck();
    if(hasPermitted){
      onPress(userData as memberPayload)
    }
    stopLoading()
  }

  
  
  const hanldeUpdateMember = async() => {
    startLoading()
    const token = storage.getString('token')
    const hasPermitted = validationCheck();
    if(!hasPermitted)
    return;

    if(userData.age === memberData?.age && userData.email === memberData.email && userData.gender === memberData.gender && userData.name === memberData.name){
      toast.error("No changes detected")
      stopLoading()
      return;
    }

    try{
      const response = await memberApi.put(`/updateMember/${memberId}`,userData,{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      console.log('response: ', response);

      toast.success(response.data.message)
      if(response.status === 200){
        navigateToDashBoardScreen()
      }
    }catch(error){
      const err = error as AxiosError<{message:string}>
      toast.error(err.response?.data.message as string)
    }finally{
      stopLoading()
    }
  }

  const modalToggler = useToggler()
  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.header, { color: theme.buttonBackground }]}>
        {isUpdating ? 'Update member' : 'Add New Member'}
      </Text>
      <ThemedInput
        errorData={errors.name}
        value={userData.name}
        onChangeText={(text) => {
          setUserData((prev) => ({ ...prev, name: text }))
          setErrors((prev) => ({...prev,name:''}))
        }}
        leftIcon='account'
        label="Enter Name"
      />
      <ThemedInput
        errorData={errors.age}
        value={userData.age ? userData.age.toString() : ''}
        onChangeText={(text) => {
          setUserData((prev) => ({ ...prev, age: Number(text) }))
          setErrors((prev) => ({...prev,age:''}))
        }}
        leftIcon='calendar'
        keyboardType='number-pad'
        label="Enter Age"
      />
      <ThemedInput
        errorData={errors.email}
        value={userData.email}
        onChangeText={(text) => {
          setUserData((prev) => ({ ...prev, email: text }))
          setErrors((prev) => ({...prev,email:''}))
        }}
        leftIcon='email'
        label="Enter Email"
      />

      <DropDownPicker
        open={open}
        value={genderValue}
        items={items}
        setOpen={setOpen}
        setValue={(value) => {
          setGenderValue(value)
          setErrors((prev) => ({ ...prev,gender:'' }))
        }}
        setItems={setItems}
        placeholder='Choose gender'
        scrollViewProps={{ nestedScrollEnabled: true }}
        listMode="SCROLLVIEW"
        zIndex={1000}
        style={{ backgroundColor: theme.inputBackground, borderColor: theme.inputText }}
        containerStyle={styles.dropdown}
        dropDownContainerStyle={{ backgroundColor: theme.inputBackground, borderColor: theme.inputText }}
        textStyle={{ color: theme.inputText }}
      />
      {
        errors.gender && <Text style={styles.error}>{errors.gender}</Text>
      }
      <ThemedButton
        style={styles.buttonStyle}
        onClick={isUpdating ? hanldeUpdateMember : handleRegisterMember}
      >
        {isUpdating ? 'Update member' : 'Register member'}
      </ThemedButton>
      {
        isUpdating && <ThemedButton onClick={modalToggler.toggler} style={styles.deleteBtn} buttonColor='red'>Delete member</ThemedButton>
      }
      <ConfirmationModal isVisible={modalToggler.value} onCancel={modalToggler.toggler} onConfirm={onDelete}/>
      <LoaderScreen isLoading={loading}/>
    </ScrollView>
  )
}

export default MemberAddingComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: dimensions.marginMD,
    paddingTop: dimensions.marginLG,
  },
  header: {
    fontSize: dimensions.fontSM * 2.5,
    fontWeight: 'bold',
    marginTop: dimensions.marginXL * 4,
    textAlign: 'center',
    letterSpacing: dimensions.fontSM / 4,
  },
  buttonStyle: {
    marginTop: dimensions.marginXL,
  },
  dropdown: {
    marginTop: dimensions.marginMD,
  },
  error: {
    fontSize: dimensions.fontMD,
    marginTop: dimensions.marginSM,
    color:'red'
  },
  deleteBtn:{
    marginTop:dimensions.fontMD,
  }
});
