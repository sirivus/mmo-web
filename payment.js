function buildSupportedPaymentMethodData() {
    // Example supported payment methods:
    return [{
      supportedMethods: 'https://example.com/pay'
    }];
  }
  
  function buildShoppingCartDetails() {
    // Hardcoded for demo purposes:
    return {
      id: 'order-123',
      displayItems: [
        {
          label: 'Example item',
          amount: {currency: 'USD', value: '1.00'}
        }
      ],
      total: {
        label: 'Total',
        amount: {currency: 'USD', value: '1.00'}
      }
    };
  }
  