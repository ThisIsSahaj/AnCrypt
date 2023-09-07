import React from 'react'
import AuthModal from '../Components/Authentication/AuthModal'
import PublicPortfolio from '../Components/publicPortfolio'
import { CryptoState } from '../CryptoContext'

const PublicPort = () => {
    const {user}= CryptoState();
  return (
    (user ? <PublicPortfolio/> : "You need to Login before accessing any Public Portfolio on AnCrypt")
  )
}

export default PublicPort