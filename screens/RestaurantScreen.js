import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {ArrowLeftIcon, ChevronRightIcon, LocationMarkerIcon, StarIcon} from "react-native-heroicons/solid";
import {useNavigation, useRoute} from '@react-navigation/native';
import {urlFor} from "../sanity";
import {QuestionMarkCircleIcon} from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";


const RestaurantScreen = () => {
    const navigation = useNavigation();
    const {
        params: {
            id, imgUrl, title, address, genre, dishes, lat, long, rating, shortDescription
        }
    } = useRoute();
    return (
        <ScrollView>

            {/*Header*/}
            <View className="relative">
                <Image source={{
                    uri: urlFor(imgUrl).url()
                }}
                       className="w-full h-56 bg-gray-300 p-4"
                />
                <TouchableOpacity className="absolute top-14 left-5 bg-gray-100 rounded-full p-2"
                                  onPress={navigation.goBack}>
                    <ArrowLeftIcon size={20} color="#00CCBB"/>
                </TouchableOpacity>
            </View>
            <View className="bg-white">
                <View className="px-4 pt-4">
                    <Text className="font-bold text-3xl">{title}</Text>
                    <View className="flex-row space-x-2 my-1">
                        <View className="flex-row space-x-1 items-center">
                            <StarIcon color="green" opacity={0.5} size={20}/>
                            <Text className="text-xs text-gray-500">
                                <Text className="text-green-500">{rating}</Text> - {genre}
                            </Text>
                        </View>
                        <View className="flex-row space-x-1 items-center">
                            <LocationMarkerIcon color="gray" opacity={0.4} size={22}/>
                            <Text className="text-xs text-gray-500">{address}</Text>
                        </View>
                    </View>
                    <Text className="text-gray-500 mt-2 pb-4">{shortDescription}</Text>
                </View>
                <TouchableOpacity className="flex-row space-x-2 items-center border-y border-gray-300 p-4">
                    <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20}/>
                    <Text className="font-bold text-md flex-1 pl-2">Have a food alergy?</Text>
                    <ChevronRightIcon color="#00CCBB"/>
                </TouchableOpacity>
            </View>
            <View className="pb-36">
                <Text className="font-bold text-xl px-4 pt-6 mb-3">Menu</Text>

                {/*Dishrows*/}
                {dishes.map((dish) => (
                    <DishRow
                        key={dish._id}
                        id={dish._id}
                        name={dish.name}
                        description={dish.short_description}
                        price={dish.price}
                        image={dish.image}
                    />
                ))}
            </View>
        </ScrollView>
    );
}

export default RestaurantScreen