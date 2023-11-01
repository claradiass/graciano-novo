import NavegadorPrincipal from "./navegadores/NavegadorPrincipal";
import { NavigationContainer } from '@react-navigation/native';

import {
  useFonts,
  Urbanist_400Regular,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
  Urbanist_800ExtraBold,
  Urbanist_900Black,
} from '@expo-google-fonts/urbanist';

export default function App() {

  const [fontLoaded] = useFonts({
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
    Urbanist_800ExtraBold,
    Urbanist_900Black,
  });

  if (!fontLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <NavegadorPrincipal />
    </NavigationContainer>        
  );
}


