import { View, Text, Image } from 'react-native'
import React from 'react';

import { images } from '../constants';
import CustomButton from './CustomButton';
import { router } from 'expo-router';

const EmptyState = ({title, subtitle}) => {
  return (
    <View className="justify-center items-center">
      <Image 
        source={images.empty}
        className="w-[260px] h-[260px]"
        resizeMode="contain"
      />
        <Text className="text-2xl text-center font-psemibold text-white">
            { title }
        </Text>
        <Text className="font-pmedium text-sm text-gray-100">
            { subtitle }
        </Text>

        <CustomButton 
            title="Create video"
            onPress={() => router.push("/create")}
            containerStyle="w-full my-5 px-4"
        />
    </View>
  )
}

export default EmptyState;