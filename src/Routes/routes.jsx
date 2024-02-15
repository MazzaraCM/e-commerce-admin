import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoaderBasic } from '../Components/Common/loader/loader'

import { ProtectedRouteAuthenticated, ProtectedRouteNotAuthenticated, RouteRedirect } from './protectedRoute'
import LayoutAuth from '../Layouts/Auth/auth'
import LayoutAdmin from '../Layouts/Admin/admin'
import SimpleLayoutAdmin from '../Layouts/Admin/settings'
import { Dashboard } from './renderDashboards'
import {
  Login,
  AllCustomer,
  MyCustomer,
  ContactForm,
  StatementReport,
  AllOrders,
  MyOrders,
  Order,
  OrderTransactions,
  FormReturn,
  AuditOrders,
  MyAccount,
  UsersRegister,
  Statement,
  StoreThemesRegister,
  AllDiscounts,
  MyDiscounts,
  ReturnCodes,
  AddBanners,
  Languages,
  CloseMonth,
  GeneralSettingsRegister,
  ApplicationsRegister,
  RolesRegister,
  MenuOptionsRegister,
  NotFound,
  NotSecurityLevel
} from './mainRoutes'

import { Name, Email, Phone, Country, City, Province, ZipCode, AddressLine1, AddressLine2, StoreName, StoreColors, StoreEmail, StoreLanguage, StorePhone, StoreStatus, ShowDiscount, SocialNetwork, StoreBanners, CreditCard, PaymentEmail, W9 } from './settingsRoutes'

