// 1- j'importe mes packages
// 2- je crée mes inputs via un component que je nomme CustomInputs.js
// 3- je crée mes states
// 4- je hide l'input mdp et confirm mdp avec secureTextEntry (propriété d'InputText) que je dois passer dans components CustomInput et que j'appelle dans App.js sur les champs password et confirmPassword

// 5- Avant de faire la requête à l'API, je dois faire :
// un "if" si champs remplis, un "if" si mots de passe renseignés identiques. Et un message d'erreur, en cas d'erreur ou d'oubli de la part de l'utilisateur, indiqué en rouge

// 6- IMPORTANT, je crée une ternaire au dessus du bouton de validation Signup pour qu'en cas d'erreur un message apparaisse selon le type d'erreur détecté:
// {error ? <Text>{error}</Text> : null}

// 7- je crée une fonction handleSubmit dans lequel j'englobe mes if et else,
//    mon try/catch
//    dedans ma requête axios.post avec passage de paramètre en body

// j'importe  axios et fais ma requête en post avec des params en body (email, username, description, password)

// => mon formulaire est prêt mais pas de navigation possible vers les pages screens.
// Rappel: le react-native-stack-navigator importé dans App.js n'est pas applicable au composant car pas enfant direct du Stack. Il nous faut donc le passer en props avec un spread operator comme ceci dans App.js:
// <Stack.Screen name="Signup">
// {(props) => <SignUpScreen {...props} setToken={setToken} />}
// </Stack.Screen>

// Après ça, je récupère la props "navigation" et l'inscrit avec setToken dans la fonction SignupScreen

// je peux enfin naviguer vers les stacks screen via un bouton retour vers la page signin

// il reste à créer le bouton de validation du formulaire et à placer au dessus du  bouton retour
// avec une fonction handleSubmit ligne 48

import {
  Button,
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import axios from "axios";

import CustomInput from "../components/CustomInputs";

export default function SignUpScreen({ setToken, navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // state pour gérer les messages d'erreur si les champs ne sont pas remplis et mdp ne sont pas =
  const [errorMessage, setErrorMessage] = useState("");

  // la fonction handleSubmit est activée au clique avec le button "SignUp" ou ToucheAbleOpacity à la fin du formulaire
  const handleSubmit = async () => {
    // ce setErrorMessage permet de reset le message d'erreur à chaque tentative avortée d'identification, si ce n'est pas mis, le message resterait même après que tout soit ok.
    setErrorMessage("");

    // ce if gère que tous les champs sont bien remplis et en else "please, fill the blank"
    if (email && username && description && password && confirmPassword) {
      // si les mdp ne sont pas identiques, envoi message error password
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            `https://express-airbnb-api.herokuapp.com/user/sign_up`,
            {
              email: email,
              username: username,
              description: description,
              password: password,
            }
          );
          // on teste sur appli iphone pour voir les message dans le terminal
          console.log(response.data);
          // ici on veut vérifier que si response.data.token existe bien pour créer un compte, nous avons déjà vérifié au préalable response.data
          if (response.data.token) {
            alert("compte crée");
            setToken();
          }
        } catch (error) {
          // la formulation error.response.data sont des renvois de message automatique que renvoit le serveur en cas d'erreur et non liés à des erreurs de syntaxe. on a fait un console.log pour voir le détail mais on le commente, on voit que c'est un objet avec une clé nommée error d'où le contenu du SetErrorMessage
          // console.log(error.response.data);
          // et on fait un if
          if (error.response.data) {
            setErrorMessage(error.response.data.error);
          }
        }
      } else {
        setErrorMessage("error password");
      }
    } else {
      setErrorMessage("please, fill the blank");
    }
  };

  return (
    // ici on remplace ScrollView par KeyboardAwareScrollView pour éviter que le pad de saisie n'empiète sur les champs à remplir (on importe donc le package avec yarn add keyboardAwareScrollView )
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <Image
        style={styles.logo}
        source={require("../assets/img/logo.png")}
        alt=""
      />

      <View>
        <CustomInput
          name={"email"}
          value={email}
          placeholder={"email"}
          inputSetState={setEmail}
        />
        <CustomInput
          name={"Username"}
          value={username}
          placeholder={"Username"}
          inputSetState={setUsername}
        />
        <Text>Description</Text>
        <TextInput
          multiline={true}
          placeholder="Describe yourself..."
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
        <CustomInput
          name={"Password"}
          value={password}
          placeholder={"Password"}
          hidePassword={true}
          inputSetState={setPassword}
        />
        <CustomInput
          name={"confirmPassword"}
          value={confirmPassword}
          placeholder={"confirm password"}
          hidePassword={true}
          inputSetState={setConfirmPassword}
        />

        {errorMessage ? (
          <Text style={{ color: "red" }}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity onPress={handleSubmit}>
          <Text>SignUp</Text>
        </TouchableOpacity>

        {/* ce bouton permet de retourner à la page SignIn uniquement grace à l'import de navigate en props de la fonction Signup depuis App.js */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text>Already have an account ? Sign In</Text>
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

  input: {
    borderwidth: 1,
  },
});
