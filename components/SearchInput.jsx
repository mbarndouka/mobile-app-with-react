import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react';
import { usePathname, router } from 'expo-router';

import { icons } from '../constants'

const SearchInput = ({initialQuery}) => {
        const pathname = usePathname();
        const [query, setQuery] = useState(initialQuery || '');
  return (
       <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
        <TextInput
            className="flex-1 mt-0.5 text-white font-pregular text-base"
            value={query}
            placeholder="Search for a video topic"
            placeholderTextColor="#CDCDE0"
            onChangeText={(e)=>setQuery(e)}
        />

        <TouchableOpacity 
            onPress={()=>{
                if(!query){
                    return Alert.alert('Missing query','Please enter a search query');
                }
                
                if(pathname.startsWith('/search')) router.setParams({query});
                else router.push(`/search/${query}`);
            }}
        >
            <Image 
                source={icons.search}
                className="w-5 h-5"
                resizeMode='contain'
            />
        </TouchableOpacity>
       </View>
  )
}

export default SearchInput