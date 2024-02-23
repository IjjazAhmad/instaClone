
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AUTH_STACK_NAVIGATION_SCREENS, STACK_NAVIGATION_SCREENS } from './NavigationScreens';

import { useAuthContext } from '../context/AuthContext';
const Stack = createNativeStackNavigator();


export default function Navigation() {
    const { isAuth, user } = useAuthContext()
    return (

        <Stack.Navigator>
            {isAuth ?
                <Stack.Group>
                    {
                    STACK_NAVIGATION_SCREENS.map((item, index) => {
                        return (<Stack.Screen
                            key={index}
                            name={item.name}
                            component={item.component}
                            options={{ headerShadowVisible: false, headerShown:false, title: '' }}
                        />)
                    })
                }
                </Stack.Group>
                :
                <Stack.Group>
                    {
                        AUTH_STACK_NAVIGATION_SCREENS.map((item, index) => {
                            return (<Stack.Screen
                                key={index}
                                name={item.name}
                                component={item.component}
                                options={{ headerShadowVisible: false, title: '' }}
                            />)
                        })
                    }
                </Stack.Group>
            }

        </Stack.Navigator>
    )
}