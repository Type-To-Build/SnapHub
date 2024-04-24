export interface IBookingData {
  location: string,
  isLoading: boolean,
  cart: any,
  checkInDate: any,
  checkOutDate: any,
  hotel:any,
  guest: {
    adult: number,
    children: number
  },
  bookingData: any,
  pricing:{
    pricePerNight: number,
    platformFee: number,
    total: number,
  }

}