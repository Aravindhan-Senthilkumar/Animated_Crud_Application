import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainViewWrapper from '../../components/MainViewWrapper';
import {dimensions} from '../../constants/dimensions';
import {useTheme} from '../../theme/ThemeContext';
import avatar from '../../assets/images/avatar.png';
import useAppNavigation from '../../hooks/useAppNavigation';
import {
  fetchedMemberData,
  fetchedMemberResponse,
  memberPayload,
} from '../../types/commonTypes';
import {AxiosError} from 'axios';
import {toast} from 'sonner-native';
import {memberApi} from '../../api/api';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {handleLogin} from '../../redux/slices/authSlice';
import ConfirmationModal from '../../components/ConfirmationModal';
import useToggler from '../../hooks/useToggler';
import { storage } from '../../storage/storage';
import useLoader from '../../hooks/useLoader';
import LoaderScreen from '../../components/LoaderScreen';

type Props = {};

const DashBoardScreen = (props: Props) => {
  const {navigateToUpdateMemberScreen} = useAppNavigation();

  const {theme} = useTheme();

  const { loading,startLoading,stopLoading } = useLoader()


  const [membersData, setMembersData] = useState<fetchedMemberData[]>([]);
  console.log('membersData: ', membersData);

  const fetchMembersData = async () => {
    startLoading()
    const token = storage.getString('token')
    console.log('token: ', token);
    try {
      const response = await memberApi.get<fetchedMemberResponse>(
        `/fetchMembers`,{
          headers:{
            'Authorization' : `Bearer ${token}`
          }
        });

      setMembersData(response.data.membersData);
    } catch (err) {
      const error = err as AxiosError<{message: string}>;
      toast.error(error.response?.data.message as string);
    }finally{
      stopLoading()
    }
  };

  useEffect(() => {
    fetchMembersData();
  }, []);

  const renderMemberCard = ({item}: {item: any}) => (
    <TouchableOpacity
      onPress={() => navigateToUpdateMemberScreen(item)}
      style={[
        styles.card,
        {
          backgroundColor: theme.cardBackground,
          shadowColor: theme.text,
          borderColor: theme.border,
        },
      ]}>
      <View style={styles.cardContent}>
        <View style={styles.imageWrapper}>
          <Image source={avatar} style={styles.avatarImage} />
        </View>
        <View> 
          <Text numberOfLines={1} style={[styles.name, {color: theme.text}]}>{item.name}</Text>
          <Text style={[styles.role, {color: theme.text}]}>{item.age}</Text>
          <Text style={[styles.role, {color: theme.text}]}>{item.gender}</Text>
          <Text style={[styles.email, {color: theme.text}]}>{item.email}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const dispatch = useDispatch<AppDispatch>();

  const modalToggler = useToggler()

  const handleLogout = () => {
    dispatch(handleLogin(false));
    storage.clearAll()
    toast.success('Successfully logged out');
  };

  return (
    <MainViewWrapper isHome>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={[styles.header, {color: theme.buttonBackground}]}>
            Dashboard
          </Text>
          <TouchableOpacity onPress={modalToggler.toggler}>
            <AntDesign
              name="logout"
              size={dimensions.fontXXL}
              color={theme.text}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.subHeader, {color: theme.text}]}>
          List of registered members
        </Text>

        {/* List of Members */}
        <FlatList
          data={membersData}
          renderItem={renderMemberCard}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={(<View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, {color: theme.text}]}>Member lists are empty</Text>
          </View>)}
        />
      </View>
      <ConfirmationModal isVisible={modalToggler.value} onCancel={modalToggler.toggler} onConfirm={handleLogout}/>
      <LoaderScreen isLoading={loading}/>
    </MainViewWrapper>
  );
};

export default DashBoardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: dimensions.marginMD,
    paddingTop: dimensions.marginLG,
  },
  header: {
    fontSize: dimensions.fontSM * 3,
    fontWeight: 'bold',
    marginBottom: dimensions.marginMD,
    textAlign: 'center',
    letterSpacing: dimensions.fontSM / 3,
  },
  subHeader: {
    fontSize: dimensions.fontLG,
    fontWeight: 'bold',
    marginBottom: dimensions.marginMD,
    textAlign: 'center',
    letterSpacing: dimensions.fontSM / 6,
  },
  listContainer: {
    paddingBottom: dimensions.marginXL * 2,
  },
  card: {
    borderRadius: dimensions.fontMD,
    marginBottom: dimensions.marginMD,
    padding: dimensions.marginMD,
    elevation: 4,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    width:'100%'
  },
  cardContent: {
    flexDirection: 'row',
    paddingRight:40,
    width:'80%'
  },
  imageWrapper: {
    height: dimensions.height / 8,
    width: dimensions.height / 8,
    borderRadius: dimensions.fontXXL,
    overflow: 'hidden',
    marginRight: dimensions.marginSM,
  },
  avatarImage: {
    height: '100%',
    width: '100%',
  },
  name: {
    fontSize: dimensions.fontLG,
    fontWeight: 'bold',
  },
  email: {
    fontSize: dimensions.fontMD,
    marginBottom: dimensions.marginXS,
  },
  role: {
    fontSize: dimensions.fontSM,
    fontStyle: 'italic',
  },
  bottomSheetContent: {
    flex: 1,
    padding: dimensions.marginMD,
  },
  bottomSheetHeader: {
    fontSize: dimensions.fontLG,
    fontWeight: 'bold',
    marginBottom: dimensions.marginMD,
    textAlign: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconStyle: {
    marginRight: dimensions.marginSM,
    marginBottom: dimensions.marginSM,
  },
  emptyContainer:{
    justifyContent:'center',
    alignItems:'center',
    height:dimensions.height/1.5
  },
  emptyText:{
    fontSize:dimensions.fontMD,
    fontWeight:'100',
    letterSpacing:2
  }
});
