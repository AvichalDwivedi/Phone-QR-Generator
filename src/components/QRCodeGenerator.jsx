import { useState, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import PhoneInput from './PhoneInput'

const QRCodeGenerator = () => {
  const [qrValue, setQrValue] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const qrRef = useRef(null)

  const handleGenerate = (number) => {
    // Format as tel: link for easy phone calling
    const formattedNumber = `tel:${number}`
    setQrValue(formattedNumber)
    setPhoneNumber(number)
  }

  const downloadQRCode = () => {
    if (qrRef.current) {
      const svg = qrRef.current
      const svgData = new XMLSerializer().serializeToString(svg)
      const blob = new Blob([svgData], { type: "image/svg+xml" })
      const url = URL.createObjectURL(blob)
      
      const downloadLink = document.createElement('a')
      downloadLink.href = url
      downloadLink.download = `phone-qr-${phoneNumber}.svg`
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div>
      <PhoneInput onGenerate={handleGenerate} />
      
      <div className="qr-result">
        {qrValue ? (
          <>
            <div className="phone-number-display">
              Phone Number: {phoneNumber}
            </div>
            <div className="qr-code">
              <QRCodeSVG
                ref={qrRef}
                value={qrValue}
                size={256}
                level="H"
                includeMargin
              />
            </div>
            <button onClick={downloadQRCode} className="download-btn">
              Download QR Code
            </button>
          </>
        ) : (
          <div className="qr-placeholder">
            Your QR code will appear here
          </div>
        )}
      </div>
    </div>
  )
}

export default QRCodeGenerator