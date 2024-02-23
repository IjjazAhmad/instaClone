import { AUTH_STACK_SCREEN, STACK_SCREENS, BOTTOM_TAB_SCREEN } from "../constants/Navigation";
import ForgotPassword from "../screens/auth/forgotPassword/ForgotPassword";
import Login from "../screens/auth/login/Login";
import Signup from "../screens/auth/signUp/SignUp";
import EditProfile from "../screens/frontend/editProfile/EditProfile";
import Home from "../screens/frontend/home/Home";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from "../screens/frontend/profile/Profile";
import { HomeIcon, ProfileIcon, SmallLogo, UploadIcon } from "../constants/Images";

import { navStyles } from './NavigationStyle'
import ProfileSelf from "../screens/frontend/profileSelf/ProfileSelf";
import UploadPost from "../screens/frontend/uploadPost/UploadPost";

export const AUTH_STACK_NAVIGATION_SCREENS = [
  { name: AUTH_STACK_SCREEN.LOGIN, component: Login },
  { name: AUTH_STACK_SCREEN.SIGNUP, component: Signup },
  { name: AUTH_STACK_SCREEN.FORGOT_PASSWORD, component: ForgotPassword },
]
export const STACK_NAVIGATION_SCREENS = [
  { name: STACK_SCREENS.BOTTOM_TAB, component: MyTabs },
  { name: STACK_SCREENS.PROFILE, component: Profile },
  { name: STACK_SCREENS.PROFILE_EDIT, component: EditProfile },

]

const Tab = createBottomTabNavigator();

function MyTabs() {
  const { HOME, UPLOAD_POST, PROFILE_SELF } = BOTTOM_TAB_SCREEN
  return (
    
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: { paddingTop: 10 },
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === HOME) {
              iconName = <HomeIcon />
            } else if (route.name === UPLOAD_POST) {
              iconName = <UploadIcon />
            }
            else {
              iconName = <ProfileIcon />
            }
            return iconName;
          },
        })}
      >
        <Tab.Screen name={HOME} component={Home}
          options={{ headerShadowVisible: true, title: '', headerTitle: () => <SmallLogo />, headerTitleAlign: 'center' }}
        />
        <Tab.Screen name={UPLOAD_POST} component={UploadPost}
          options={{ headerShown: false, title: '', }}

        />
        <Tab.Screen name={PROFILE_SELF} component={ProfileSelf}
          options={{ headerShadowVisible: false, title: "", headerTitle: 'jacob_w', headerTitleAlign: 'center', headerTitleStyle: navStyles.titleStyle, }}
        />

      </Tab.Navigator>
  );
}
