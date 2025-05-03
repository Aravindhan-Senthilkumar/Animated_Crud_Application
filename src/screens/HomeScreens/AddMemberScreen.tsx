import React from 'react';
import MainViewWrapper from '../../components/MainViewWrapper';

import MemberAddingComponent from '../../components/MemberAddingComponent';
import { AxiosError } from 'axios';
import { toast } from 'sonner-native';
import { memberApi } from '../../api/api';
import { addMemberResponse, memberPayload } from '../../types/commonTypes';
import useAppNavigation from '../../hooks/useAppNavigation';
import { storage } from '../../storage/storage';

type Props = {
  
}

const AddMemberScreen = (props:Props) => {
  
  const { navigateToDashBoardScreen } = useAppNavigation()

  const handleAddMember = async (userData:memberPayload) => {
    const token = storage.getString('token')

    try{
      const response = await memberApi.post('/addMember',userData,{
        headers:{
          'authorization':`Bearer ${token}`
        } 
      })

      const receivedData:addMemberResponse = response.data

      if(receivedData){
        toast.success(receivedData.message)
      }

      navigateToDashBoardScreen()
    }catch(err){
        const error = err as AxiosError<{message:string}>
        toast.error(error.response?.data.message as string)
    }
  }

  return (
    <MainViewWrapper isHome={false}>
      <MemberAddingComponent isUpdating={false} onPress={handleAddMember as any}/>
    </MainViewWrapper>
  );
};

export default AddMemberScreen;


