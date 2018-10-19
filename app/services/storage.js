import { AsyncStorage } from 'react-native';

const Storage = 
{
         setItem: async (key, obj)=>{
            return await AsyncStorage.setItem(key, JSON.stringify(obj));
         },

         getItem: async (key)=> {
            return await AsyncStorage.getItem(key).then(value=>JSON.parse(value));
         },

         removeItem:async (key)=> {
            return await AsyncStorage.removeItem(key);
         }
         
     
}


export default Storage;