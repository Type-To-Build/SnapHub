import { IBookingData } from "./BookingInterface";
import { createSlice } from '@reduxjs/toolkit';
import { getDaysDifference } from '@/utils'


const initialState: IBookingData = {
  location: '',
  isLoading: false,
  cart: [],
  checkInDate: null,
  checkOutDate: null,
  hotel: null,
  pricing: {
    pricePerNight: 0,
    platformFee: 0,
    total: 0,
  },
  bookingData:{},
  guest: {
    adult: 1,
    children: 0
  }

};

export const Bookinglice = createSlice({
  name: 'Bookings',
  initialState: initialState,
  reducers: {
    selectLocation: (state, action) => {
      state.location = action.payload
    },
    hotel: (state, action) => {
      state.hotel = action.payload
    },
    bookingData: (state, action) => {
      state.bookingData = action.payload
    },
    
    calcPricing: (state, action) => {


      let price = 0
      let guestCount = {
        Dependent: 0,
        Civilian: 0,
      }
      console.log(action.payload?.guestList,'---action.payload?.guestList');
      
      for (let guest of (action.payload?.guestList || [])) {
        if (guest?.category == 'Dependent') {
          guestCount.Dependent += 1
        } else if (guest?.category == 'Civilian') {
          guestCount.Civilian += 1
        }
      }
   
      let priceAcordingToName:any = {}

      if (action.payload?.bookingFor == 'main') {
        const cartRooms = JSON.parse(JSON.stringify(state.cart));

        if (action.payload?.temporaryDuty == 'yes') {
          if (action.payload?.rank == 'LtCdrAndBelow') {
            price += cartRooms[0].pricing?.tyDutyLtCdrAndBelow
          } else if (action.payload?.rank == 'CdrAndAbove') {
            price += cartRooms[0].pricing?.tyDutyCdrAndAbove
          } else {
            price += cartRooms[0].pricing[action.payload.jobType]
          }
        } else {
          price += cartRooms[0].pricing[action.payload.jobType]
        }
        // cartRooms.splice(0, 1);
        cartRooms[0].quantity -=1
        priceAcordingToName[cartRooms.name] = price

        for (let room of cartRooms) {
          for (let index = 1; index <= room.quantity; index++) {
            if (guestCount.Dependent != 0) {
              price += room.pricing[`${action.payload.jobType}Dependent`]
              guestCount.Dependent -= 1
            } else if (guestCount.Civilian != 0) {
              price += room.pricing[`${action.payload.jobType}Civilian`]
              guestCount.Civilian -= 1
            }
          }
        }
        
      }else{

        for (let room of state.cart) {
          for (let index = 1; index <= room.quantity; index++) {
            if (guestCount.Dependent != 0) {
              price += room.pricing[`${action.payload.jobType}Dependent`]
              guestCount.Dependent -= 1
            } else if (guestCount.Civilian != 0) {
              price += room.pricing[`${action.payload.jobType}Civilian`]
              guestCount.Civilian -= 1
            }
          }
        }
      } 
  
      state.pricing = {
        pricePerNight: price,
        platformFee: 0,
        total: price * (getDaysDifference(state.checkInDate, state.checkOutDate) || 1) ,
      }
    },
    addRoom: (state, action) => {
      const itemExists = state.cart.findIndex((item: any) => (item._id === action.payload._id && item.hotel == action.payload.hotel));
      if (itemExists != -1) {
        state.cart[itemExists].quantity += 1;
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1
        });
      }

    },
    removeRoom: (state, action) => {
      const itemExists = state.cart.findIndex((item: any) => (item._id === action.payload._id && item.hotel == action.payload.hotel));

      if (itemExists != -1) {
        if (state.cart[itemExists].quantity === 1) {
          state.cart.splice(itemExists, 1);
        } else {
          state.cart[itemExists].quantity -= 1;
        }
      }
    },

  

    checkInDate: (state, action) => {
      state.checkInDate = action.payload
    },
    checkOutDate: (state, action) => {
      state.checkOutDate = action.payload
    },
    emptyCart:(state,action) =>{
      state.guest = {
        adult: 1,
        children: 0
      }
      state.cart = []
      state.checkInDate = null
      state.checkOutDate = null
    },
    addGuest: (state, action) => {
      if (action.payload == 'adult') {
        state.guest.adult += 1
      } else {
        state.guest.children += 1
      }
      
    },
    removeGuest: (state, action) => {
      if (action.payload == 'adult') {
        state.guest.adult = state.guest.adult == 1 ? 1 : state.guest.adult - 1
      } else {
        state.guest.children = state.guest.children == 0 ? 0 : state.guest.children - 1
      }
    },
  },
});
export const bookingActions = { ...Bookinglice.actions };

export default Bookinglice.reducer