export default function RoutesIndex () {
  return (
    <Suspense fallback={<LoaderBasic />}>
      <Routes>
        <Route element={<LayoutAuth />}>
          <Route element={<ProtectedRouteNotAuthenticated />}>
            <Route path='/login' element={<Login />} title='Login' />
          </Route>
        </Route>
        <Route element={<LayoutAdmin />}>
          <Route element={<RouteRedirect newPath='/dashboard' />}>
            <Route path='/' element={<Dashboard />} title='Home' />
            <Route path='/dashboard-store' element={<Dashboard />} title='Home' />
            <Route path='/dashboard-finanzas' element={<Dashboard />} title='Home' />
            <Route path='/dashboard-customer-services' element={<Dashboard />} title='Home' />
          </Route>
          <Route element={<RouteRedirect newPath='/users/my-account' />}>
            <Route path='/settings' element={<MyAccount />} title='Settings' />
          </Route>
          <Route path='/dashboard' element={<ProtectedRouteAuthenticated securityLevel={1}><Dashboard /></ProtectedRouteAuthenticated>} title='DashboardAdmin' />
          <Route path='/customers'>
            <Route path='all-customers' element={<ProtectedRouteAuthenticated securityLevel={10}><AllCustomer /></ProtectedRouteAuthenticated>} title='AllCustomer' />
            <Route path='my-customers' element={<ProtectedRouteAuthenticated securityLevel={1}><MyCustomer /></ProtectedRouteAuthenticated>} title='MyCustomer' />
            <Route path='statement-report' element={<ProtectedRouteAuthenticated securityLevel={10}><StatementReport /></ProtectedRouteAuthenticated>} title='MyCustomer' />
            <Route path='contact-form' element={<ProtectedRouteAuthenticated securityLevel={10}><ContactForm /></ProtectedRouteAuthenticated>} title='ContactForm' />
          </Route>
          <Route path='/orders'>
            <Route path='show-orders' element={<ProtectedRouteAuthenticated securityLevel={1}><AllOrders /></ProtectedRouteAuthenticated>} title='MyOrders' />
            <Route path='show' element={<ProtectedRouteAuthenticated securityLevel={1}><MyOrders /></ProtectedRouteAuthenticated>} title='MyOrders' />
            <Route path='transactions' element={<ProtectedRouteAuthenticated securityLevel={1}><OrderTransactions /></ProtectedRouteAuthenticated>} title='OrderTransactions' />
            <Route path='show-form-returns' element={<ProtectedRouteAuthenticated securityLevel={1}><FormReturn /></ProtectedRouteAuthenticated>} title='FormReturn' />
            <Route path='audit' element={<ProtectedRouteAuthenticated securityLevel={1}><AuditOrders /></ProtectedRouteAuthenticated>} title='AuditOrders' />
            <Route path=':order_name' element={<ProtectedRouteAuthenticated securityLevel={1}><Order /></ProtectedRouteAuthenticated>} title='Order' />
          </Route>
          <Route path='/users'>
            <Route path='my-account'>
              <Route path='' element={<ProtectedRouteAuthenticated securityLevel={1}><MyAccount /></ProtectedRouteAuthenticated>} title='MyAccount' />
              <Route path='personal-information' element={<ProtectedRouteAuthenticated securityLevel={1}><MyAccount /></ProtectedRouteAuthenticated>} title='MyAccount' />
              <Route path='store-settings' element={<ProtectedRouteAuthenticated securityLevel={1}><MyAccount /></ProtectedRouteAuthenticated>} title='MyAccount' />
              <Route path='payment-settings' element={<ProtectedRouteAuthenticated securityLevel={1}><MyAccount /></ProtectedRouteAuthenticated>} title='MyAccount' />
            </Route>
            <Route path='register' element={<ProtectedRouteAuthenticated securityLevel={10}><UsersRegister /></ProtectedRouteAuthenticated>} title='UsersRegister' />
          </Route>
          <Route path='/statement'>
            <Route path='show' element={<ProtectedRouteAuthenticated securityLevel={1}><Statement /></ProtectedRouteAuthenticated>} title='Statement' />
          </Route>
          <Route path='/store-themes'>
            <Route path='register' element={<ProtectedRouteAuthenticated securityLevel={1}><StoreThemesRegister /></ProtectedRouteAuthenticated>} title='StoreThemesRegister' />
          </Route>
          <Route path='/general-settings'>
            <Route path='add-banners' element={<ProtectedRouteAuthenticated securityLevel={10}><AddBanners /></ProtectedRouteAuthenticated>} title='AddBanners' />
            <Route path='register' element={<ProtectedRouteAuthenticated securityLevel={10}><GeneralSettingsRegister /></ProtectedRouteAuthenticated>} title='GeneralSettingsRegister' />
          </Route>
          <Route path='/discount-codes'>
            <Route path='all' element={<ProtectedRouteAuthenticated securityLevel={10}><AllDiscounts /></ProtectedRouteAuthenticated>} title='AllDiscounts' />
            <Route path='my-discounts' element={<ProtectedRouteAuthenticated securityLevel={1}><MyDiscounts /></ProtectedRouteAuthenticated>} title='MyDiscounts' />
            <Route path='order-returns' element={<ProtectedRouteAuthenticated securityLevel={1}><ReturnCodes /></ProtectedRouteAuthenticated>} title='ReturnCodes' />
          </Route>
          <Route path='/languages'>
            <Route path='register' element={<ProtectedRouteAuthenticated securityLevel={10}><Languages /></ProtectedRouteAuthenticated>} title='Languages' />
          </Route>
          <Route path='/applications'>
            <Route path='register' element={<ProtectedRouteAuthenticated securityLevel={10}><ApplicationsRegister /></ProtectedRouteAuthenticated>} title='ApplicationsRegister' />
          </Route>
          <Route path='/roles'>
            <Route path='register' element={<ProtectedRouteAuthenticated securityLevel={10}><RolesRegister /></ProtectedRouteAuthenticated>} title='RolesRegister' />
          </Route>
          <Route path='/menu-options'>
            <Route path='register' element={<ProtectedRouteAuthenticated securityLevel={10}><MenuOptionsRegister /></ProtectedRouteAuthenticated>} title='MenuOptionsRegister' />
          </Route>
          <Route path='/adjustment' element={<ProtectedRouteAuthenticated securityLevel={10}><CloseMonth /></ProtectedRouteAuthenticated>} title='CloseMonth' />
          <Route path='/not-access' element={<ProtectedRouteAuthenticated securityLevel={1}><NotSecurityLevel /></ProtectedRouteAuthenticated>} title='NotSecurityLevel' />
          <Route path='*' element={<ProtectedRouteAuthenticated securityLevel={0}><NotFound /></ProtectedRouteAuthenticated>} title='404' />
        </Route>
        <Route element={<ProtectedRouteAuthenticated securityLevel={1}><SimpleLayoutAdmin /></ProtectedRouteAuthenticated>}>
          <Route path='settings'>
            <Route path='name' element={<Name />} title='MyAccount' />
            <Route path='email' element={<Email />} title='MyAccount' />
            <Route path='phone' element={<Phone />} title='MyAccount' />
            <Route path='country' element={<Country />} title='MyAccount' />
            <Route path='city' element={<City />} title='MyAccount' />
            <Route path='province' element={<Province />} title='MyAccount' />
            <Route path='zipcode' element={<ZipCode />} title='MyAccount' />
            <Route path='addressline' element={<AddressLine1 />} title='MyAccount' />
            <Route path='addressline2' element={<AddressLine2 />} title='MyAccount' />

            <Route path='store-name' element={<StoreName />} title='MyAccount' />
            <Route path='store-email' element={<StoreEmail />} title='MyAccount' />
            <Route path='store-phone' element={<StorePhone />} title='MyAccount' />
            <Route path='store-language' element={<StoreLanguage />} title='MyAccount' />
            <Route path='store-show-discount' element={<ShowDiscount />} title='MyAccount' />
            <Route path='store-colors' element={<StoreColors />} title='MyAccount' />
            <Route path='store-status' element={<StoreStatus />} title='MyAccount' />
            <Route path='store-social-network' element={<SocialNetwork />} title='MyAccount' />
            <Route path='store-banners' element={<StoreBanners />} title='MyAccount' />

            <Route path='credit-card' element={<CreditCard />} title='Credit Card' />
            <Route path='payment-email' element={<PaymentEmail />} title='Payment Email' />
            <Route path='w9' element={<W9 />} title='w9' />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}
