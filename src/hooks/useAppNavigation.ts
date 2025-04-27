import { useNavigation } from "@react-navigation/native"

const useAppNavigation = () => {
    const navigation = useNavigation<any>()

    return {
        goBack:navigation.goBack,
        navigateToSignUpScreen:() => navigation.navigate('register'),
        navigateToLoginScreen:() => navigation.navigate('login'),
        navigateToForgotScreen:() => navigation.navigate('forgot'),
        navigateToDashBoardScreen:() => navigation.navigate('dashboard'),
        navigateToAddMemberScreen:() => navigation.navigate('addmember'),
        navigateToUpdateMemberScreen:(params:any) => navigation.navigate('updatemember',params),
    }

}

export default useAppNavigation; 