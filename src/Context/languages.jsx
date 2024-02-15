import React, { createContext, useContext, useState, useEffect } from 'react'
import { getCookie, setCookie } from '../Utils/utils'
import { LoaderBasic } from '../Components/Common/loader/loader'
import enIntl from '../Docs/Intl18/en'
import esIntl from '../Docs/Intl18/es'

const LanguageContext = createContext()

export function useLanguage () {
  return useContext(LanguageContext)
}

function initializeUserLanguage (userLanguage) {
  if (!userLanguage) {
    setCookie({ cookie: 'language-selected', value: 'en', expires: 30, secure: false })
  }
  return userLanguage
}

export function LanguageProvider ({ children }) {
  const userLanguage = getCookie({ cookie: 'language-selected' })

  const [locale, setLocale] = useState('en')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initData = initializeUserLanguage(userLanguage)
    setLocale(initData)
    setLoading(false)
  }, [userLanguage])

  const languageTexts = {
    en: enIntl,
    es: esIntl
  }

  const changeLanguage = (newLocale) => {
    setCookie({ cookie: 'language-selected', value: newLocale, expires: 30, secure: false })
    setLocale(newLocale)
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, languageTexts, changeLanguage }}>
      {loading || !locale ? <LoaderBasic /> : children}
    </LanguageContext.Provider>
  )
}
