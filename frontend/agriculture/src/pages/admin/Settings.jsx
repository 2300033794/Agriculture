"use client"

import { useState } from "react"
import { Button } from "../../components/common/Button"

const SettingsPage = () => {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "FarmConnect",
    siteDescription: "Connecting farmers and consumers for a sustainable future.",
    contactEmail: "info@farmconnect.com",
    contactPhone: "+1 (555) 123-4567",
    address: "123 Farm Road, Countryside, CA 12345",
  })

  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: "50",
    standardShippingRate: "5.99",
    expressShippingRate: "12.99",
    localPickupEnabled: true,
  })

  const [paymentSettings, setPaymentSettings] = useState({
    currencyCode: "USD",
    stripeEnabled: true,
    paypalEnabled: true,
    cashOnDeliveryEnabled: true,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    orderConfirmation: true,
    orderStatusUpdate: true,
    orderShipped: true,
    orderDelivered: true,
    lowStockAlert: true,
    marketingEmails: false,
  })

  const handleGeneralChange = (e) => {
    const { name, value } = e.target
    setGeneralSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleShippingChange = (e) => {
    const { name, value, type, checked } = e.target
    setShippingSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handlePaymentChange = (e) => {
    const { name, checked } = e.target
    setPaymentSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSaveSettings = (e) => {
    e.preventDefault()
    // Simulate saving settings
    alert("Settings saved successfully!")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <form onSubmit={handleSaveSettings} className="space-y-8">
        {/* General Settings */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">General Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="siteName" className="block text-sm font-medium mb-1">
                Site Name
              </label>
              <input
                id="siteName"
                name="siteName"
                type="text"
                value={generalSettings.siteName}
                onChange={handleGeneralChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium mb-1">
                Contact Email
              </label>
              <input
                id="contactEmail"
                name="contactEmail"
                type="email"
                value={generalSettings.contactEmail}
                onChange={handleGeneralChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="contactPhone" className="block text-sm font-medium mb-1">
                Contact Phone
              </label>
              <input
                id="contactPhone"
                name="contactPhone"
                type="text"
                value={generalSettings.contactPhone}
                onChange={handleGeneralChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-1">
                Business Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={generalSettings.address}
                onChange={handleGeneralChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="siteDescription" className="block text-sm font-medium mb-1">
                Site Description
              </label>
              <textarea
                id="siteDescription"
                name="siteDescription"
                rows="3"
                value={generalSettings.siteDescription}
                onChange={handleGeneralChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        {/* Shipping Settings */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Shipping Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="freeShippingThreshold" className="block text-sm font-medium mb-1">
                Free Shipping Threshold ($)
              </label>
              <input
                id="freeShippingThreshold"
                name="freeShippingThreshold"
                type="text"
                value={shippingSettings.freeShippingThreshold}
                onChange={handleShippingChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="standardShippingRate" className="block text-sm font-medium mb-1">
                Standard Shipping Rate ($)
              </label>
              <input
                id="standardShippingRate"
                name="standardShippingRate"
                type="text"
                value={shippingSettings.standardShippingRate}
                onChange={handleShippingChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="expressShippingRate" className="block text-sm font-medium mb-1">
                Express Shipping Rate ($)
              </label>
              <input
                id="expressShippingRate"
                name="expressShippingRate"
                type="text"
                value={shippingSettings.expressShippingRate}
                onChange={handleShippingChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex items-center">
              <input
                id="localPickupEnabled"
                name="localPickupEnabled"
                type="checkbox"
                checked={shippingSettings.localPickupEnabled}
                onChange={handleShippingChange}
                className="h-4 w-4 text-green-600 border-gray-300 rounded"
              />
              <label htmlFor="localPickupEnabled" className="ml-2 block text-sm">
                Enable Local Pickup
              </label>
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Payment Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="currencyCode" className="block text-sm font-medium mb-1">
                Currency
              </label>
              <select
                id="currencyCode"
                name="currencyCode"
                value={paymentSettings.currencyCode}
                onChange={(e) => setPaymentSettings((prev) => ({ ...prev, currencyCode: e.target.value }))}
                className="w-full p-2 border rounded"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="CAD">CAD - Canadian Dollar</option>
                <option value="AUD">AUD - Australian Dollar</option>
              </select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="stripeEnabled"
                  name="stripeEnabled"
                  type="checkbox"
                  checked={paymentSettings.stripeEnabled}
                  onChange={handlePaymentChange}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded"
                />
                <label htmlFor="stripeEnabled" className="ml-2 block text-sm">
                  Enable Stripe Payments
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="paypalEnabled"
                  name="paypalEnabled"
                  type="checkbox"
                  checked={paymentSettings.paypalEnabled}
                  onChange={handlePaymentChange}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded"
                />
                <label htmlFor="paypalEnabled" className="ml-2 block text-sm">
                  Enable PayPal Payments
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="cashOnDeliveryEnabled"
                  name="cashOnDeliveryEnabled"
                  type="checkbox"
                  checked={paymentSettings.cashOnDeliveryEnabled}
                  onChange={handlePaymentChange}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded"
                />
                <label htmlFor="cashOnDeliveryEnabled" className="ml-2 block text-sm">
                  Enable Cash on Delivery
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                id="orderConfirmation"
                name="orderConfirmation"
                type="checkbox"
                checked={notificationSettings.orderConfirmation}
                onChange={handleNotificationChange}
                className="h-4 w-4 text-green-600 border-gray-300 rounded"
              />
              <label htmlFor="orderConfirmation" className="ml-2 block text-sm">
                Order Confirmation Emails
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="orderStatusUpdate"
                name="orderStatusUpdate"
                type="checkbox"
                checked={notificationSettings.orderStatusUpdate}
                onChange={handleNotificationChange}
                className="h-4 w-4 text-green-600 border-gray-300 rounded"
              />
              <label htmlFor="orderStatusUpdate" className="ml-2 block text-sm">
                Order Status Update Emails
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="orderShipped"
                name="orderShipped"
                type="checkbox"
                checked={notificationSettings.orderShipped}
                onChange={handleNotificationChange}
                className="h-4 w-4 text-green-600 border-gray-300 rounded"
              />
              <label htmlFor="orderShipped" className="ml-2 block text-sm">
                Order Shipped Emails
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="orderDelivered"
                name="orderDelivered"
                type="checkbox"
                checked={notificationSettings.orderDelivered}
                onChange={handleNotificationChange}
                className="h-4 w-4 text-green-600 border-gray-300 rounded"
              />
              <label htmlFor="orderDelivered" className="ml-2 block text-sm">
                Order Delivered Emails
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="lowStockAlert"
                name="lowStockAlert"
                type="checkbox"
                checked={notificationSettings.lowStockAlert}
                onChange={handleNotificationChange}
                className="h-4 w-4 text-green-600 border-gray-300 rounded"
              />
              <label htmlFor="lowStockAlert" className="ml-2 block text-sm">
                Low Stock Alerts
              </label>
            </div>

            <div className="flex items-center">
              <input
                id="marketingEmails"
                name="marketingEmails"
                type="checkbox"
                checked={notificationSettings.marketingEmails}
                onChange={handleNotificationChange}
                className="h-4 w-4 text-green-600 border-gray-300 rounded"
              />
              <label htmlFor="marketingEmails" className="ml-2 block text-sm">
                Marketing Emails
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save Settings</Button>
        </div>
      </form>
    </div>
  )
}

export default SettingsPage
