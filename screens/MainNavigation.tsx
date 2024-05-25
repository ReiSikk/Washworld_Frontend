import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Box, IconButton } from "native-base";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import LocationsScreen from './LocationsScreen';
import RewardsScreen from './RewardsScreen';
import AccountScreen from './AccountScreen';
import SignupScreen from './SignupScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import HomeSubscriptionsScreen from './subscriptionFlow/HomeSubscriptionsScreen';
import PlanOverview from './subscriptionFlow/PlanOverview';
import EnterLicensePlate from './subscriptionFlow/EnterLicensePlate';
import OrderSummary from './subscriptionFlow/OrderSummary';
import SelectPaymentMethod from './subscriptionFlow/SelectPaymentMethod';
import WelcomeScreen from './WelcomeScreen';
import Contact from './accountFlow/Contact';
import FAQ from './accountFlow/FAQ';
import PaymentMethods from './accountFlow/PaymentMethods';
import Settings from './accountFlow/Settings';
import WashHistory from './accountFlow/WashHistory';
import { Text, TouchableOpacity } from 'react-native';
import { baseFontSize } from 'native-base/lib/typescript/theme/tools';
import sizes from 'native-base/lib/typescript/theme/base/sizes';
import Location from './locationFlow/Location';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { checkTokenValidity, logout } from '../store/MemberSlice';
import PaymentStatus from './subscriptionFlow/PaymentStatus';

//define route params types
export type RootStackParamList = {
    // specifying undefined means that the route doesn't have params
    SignupScreen: undefined;
    LoginScreen: undefined;
    HomeScreen: { memberID: number };
    AccountScreen: { memberID: number };
    LocationsScreen: undefined;
    RewardsScreen: { memberID: number };
    WelcomeScreen: undefined;
    HomeSubscriptionsScreen: undefined;
    PlanOverview: { subscriptionPlanID: number};
    EnterLicensePlate: { subscriptionPlanID: number};
    OrderSummary: { subscriptionPlanID: number };
    SelectPaymentMethod: undefined;
    PaymentStatus: undefined;
    Contact: undefined;
    FAQ: undefined;
    PaymentMethods: undefined;
    Settings: undefined;
    WashHistory: undefined;
    Location: {locationID: number};
  };
  
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const HomeStackNavigator = () => {
  const dispatch = useDispatch<AppDispatch>();
    return (
      <Stack.Navigator      screenOptions={({ navigation }) => ({
        tabBarActiveTintColor: '#1A1A1A',
        tabBarInactiveTintColor: '#666666',
        headerShown: true,
          headerRight: () => (     
              <IconButton colorScheme="indigo" style={{marginRight: 10}} key={"outline"} 
              onPress={() => dispatch(logout())}
               variant={"outline"} _icon={{
                as: AntDesign,
                name: "logout"
              }} />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10, flexDirection:"row", alignItems: 'center', gap:10 }}>
              <Ionicons name="return-up-back" size={24} color="black" />
              <Text style={{ fontSize:16, fontWeight:'500' }}>Back</Text>
            </TouchableOpacity>
          ),
        })}
      >
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerLeft: () => null }}  />
          <Stack.Screen name="HomeSubscriptionsScreen" options={{ headerShown: true }} component={HomeSubscriptionsScreen}
           />
          <Stack.Screen name="PlanOverview" component={PlanOverview}/>
          <Stack.Screen name="EnterLicensePlate" component={EnterLicensePlate}/>
          <Stack.Screen name="OrderSummary" component={OrderSummary}/>
          <Stack.Screen name="SelectPaymentMethod" component={SelectPaymentMethod}/>
          <Stack.Screen name="PaymentStatus" component={PaymentStatus}/>
          <Stack.Screen name="Location" component={Location} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
    )
  }


  const AccountStackNavigator = () => {
    const dispatch = useDispatch<AppDispatch>();
    return (
      <Stack.Navigator
            screenOptions={({ navigation }) => ({
                    tabBarActiveTintColor: '#1A1A1A',
                    tabBarInactiveTintColor: '#666666',
                    headerShown: true,
                      headerRight: () => (     
                          <IconButton colorScheme="indigo" style={{marginRight: 10}} key={"outline"} 
                          onPress={() => dispatch(logout())}
                           variant={"outline"} _icon={{
                            as: AntDesign,
                            name: "logout"
                          }} />
                      ),
                      headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10, flexDirection:"row", alignItems: 'center', gap:10 }}>
                          <Ionicons name="return-up-back" size={24} color="black" />
                          <Text style={{ fontSize:16, fontWeight:'500' }}>Back</Text>
                        </TouchableOpacity>
                      ),
                    })}
      >
          <Stack.Screen name="AccountScreen" component={AccountScreen} options={{ headerLeft: () => null }} />
          <Stack.Screen name="Contact" component={Contact} />
          <Stack.Screen name="FAQ" component={FAQ} />
          <Stack.Screen name="PaymentMethods" component={PaymentMethods} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="WashHistory" component={WashHistory} />
        </Stack.Navigator>
    )
  }

  const LocationsStackNavigator = () => {
    const dispatch = useDispatch<AppDispatch>();
    return (
      <Stack.Navigator
            screenOptions={({ navigation }) => ({
                    tabBarActiveTintColor: '#1A1A1A',
                    tabBarInactiveTintColor: '#666666',
                    headerShown:true,
                    headerRight: () => (     
                      <IconButton colorScheme="indigo" style={{marginRight: 10}} key={"outline"} 
                      onPress={() => dispatch(logout())}
                       variant={"outline"} _icon={{
                        as: AntDesign,
                        name: "logout"
                      }} />
                  ),
                    })}
      >
          <Stack.Screen name="LocationsScreen" component={LocationsScreen} options={{ headerLeft: () => null }} />
          <Stack.Screen name="Location" component={Location} />
        </Stack.Navigator>
    )
  }

