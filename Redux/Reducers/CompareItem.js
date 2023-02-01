import { ADD_TO_COMPARE, REMOVE_FROM_COMPARE, CLEAR_COMPARE } from './Constants'

// ItemCarrinho com estado inicial nulo
//const compareItems = (state = [], action) => {
//    switch (action.type) {
//        // Se adicionar itemCarrinho...
//        case ADD_TO_COMPARE:
//            //Verifica se existe items existentes no carrinho (...state)
//            return [...state, action.payload]
//        // Se decrementar itemCarrinho
//        case REMOVE_FROM_COMPARE:
//            // passa-se um filtro pelo o state verificaando se existe item, se existir, remove item.
//            return state.filter(compareItem => compareItem !== action.payload)
//        // Se excluir todos os itens carrinho
//        case CLEAR_COMPARE:
//            // Retorna State vazio... Esvazia o carrinho e o Estate volta para Vazio
//            return state = []
//    }
//    return state;
//}

const compareItems = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_COMPARE:
            if (state.length < 2) {
                return [...state, action.payload]
            }
            return state;
        case REMOVE_FROM_COMPARE:
            return state.filter(compareItem => compareItem !== action.payload)
        case CLEAR_COMPARE:
            return state = []
    }
    return state;
}


export default compareItems;