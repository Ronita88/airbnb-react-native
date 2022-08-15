import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { useState } from "react";

import CustomInput from "../components/CustomInputs";

// https://express-airbnb-api.herokuapp.com/user/log_in
// Method: POST
// Body parameters:
// email (nono@airbnb-api.com)
// password (pass)

//ici usenavigation a été importé directement donc pas besoin de le passer en props comme signup
//on active le package en déclarant la variable
export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setErrorMessage("");

    if (email && password) {
      try {
        const response = await axios.post(
          `https://express-airbnb-api.herokuapp.com/user/log_in`,
          {
            email: email,
            password: password,
          }
        );
        console.log(response.data.token);
        //ici le setToken est nécessaire pour rediriger vers les pages si le Token existe
        // les conditions ont été programmer dans App.js
        // const userToken = "secret-token";
        setToken(response.data.token);
      } catch (error) {
        setErrorMessage("Your email doesn't exist!");
      }
    } else {
      setErrorMessage("Please fill the field");
    }
  };
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <Image style={styles.logo} source={require("../assets/img/logo.png")} />
      <View>
        <CustomInput
          name={"email"}
          value={email}
          placeholder={"email"}
          inputSetState={setEmail}
        />
        <CustomInput
          name={"password"}
          value={password}
          placeholder={"password"}
          inputSetState={setPassword}
          hidePassword={true}
        />

        {/* cet input marche aussi mais comme on a crée un composant input, cela évite la répétition
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChange={(text) => setPassword(text)} /> */}

        {errorMessage ? (
          <Text style={{ color: "red" }}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity onPress={handleSubmit} title="Sign in">
          <Text>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>Create an account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    marginVertical: 100,
  },

  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
});
