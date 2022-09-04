export default interface RootReducerState {
    AuthReducer: {
        currentUser: string
        infoUser: {
            username: boolean
            img: string
        }
    }
    CartReducer: {
        totalQuantity: boolean
        cartItems: []
        totalAmount: number
    }
    CartUiReducer: {
        cartIsVisible: boolean
    }
}
