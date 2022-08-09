import {useSelector} from "react-redux";
import {selectBasketItems, selectBasketTotal} from "../features/basketSlice";
import {Text, TouchableOpacity, View} from "react-native";
import Currency from "react-currency-formatter";

const BasketIcon = () => {
    const items = useSelector(selectBasketItems)
    const BasketTotal = useSelector(selectBasketTotal)
    return (
        <View className="absolute bottom-10 w-full z-50">
            <TouchableOpacity className="flex-row bg-[#00ccbb] p-4 mx-5 rounded-lg items-center space-x-1">
                <Text className="text-lg font-extrabold text-white bg-[#01a296] py-1 px-2">{items.length}</Text>
                <Text className="flex-1 text-lg font-extrabold text-white text-center">View Basket</Text>
                <Text className="text-lg font-extrabold text-white">
                    <Currency currency="AZN" quantity={BasketTotal}/>
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default BasketIcon