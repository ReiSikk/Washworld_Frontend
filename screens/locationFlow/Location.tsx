import React, { useEffect, useState } from 'react'
import { Text, View, Box, Button, Flex, VStack, ScrollView, HStack, Badge } from 'native-base'
import { TouchableOpacity } from 'react-native';
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Divider } from 'native-base';
import LocationsScreen from '../LocationsScreen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../MainNavigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { WashStationQueries } from '../../api/WashStationQueries';


type Props = NativeStackScreenProps<RootStackParamList, "Location">
type WashBay = {
  available: boolean;
  bayNr: string;
  bayType: string;
  dimensionHeight: string;
  dimensionWidth: string;
  // include other properties as needed
};


function Location({ route, navigation}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const { locationID } = route.params;
  const washStations = useSelector((state: RootState) => state.washStations.washStations);
  const location = washStations.find(station => station.id === locationID);
  const [washBays, setWashBays] = useState<WashBay[]>([]);
  

  useEffect(() => {
    const fetchWashBays = async () => {
      const data = await WashStationQueries.fetchStationsWithBays(locationID);
      setWashBays(data);
    };

    fetchWashBays();
  }, [locationID]);
  console.log(washBays, "washBays in Location")


  return (
<ScrollView mx="6" showsVerticalScrollIndicator={false}>
    <Text mt="6" mb="4" size="xl" fontWeight="extrabold">{location?.stationName}</Text>
    <VStack mb="8" space={2}>
    <HStack space={2}>
    <Ionicons name="location-outline" size={24} color="black" />
          <Text>{location?.address}</Text>
          </HStack>
          <HStack>
          <Ionicons name="time-outline" size={24} color="black" />
    <Text color="greenWhite" ml="2">Open</Text>
          <Text> - 24/7</Text>
          </HStack>
          <HStack space={2}>
          <Ionicons name="map-outline" size={24} color="black" />
          <Text>2.2 km</Text>
          </HStack>
          </VStack>
         <VStack>
<Text>Max height: 2.6m</Text>
<Text>Side mirror to side mirror: 2.55m</Text>
<Text>Max wheel width: 2.15m</Text>
</VStack>

    <Button my="4">Get directions</Button>
    <Flex flexDirection="row">
    <Text>See more car washes in Copenhagen </Text>
    <TouchableOpacity onPress={() => navigation.navigate('LocationsScreen')}>
    <Text color="greenWhite">here.</Text>
    </TouchableOpacity>
    </Flex>
    <Divider my="2" _light={{
        bg: "grey10"
      }} _dark={{
        bg: "grey10"
      }} />


      <Text size="xl" fontWeight="extrabold" mb="2">Automatic wash bays</Text>
      <VStack space={4} mb="8">
        {washBays.map((bay, index) => (
          bay.bayType === "Automatic" &&
          <VStack space={2} bg={'white'} py={4} px={6} justifyContent={'space-between'} borderRadius="sm">
          <HStack key={index} space={4} justifyContent={'space-between'}>
          <Text fontFamily={'extrabold'} fontSize={'lg'}>Automatic wash bay {bay.bayNr}</Text>
          <Badge variant="solid" borderRadius="sm" alignSelf="flex-start" px="4" bg={bay.available ? "greenWhite" : "orange"}>{bay.available ? "Available" : "Not available"}</Badge>
          </HStack>
          <VStack space={0.5}>
          <Text fontFamily={'medium'} mt={4}>Max Dimensions</Text>
          <Text>Max height: {bay.dimensionHeight}</Text>
          <Text>Max width: {bay.dimensionWidth}</Text>
          </VStack>
          </VStack>
        ))}
      </VStack>
      <Divider my="2" _light={{
        bg: "grey10"
      }} _dark={{
        bg: "grey10"
      }} />
      <Text size="xl" fontWeight="extrabold" mb="2">Self-wash bays</Text>

      <VStack space={4}>
      {washBays.map((bay, index) => (
          bay.bayType === "Self wash" &&
          <VStack space={2} bg={'white'} py={4} px={6} justifyContent={'space-between'} borderRadius="sm">
          <HStack key={index} space={4} justifyContent={'space-between'}>
          <Text fontFamily={'medium'} fontSize={'lg'}>Self-wash bay {bay.bayNr}</Text>
          <Badge variant="solid" borderRadius="sm" alignSelf="flex-start" px="4" bg={bay.available ? "greenWhite" : "orange"}>{bay.available ? "Available" : "Not available"}</Badge>
          </HStack>
          <VStack space={0.5}>
          <Text fontFamily={'medium'} mt={4}>Max Dimensions</Text>
          <Text>Max height: {bay.dimensionHeight}</Text>
          <Text>Max width: {bay.dimensionWidth}</Text>
          </VStack>
          </VStack>
        ))}
      </VStack>
      

</ScrollView>
  )
}

export default Location