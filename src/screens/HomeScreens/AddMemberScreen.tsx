import React from 'react';
import MainViewWrapper from '../../components/MainViewWrapper';

import MemberAddingComponent from '../../components/MemberAddingComponent';
import { AxiosError } from 'axios';
import { toast } from 'sonner-native';
import { memberApi } from '../../api/api';
import { addMemberResponse, memberPayload } from '../../types/commonTypes';
import useAppNavigation from '../../hooks/useAppNavigation';

type Props = {
  
}

const AddMemberScreen = (props:Props) => {
  
  const { navigateToDashBoardScreen } = useAppNavigation()

  const handleAddMember = async (userData:memberPayload) => {
    try{
      const response = await memberApi.post('/addMember',userData)

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
      <MemberAddingComponent isUpdating={false} onPress={handleAddMember}/>
    </MainViewWrapper>
  );
};

export default AddMemberScreen;


