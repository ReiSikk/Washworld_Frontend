import { configureStore } from '@reduxjs/toolkit'
import { subscriptionSlice } from './SubscriptionSlice'
import { stepSlice } from './StepSlice'
import { MemberSlice } from './MemberSlice'
import { cardSlice } from './CardSlice'
import { washStationSlice } from './WashStationSlice'
import { supportTicketSlice } from './SupportTicketSlice'

export const store = configureStore({
  reducer: {
    subscription: subscriptionSlice.reducer,
    step: stepSlice.reducer,
    member: MemberSlice.reducer,
    cards: cardSlice.reducer,
    washStations: washStationSlice.reducer,
    supportTickets: supportTicketSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch