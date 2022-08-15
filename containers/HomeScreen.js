import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsloading] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(response.data);
        setIsloading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <View>
      <ActivityIndicator />
    </View>
  ) : (
    <View style={styles.container}>
      {/* FlatList est l'équivalent du .map sur react */}
      <FlatList
        data={data}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) => {
          console.log(item.photos[0].url);
          return (
            <ImageBackground
              style={styles.imageBackground}
              source={{ uri: item.photos[0].url }}
            >
              <View style={{ backgroundColor: "green" }}>
                <Text>{item.price} €</Text>
              </View>
            </ImageBackground>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    paddingHorizontal: 10,
  },
  imageBackground: {
    height: 300,
    width: "100%",
  },
});
