import React from 'react'

// Auth
export const Login = React.lazy(() => import('../Screens/Auth/Login/login'))

// Customers
export const AllCustomer = React.lazy(() => import('../Screens/Customers/AllCustomers/allCustomers'))
export const MyCustomer = React.lazy(() => import('../Screens/Customers/MyCustomers/myCustomers'))
export const StatementReport = React.lazy(() => import('../Screens/Customers/StatementReport/statementReport'))
export const ContactForm = React.lazy(() => import('../Screens/Customers/ContactForm/contactForm'))

// Orders
export const AllOrders = React.lazy(() => import('../Screens/Orders/AllOrders/allOrders'))
export const MyOrders = React.lazy(() => import('../Screens/Orders/MyOrders/MyOrders'))
export const Order = React.lazy(() => import('../Screens/Orders/Order/order'))
export const OrderTransactions = React.lazy(() => import('../Screens/Orders/Transactions/transactions'))
export const FormReturn = React.lazy(() => import('../Screens/Orders/FormReturn/formReturn'))
export const AuditOrders = React.lazy(() => import('../Screens/Orders/Audit/audit'))

// Users
export const MyAccount = React.lazy(() => import('../Screens/Users/MyAccount/myAccount'))
export const MyInformationEdit = React.lazy(() => import('../Screens/Users/MyAccount/MyInformation/MyInformationEdit'))
export const UsersRegister = React.lazy(() => import('../Screens/Users/Register/register'))

// Statement
export const Statement = React.lazy(() => import('../Screens/Statement/Show/statement'))

// Discounts
export const AllDiscounts = React.lazy(() => import('../Screens/Discounts/AllDiscounts/allDiscounts'))
export const MyDiscounts = React.lazy(() => import('../Screens/Discounts/MyDiscounts/myDiscounts'))
export const ReturnCodes = React.lazy(() => import('../Screens/Discounts/ReturnCodes/returnCodes'))

// Themes
export const StoreThemesRegister = React.lazy(() => import('../Screens/Themes/Register/themeRegister'))

// Languages
export const Languages = React.lazy(() => import('../Screens/Languages/Languages'))

// Adjustment
export const CloseMonth = React.lazy(() => import('../Screens/CloseMonth/closeMonth'))

// General Settings
export const AddBanners = React.lazy(() => import('../Screens/GeneralSettings/addBanners/addBanners'))
export const GeneralSettingsRegister = React.lazy(() => import('../Screens/GeneralSettings/register/register'))

// Applications
export const ApplicationsRegister = React.lazy(() => import('../Screens/Applications/Register/register'))

// Roles
export const RolesRegister = React.lazy(() => import('../Screens/Roles/Register/register'))

// Menu Options
export const MenuOptionsRegister = React.lazy(() => import('../Screens/MenuOptions/Register/register'))

// Others
export const NotSecurityLevel = React.lazy(() => import('../Screens/Errors/notSecurityLevel'))
export const NotFound = React.lazy(() => import('../Screens/Errors/404'))
