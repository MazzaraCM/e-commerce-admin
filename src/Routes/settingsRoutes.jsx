import React from 'react'

// General Settings
export const Name = React.lazy(() => import('../Screens/Users/MyAccount/MyInformation/Screens/PersonalInformation/name'))
export const Email = React.lazy(() => import('../Screens/Users/MyAccount/MyInformation/Screens/PersonalInformation/email'))
export const Phone = React.lazy(() => import('../Screens/Users/MyAccount/MyInformation/Screens/PersonalInformation/phone'))
export const Country = React.lazy(() => import('../Screens/Users/MyAccount/MyInformation/Screens/PersonalInformation/country'))
export const City = React.lazy(() => import('../Screens/Users/MyAccount/MyInformation/Screens/PersonalInformation/city'))
export const Province = React.lazy(() => import('../Screens/Users/MyAccount/MyInformation/Screens/PersonalInformation/province'))
export const ZipCode = React.lazy(() => import('../Screens/Users/MyAccount/MyInformation/Screens/PersonalInformation/zipCode'))
export const AddressLine1 = React.lazy(() => import('../Screens/Users/MyAccount/MyInformation/Screens/PersonalInformation/addressLine1'))
export const AddressLine2 = React.lazy(() => import('../Screens/Users/MyAccount/MyInformation/Screens/PersonalInformation/addressLine2'))
// Store Settings
export const StoreName = React.lazy(() => import('../Screens/Users/MyAccount/MyInformation/Screens/StoreSettings/storeName'))
export const StoreEmail = React.lazy(() => import('../Screens/Users/MyAccount/MyInformation/Screens/StoreSettings/storeEmail'))
export const StorePhone = React.lazy(() => import('../Screens/Users/MyAccount/MyInformation/Screens/StoreSettings/storePhone'))
export const StoreLanguage = React.lazy(() => import('../Screens/Users/MyAccount/MyInformation/Screens/StoreSettings/storeLanguage'))
export const ShowDiscount = React.lazy(() => import('../Screens/Users/MyAccount/MyInformation/Screens/StoreSettings/storeShowDiscount'))
export const StoreColors = React.lazy(() => import('../Screens/Users/MyAccount/MyInformation/Screens/StoreSettings/storeColors'))
export const StoreStatus = React.lazy(() => import('../Screens/Users/MyAccount/MyInformation/Screens/StoreSettings/storeStatus'))
export const SocialNetwork = React.lazy(() => import('../Screens/Users/MyAccount/MyInformation/Screens/StoreSettings/storeSocialNetwork'))
export const StoreBanners = React.lazy(() => import('../Screens/Users/MyAccount/MyInformation/Screens/StoreSettings/storeBanners'))
// Payment Settings
export const CreditCard = React.lazy(() => import('../Screens/Users/MyAccount/MyInformation/Screens/PaymentSettings/creditCard'))
export const PaymentEmail = React.lazy(() => import('../Screens/Users/MyAccount/MyInformation/Screens/PaymentSettings/paymentEmail'))
export const W9 = React.lazy(() => import('../Screens/Users/MyAccount/MyInformation/Screens/PaymentSettings/w9'))
