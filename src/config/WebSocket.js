import { Client, Stomp } from '@stomp/stompjs';
import SockJS from "sockjs-client/dist/sockjs"

class WebSocketService {
  constructor() {
    this.url = 'http://174.138.72.129:8080/ws'; // Set your WebSocket URL
    this.client = null;
  }

  connect(newOrderCallback, claimedOrderCallback) {
    // Check if the user has ROLE_STAFF
    const userRoles = localStorage.getItem('role') || '[]';
    if (!userRoles.includes('ROLE_STAFF')) {
      console.log('User does not have ROLE_STAFF. WebSocket connection not initiated.');
      return;
    }

    // Create a SockJS instance
    const socket = new SockJS(this.url);

    // Initialize the Stomp client
    this.client = Stomp.over(socket);

    this.client.connect({}, () => {
      console.log('Connected to WebSocket');
      this.subscribeToNewOrders(newOrderCallback);
      this.subscribeToClaimedOrders(claimedOrderCallback);
    });
  }

  disconnect() {
    if (this.client) {
      this.client.disconnect();
      this.client = null;
    }
  }

  subscribeToNewOrders(callback) {
    if (!this.client) return;
    this.client.subscribe('/topic/new-order', message => {
      const orderId = JSON.parse(message["body"]);
      if (callback) callback(orderId);
    });
  }

  subscribeToClaimedOrders(callback) {
    if (!this.client) return;
    this.client.subscribe('/topic/order-claimed', message => {

      const orderId = JSON.parse(message["body"]);
      if (callback) callback(orderId);
    });
  }
}

export default new WebSocketService();
