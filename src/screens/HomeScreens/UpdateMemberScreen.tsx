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
import { storage } from '../../storage/storage'
import useLoader from '../../hooks/useLoader'
import LoaderScreen from '../../components/LoaderScreen'

const UpdateMemberScreen = () => {

  const data = useRoute<any>().params

  const memberData = data as fetchedMemberData

  const { navigateToDashBoardScreen } = useAppNavigation()

  const { loading,startLoading,stopLoading } = useLoader()

  const handleDeleteMember = async () => {
    startLoading()
    try{
      const token = storage.getString('token')
      const response = await memberApi.delete(`/deleteMember/${memberData._id}`,{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })

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


  return (
    <MainViewWrapper isHome={false}>
      <MemberAddingComponent memberId={memberData._id} onDelete={handleDeleteMember} isUpdating memberData={memberData}/>
      <LoaderScreen isLoading={loading}/>
    </MainViewWrapper>
  )
}

export default UpdateMemberScreen

const styles = StyleSheet.create({})