import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react';
import { icons } from '../constants';
import { Video, ResizeMode } from 'expo-av';

/**
 * Renders a video card component with a thumbnail, creator information, and a play button.
 *
 * @param {Object} video - The video object containing the title, thumbnail, video URL, and creator information.
 * @param {string} video.title - The title of the video.
 * @param {string} video.thumbnail - The URL of the video thumbnail.
 * @param {string} video.video - The URL of the video.
 * @param {Object} video.creator - The creator information, including the username and avatar.
 * @param {string} video.creator.username - The username of the video creator.
 * @param {string} video.creator.avatar - The URL of the video creator's avatar.
 * @returns {JSX.Element} - The rendered video card component.
 */
const VideosCard = ({ video:{title, thumbnail, video, creator:{username, avatar}}} ) => {
    const [ play, setPlay] = useState(false);
  return (
    <View className="flex-col items-center first-letter px-4 mb-14">
        <View className="flex-row gap-3 items-start">
            <View className="justify-center items-start flex-row flex-1">
                <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-start p-0.5">
                    <Image
                        source={{uri:avatar}}
                        className="w-full h-full rounded-lg"
                        resizeMode="cover"
                    />
                </View>
                <View className="justify-center ml-1 gap-y-1 flex-1">
                    <Text className="text-white font-psemibold" numberOfLines={1}>
                        {title}
                    </Text>
                    <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
                        {username}
                    </Text>
                </View>
            </View>
            <View className="pt-2 ">
                <Image 
                    source={icons.menu}
                    className="w-5 h-5"
                    resizeMode="contain"
                />
            </View>
        </View>
       {play ? (
        <Video
            source={{uri: video}}
            className="w-full h-60 rounded-xl mt-3"
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate = {(status) => {
            if(status.didJustFinish) {
                setPlay(false);
            }
            }}
        />
       ):(
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setPlay(true)}
            className="w-full h-60 rounded-xl mt-3 relative 
            justify-center items-center"
        >
            <Image 
                source={{uri:thumbnail}}
                className="w-full h-full rounded-xl mt-3"
                resizeMode="cover"
            />
            <Image 
                source={icons.play}
                className="w-12 h-12 absolute"
                resizeMode='contain'
            />
        </TouchableOpacity>
       )}
    </View>
  )
}

export default VideosCard