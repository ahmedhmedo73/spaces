if (window.ApplePaySession) {
    const paymentRequest = {
        currencyCode: "SAR",
        countryCode: "SA",
        requiredShippingContactFields: ["postalAddress"],
        lineItems: [{ label: "subTotalDescr", amount: 11 }],
        total: {
            label: "bag",
            amount: 100,
        },
        supportedNetworks: ["masterCard", "visa"],
        merchantCapabilities: [
            "supports3DS",
            "supportsEMV",
            "supportsCredit",
            "supportsDebit",
        ],
    };
    if (window.ApplePaySession.canMakePayments) {
        alert("hi, I can do ApplePay.....");
        alert("sad");
        alert(window.ApplePaySession);
        alert(new window.ApplePaySession(1, paymentRequest));
        const session = new window.ApplePaySession(1, paymentRequest);
        alert("session", session);
        session.onpaymentauthorized = (event) => {
            alert(event);
        };
    }
}