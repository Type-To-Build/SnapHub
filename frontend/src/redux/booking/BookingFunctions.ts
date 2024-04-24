import { getDaysDifference } from '@/utils'

export const calcPrice = (cart:any,values:any,checkInDate:any, checkOutDate:any,user:any) => {
    const platformFee = 25;
    let price = 0
    let priceByRoom: any = []
    let guestCount = {
        Dependent: 0,
        Civilian: 0,
    }
    let calcNigts: number = 1
    try {
        calcNigts = getDaysDifference(checkInDate, checkOutDate)
    } catch (error) {
        calcNigts = 1
    }

    for (let guest of (values?.guestList || [])) {
        if (guest?.category == 'Dependent') {
            guestCount.Dependent += 1
        } else if (guest?.category == 'Civilian') {
            guestCount.Civilian += 1
        }
    }

    let priceAcordingToName: any = {}

    if (values?.bookingFor == 'main') {
        const cartRooms = JSON.parse(JSON.stringify(cart));

        if (values?.temporaryDuty == 'yes') {
            if (values?.rank == 'LtCdrAndBelow') {
                price += cartRooms[0].pricing?.tyDutyLtCdrAndBelow
            } else if (values?.rank == 'CdrAndAbove') {
                price += cartRooms[0].pricing?.tyDutyCdrAndAbove
            } else {
                price += cartRooms[0].pricing[user.jobType]
            }
        } else {
            price += cartRooms[0].pricing[user.jobType]
        }
        // cartRooms.splice(0, 1);

        priceByRoom.push({
            _id: cartRooms[0]._id,
            hotel: cartRooms[0].hotel,
            nights: calcNigts,
            pricing: cartRooms[0].pricing,
            price,
            name: cartRooms[0].name,
            quantity: cartRooms[0].quantity
        })

        cartRooms[0].quantity -= 1
        priceAcordingToName[cartRooms.name] = price


        for (let room of cartRooms) {
            let roomPrice = 0

            for (let index = 1; index <= room.quantity; index++) {
                if (guestCount.Dependent != 0) {
                    price += room.pricing[`${user.jobType}Dependent`]
                    roomPrice += room.pricing[`${user.jobType}Dependent`]

                    guestCount.Dependent -= 1
                } else if (guestCount.Civilian != 0) {
                    price += room.pricing[`${user.jobType}Civilian`]
                    roomPrice += room.pricing[`${user.jobType}Civilian`]

                    guestCount.Civilian -= 1
                }
            }
            let filterd = priceByRoom.findIndex((item: any) => item.name == room.name)
            if (filterd != -1) {
                priceByRoom[filterd].price += roomPrice
            } else {
                priceByRoom.push({
                    _id: room._id,
                    hotel: room.hotel,
                    nights: calcNigts,
                    pricing: room.pricing,
                    price: roomPrice,
                    name: room.name,
                    quantity: room.quantity
                })
            }

        }

    } else {

        for (let room of cart) {
            let roomPrice = 0
            for (let index = 1; index <= room.quantity; index++) {
                if (guestCount.Dependent != 0) {
                    price += room.pricing[`${user.jobType}Dependent`]
                    roomPrice += room.pricing[`${user.jobType}Dependent`]
                    guestCount.Dependent -= 1
                } else if (guestCount.Civilian != 0) {
                    price += room.pricing[`${user.jobType}Civilian`]
                    roomPrice += room.pricing[`${user.jobType}Civilian`]

                    guestCount.Civilian -= 1
                }
            }
            priceByRoom.push({
                _id: room._id,
                hotel: room.hotel,
                nights: calcNigts,
                pricing: room.pricing,
                price: roomPrice,
                name: room.name,
                quantity: room.quantity
            })

        }
    }
    const roomFare = priceByRoom.reduce((accumulator: any, currentItem: any) => {
        return accumulator + (currentItem['price'] * currentItem['nights']);
    }, 0);

    return {
        priceByRoom,
        roomFare,
        calcNigts,
        platformFee,
        totalPrice: roomFare + platformFee
    }
}