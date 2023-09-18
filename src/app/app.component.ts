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
    const messaging = getMessaging();
    console.log('Notification permission granted.');
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
            console.log("Message received. ", payload);
        });
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  }
}
