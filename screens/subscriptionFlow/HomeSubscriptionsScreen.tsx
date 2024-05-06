import React, { useEffect, useState } from 'react'
import { Text } from 'native-base'
import SubscriptionCard from '../../components/SubscriptionCard'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../MainNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubscriptions } from '../../store/SubscriptionSlice';
import { AppDispatch, RootState } from '../../store/store';
import { Subscription } from '../../entities/subscription';

type Props = NativeStackScreenProps<RootStackParamList, "HomeSubscriptionsScreen">

type ItemProps = { plan: Subscription, onPress: () => void };

const Item = ({plan, onPress}: ItemProps) => (
  <SubscriptionCard plan={plan} onPress={onPress} />
);

function HomeSubscriptionsScreen({ navigation }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const subscriptions = useSelector((state: RootState) => state.subscription.subscriptions);

  // Fetch the subscription plans when the component mounts
  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, [dispatch]);


  return (
    <>
      <Text>Map all subscription plans as cards down here</Text>
      {subscriptions.map((plan: Subscription) => (
        <Item 
          key={plan.id} 
          plan={plan}
          onPress={() => navigation.navigate('PlanOverview', { subscriptionPlanID: plan.id-1 })}
        />
      ))}
    </>
  )
}

export default HomeSubscriptionsScreen