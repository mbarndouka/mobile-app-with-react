import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import EmptyState from '../../components/EmptyState';
import { getUserPosts } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import VideosCard from '../../components/VideosCard';
import { useGlobalContext } from '../../context/global';
import { icons } from '../../constants';

const Profile = () => {
  const { user, setUser, setIsLogin } = useGlobalContext();

  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));


  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={ posts }
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <VideosCard
            video={item}
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
          </View>

        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="No videos found"
            subtitle="No videos found for this search query"
          />
        )}

      />
    </SafeAreaView>
  )
}

export default Profile;