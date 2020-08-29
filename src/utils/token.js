import AsyncStorage from '@react-native-community/async-storage';

const getTokenConnexion = () => AsyncStorage.getItem('token');

export default getTokenConnexion();
