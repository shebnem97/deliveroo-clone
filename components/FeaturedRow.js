import {ScrollView, Text, View} from "react-native";
import {ArrowRightIcon} from "react-native-heroicons/solid";
import RestaurantCard from "./RestaurantCard";
import {useEffect, useState} from "react";
import client from "../sanity";

const FeaturedRow = ({id, title, description, featuredCategory}) => {

    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        client.fetch(
            `
             *[_type == "featured" && _id == $id] {
                    ...,
                restaurants[] -> {
                    ...,
                    dishes[]->,
                    type-> {
                       title 
                    }
                }    
                }[0]
            `, {id}
        )
            .then((data) => {
                setRestaurants(data?.restaurants);
            });
    }, [])

    return (<View>
            <View className="mt-4 flex-row px-4 justify-between items-center">
                <Text className="text-lg font-bold">{title}</Text>
                <ArrowRightIcon color="#00CCBB"/>
            </View>
            <Text className="text-xs text-gray-500 px-4">{description}</Text>
            <ScrollView
                horizontal
                className="pt-4"
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 15
                }}
            >
                {/*Restaurant Cards*/}
                {restaurants?.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant._id}
                        id={restaurant._id}
                        imgUrl={restaurant.image}
                        title={restaurant.name}
                        rating={restaurant.rating}
                        genre={restaurant.type?.title}
                        address={restaurant.address}
                        shortDescription={restaurant.short_description}
                        dishes={restaurant.dishes}
                        long={restaurant.long}
                        lat={restaurant.lat}
                    />
                ))}
            </ScrollView>
        </View>)
}

export default FeaturedRow