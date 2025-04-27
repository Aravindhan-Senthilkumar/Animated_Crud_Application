import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainViewWrapper from '../../components/MainViewWrapper'
import MemberAddingComponent from '../../components/MemberAddingComponent'
import { useRoute } from '@react-navigation/native'
import { fetchedMemberData } from '../../types/commonTypes'
import { memberApi } from '../../api/api'
import { toast } from 'sonner-native'
import { AxiosError } from 'axios'
import useAppNavigation from '../../hooks/useAppNavigation'

const UpdateMemberScreen = () => {

  const data = useRoute<any>().params

  const memberData = data as fetchedMemberData

  const { navigateToDashBoardScreen } = useAppNavigation()

  const handleDeleteMember = async () => {
    try{
      const response = await memberApi.delete(`/deleteMember/${memberData._id}`)

      toast.success(response.data.message)
      if(response.status === 200){
        navigateToDashBoardScreen()
      }
    }catch(error){
      const err = error as AxiosError<{message:string}>
      toast.error(err.response?.data.message as string)
    }
  }


  return (
    <MainViewWrapper isHome={false}>
      <MemberAddingComponent memberId={memberData._id} onDelete={handleDeleteMember} isUpdating memberData={memberData}/>
    </MainViewWrapper>
  )
}

export default UpdateMemberScreen

const styles = StyleSheet.create({})