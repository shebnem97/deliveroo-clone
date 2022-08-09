import {View, Text, SafeAreaView, Image, TextInput, ScrollView} from 'react-native'
import React, {useEffect, useState} from "react";
import {AdjustmentsIcon, ChevronDownIcon, SearchIcon, UserIcon} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import client from "../sanity";

const HomeScreen = () => {
    const [featuredCategories, setFeaturedCategories] = useState([])

    useEffect(() => {
        client.fetch(
            `
                *[_type == "featured"] {
                    ...,
                restaurants[] -> {
                    ...,
                    dishes[]->
                }    
                }
            `
        )
            .then((data) => {
                setFeaturedCategories(data)
            })
    }, []);

    return (
        <SafeAreaView className="bg-white pt-5">

            {/*Header*/}
            <View className="flex-row pb-3 items-center mx-4 space-x-2">
                <Image source={{
                    uri: 'https://links.papareact.com/wru'
                }}
                       className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                />

                <View className="flex-1">
                    <Text className="text-gray-400 font-bold text-xs">Deliver Now!</Text>
                    <Text className="font-bold text-xl">Current Location
                        <ChevronDownIcon size={20} color="#00CCBB"/>
                    </Text>
                </View>

                <UserIcon size={35} color="#00CCBB"/>
            </View>

            {/*Search*/}
            <View className="flex-row space-x-2 pb-2 mx-4 items-center">
                <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
                    <SearchIcon color="gray"/>
                    <TextInput placeholder="Restaurants and cuisines" keyboardType="default"/>
                </View>

                <AdjustmentsIcon color="#00CCBB"/>
            </View>

            {/*Body*/}
            <ScrollView>
                {/*Categories*/}
                <Categories/>
                {/*featured Rows*/}

                {featuredCategories?.map((category) => (
                    <FeaturedRow
                        key={category._id}
                        id={category._id}
                        title={category.name}
                        description={category.shortDescription}
                        // featuredCategory="featured"
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen