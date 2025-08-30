import { useState } from 'react'

const PhoneInput = ({ onGenerate }) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const input = e.target.value
    // Allow only numbers and optional + at the beginning
    if (/^\+?[0-9]*$/.test(input)) {
      setPhoneNumber(input)
      setError('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!phoneNumber.trim()) {
      setError('Please enter a phone number')
      return
    }
    
    if (phoneNumber.length < 7) {
      setError('Please enter a valid phone number')
      return
    }
    
    onGenerate(phoneNumber)
  }

  return (
    <form onSubmit={handleSubmit} className="phone-input-container">
      <input
        type="text"
        value={phoneNumber}
        onChange={handleInputChange}
        placeholder="Enter phone number (e.g., +1234567890)"
        className="phone-input"
      />
      {error && <div className="error">{error}</div>}
      <button type="submit" className="download-btn">
        Generate QR Code
      </button>
    </form>
  )
}

export default PhoneInput