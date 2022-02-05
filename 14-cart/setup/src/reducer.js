const reducer = (state, action) => {
    if(action.type === 'CLEAR_CART'){
        return {...state, cart: []}
    }

    if(action.type === 'REMOVE'){
        return {...state, cart: state.cart.filter((item) => item.id !== action.payload)}
    }

    // INCREASE AND DECREASE FUNC ARE ALMOST SAME --> SO DO IT IN ONE FUNC
    if(action.type === 'INCREASE'){
        let tempCart = state.cart.map((item) => {
            if(item.id === action.payload){
                return {...item, amount: item.amount + 1}
            }
            return item;
        })
        return {...state, cart: tempCart}
    }

    if(action.type === 'DECREASE'){
        let tempCart = state.cart.map((item) => {
            if(item.id === action.payload){
                return {...item, amount: item.amount - 1}
            }
            return item;
        })
        .filter((item) => item.amount !== 0)   // if counter went to 0 so remove it from cart
        return {...state, cart: tempCart}
    }

    if(action.type === 'GET_TOTALS'){
        let {total, amount} = state.cart.reduce((accumulator, item) => {
            const {price, amount} = item;
            const totalItem = price * amount;

            accumulator.total += totalItem;
            accumulator.amount += amount;
            return accumulator;
        }, {total: 0, amount: 0})

        total = parseFloat(total.toFixed(2));
        return {...state, total, amount}
    }

    if(action.type === 'LOADING'){
        return {...state, loading: true}
    }

    if(action.type === 'DISPLAY_ITEMS'){
        return {...state, cart: action.payload, loading: false}
    }
    
    // INCREASE AND DECREASE FUNC ARE ALMOST SAME --> SO DO IT IN ONE FUNC
    if(action.type === 'TOGGLE_AMOUNT'){
        let tempCart = state.cart.map((item) => {
            if(item.id === action.payload.id){
                if(action.payload.type === 'inc'){
                    return {...item, amount: item.amount + 1}
                }
                if(action.payload.type === 'dec'){
                    return {...item, amount: item.amount - 1}
                }
            }
            return item;
        }).filter((item) => item.amount !== 0)

        return {...state, cart: tempCart}
    }
}

export default reducer;