import React from 'react'

const FormatPrice = {
    formatPrice: (price) => {
        return String(price).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
    }
}

export default FormatPrice