const MainNavigation = () => {
    const dispatch = useDispatch<AppDispatch>();
    
    //getting the token from the store
    const token = useSelector((state: RootState) => state.member.token);


      return (
          <NavigationContainer>
          { token ? (
              <>
                  <Tab.Navigator
                   screenOptions={({ navigation }) => ({
                    tabBarActiveTintColor: '#1A1A1A',
                    tabBarInactiveTintColor: '#666666',
                    headerShown: false,
                    })}
                      >
                      <Tab.Screen
                       name="Home"
                       component={HomeStackNavigator}  
                       options={{
                    
                        tabBarIcon: ({ color, size }) => (
                          <Ionicons name="home-outline" size={24} color="#666666" />
                        ),
                        }}  />
                      <Tab.Screen
                       name="Locations" 
                       component={LocationsStackNavigator}
                       options={{
                        tabBarIcon: ({ color, size }) => (
                          <Ionicons name="location-outline" size={24} color="#666666" />
                        ),
                        }} 
                        />
                      <Tab.Screen 
                      name="Rewards" 
                      component={RewardsScreen}
                      options={{
                        tabBarIcon: ({ color, size }) => (
                          <Ionicons name="trophy-outline" size={24} color="#666666" />
                        ),
                        headerShown: true,
                        }} 
                       />
                      <Tab.Screen 
                      name="Account" 
                      component={AccountStackNavigator}
                      options={{
      
                        tabBarIcon: ({ color, size }) => (
                          <Ionicons name="body-outline" size={24} color="#666666" />
                        ),
                        }} 
                       />
                  </Tab.Navigator>
              </>
            ) : (
              <>
                <Stack.Navigator>
                    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
                    <Stack.Screen name="SignupScreen" component={SignupScreen} />
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                </Stack.Navigator>
              </>
            )
          }
        </NavigationContainer>
      );
  };

export default MainNavigation