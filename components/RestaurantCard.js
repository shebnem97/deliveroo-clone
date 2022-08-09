import {Image, Text, TouchableOpacity, View} from "react-native";
import {LocationMarkerIcon, StarIcon} from "react-native-heroicons/solid";
import {urlFor} from "../sanity";
import {useNavigation} from '@react-navigation/native';

const RestaurantCard = ({id, imgUrl, title, address, genre, dishes, lat, long, rating, shortDescription}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("Restaurant", {
                    id, imgUrl, title, address, genre, dishes, lat, long, rating, shortDescription
                })
            }}
            className="mr-3 bg-white shadow">
            <Image source={{
                uri: urlFor(imgUrl).url()
            }}
            className="h-36 w-64 rounded-sm"
            />
        <View className="pb-4 px-3">
            <Text className="text-lg pt-2 font-bold">{title}</Text>
            <View className="flex-row items-center space-x-1">
                <StarIcon color="green" opacity={0.5} size={20}/>
                <Text className="text-xs text-gray-500">
                    <Text className="text-green-500">{rating}</Text> - {genre}
                </Text>
            </View>
            <View className="flex-row space-x-1 items-center">
                <LocationMarkerIcon color="gray" opacity={0.4} size={22} />
                <Text className="text-xs text-gray-500">{address}</Text>
            </View>
        </View>
        </TouchableOpacity>
    )
}

export default RestaurantCard