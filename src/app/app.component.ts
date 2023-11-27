import { Component } from '@angular/core';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { environment } from './core/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'spaces';

  ngOnInit(): void {
    if (ApplePaySession) {
      if (ApplePaySession.canMakePayments()) {
        alert('hi, I can do ApplePay.....');
        alert('sad');
        alert(ApplePaySession);
        const session = new ApplePaySession(1, {
          currencyCode: 'SAR',
          countryCode: 'SA',
          requiredShippingContactFields: ['postalAddress'],
          lineItems: [{ label: 'subTotalDescr', amount: '11' }],
          total: {
            label: 'bag',
            amount: '100',
          },
          supportedNetworks: ['masterCard', 'visa'],
          merchantCapabilities: [
            'supports3DS',
            'supportsEMV',
            'supportsCredit',
            'supportsDebit',
          ],
        });
        alert(session);
        session.onpaymentauthorized = (event: any) => {
          alert(event);
        };
      }
    }

    const messaging = getMessaging();
    alert('Notification permission granted.');
    getToken(messaging, { vapidKey: environment.vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          console.log(currentToken);
        } else {
          console.log(
            'No registration token available. Request permission to generate one.'
          );
        }
        onMessage(messaging, (payload) => {
          console.log('Message received. ', payload);
        });
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  }
}
