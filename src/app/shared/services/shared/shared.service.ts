import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Message } from '../../interfaces/shared.interface';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private messageService: MessageService) {}
  show(message: Message) {
    this.messageService.add(message);
  }
  
}
