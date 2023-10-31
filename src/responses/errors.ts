export const errorObject = {
    invalidCredentials: {
        code: 'invalid-credentials',
        message: 'Login failed due to invalid credentials.',
    },
    userNotExists: {
        code: 'userNotExists',
        message: 'No user found for given _id, Please try again with diff id.'
    },
    skuNotFound: {
        code: 'SKU-not-exist',
        message: 'Given SKU is invalid or does not exists.'
    },
    storeInventoryIsEmpty: {
        code: 'store-inventory-is-empty',
        message: 'Store inventory for the given store is empty'
    },
    storeDoesNotExists: {
        code: 'store-does-not-exists',
        message: 'The store you are looking is not available, You might mistyped. Please enter correct store id'
    },
    userAlreadyExist: {
        code: 'User Already Exist',
        message: 'User Already Exist'
    },
    cartDoesNotExists: {
        code: 'cart-not-exists',
        message: 'Cart does not exists'
    },
    cartAlreadyAssigned: {
        code: 'cart-already-assigned',
        message: 'Cart Id is already assigned to user'
    },
    tooEarlyToUpdateOrder: {
        code: 'tooEarlyToUpdateOrder',
        message: 'You can update an order only 3 hrs after order placed'
    }
}