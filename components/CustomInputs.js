import { TextInput, View, Text } from "react-native";

// on crée un composant pour éviter la répétition de l'input qui est réutilisable sur les différents fomulaires.
// cela évite la répétition en copy/paste sur les lignes [28-31]
// je passe en props placeholder, value, inputSetState et j'appelle le composant quand j'ai besoin comme ceci pour l'input email:
// <CustomInput placeholder={"email"} value="email" InputSetState={"setEmail"}
// pour renvoyer le bloc input text et textInput, je les ai mis dans une View pour intégrer le name au dessus de l'input associé.

// attention, il faut importer le component dans le bon screen.

const CustomInput = ({
  name,
  placeholder,
  value,
  inputSetState,
  hidePassword,
}) => {
  return (
    <View>
      <Text>{name}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        secureTextEntry={hidePassword}
        onChangeText={(text) => {
          inputSetState(text);
        }}
      />
    </View>
  );
};
export default CustomInput;

//1- <TextInput
// placeholder="Username"
// secureTextEntry={true}
// onChange={(text) => setUsername(text)}

//2- le secureTextEntry permet de cacher le mdp mais on va là aussi le passer dans le component en le nommant secu. c'est une propriété du TextInput
