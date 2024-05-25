import { NativeBaseProvider } from "native-base";
import MainNavigation from './navigation/MainNavigation';

const KapliTestApp = () => {
  return (
    <NativeBaseProvider>
      <MainNavigation />
    </NativeBaseProvider>
  )
}

export default KapliTestApp;
