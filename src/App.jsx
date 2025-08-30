import React from 'react'
import QRCodeGenerator from './components/QRCodeGenerator'

function App() {
  return (
    <div className="app">
      <h1>Phone QR Code Generator</h1>
      <p className="instructions">
        Enter a phone number to generate a QR code that can be scanned to quickly call or save the number.
      </p>
      <QRCodeGenerator />
    </div>
  )
}

export default App