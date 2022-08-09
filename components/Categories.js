import {ScrollView} from "react-native";
import CategoryCard from "./CategoryCard";
import {useEffect, useState} from "react";
import client from "../sanity";

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        client.fetch(
            `
                *[_type == "category"] {
                    ...,
                restaurants[] -> {
                    ...,
                    dishes[]->
                }    
                }
            `
        ).then((data) => {
            setCategories(data)
        })
    }, [])

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 20,
                        paddingTop: 10
                    }}>
            {/*CategoryCard*/}

            {categories?.map((category) => (
                <CategoryCard
                    key={category._id}
                    id={category._id}
                    imgUrl={category.image}
                    title={category.title} />
            ))}
        </ScrollView>
    )
}

export default Categories