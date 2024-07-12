import { Client, Stomp } from '@stomp/stompjs';
import SockJS from "sockjs-client/dist/sockjs"

class WebSocketService {
  constructor() {
    this.url = 'http://174.138.72.129:8080/ws'; // Set your WebSocket URL
    this.client = null;
  }

  connect(newOrderCallback, claimResponseCallback) {
    const userID = localStorage.getItem('userId'); // Get userID from localStorage
    if (!userID) {
      console.log('User ID not found. WebSocket connection not initiated.');
      return;
    }

    const socket = new SockJS(this.url);
    this.client = Stomp.over(socket);

    this.client.connect({}, () => {
      console.log('Connected to WebSocket');
      this.subscribeToNewOrders(newOrderCallback);
      this.subscribeToClaimResponses(claimResponseCallback, userID);
    });
  }

  claimOrder(orderId) {
    const userID = localStorage.getItem('userID');
    if (!this.client || !userID) return;
    this.client.publish({
      destination: '/app/claim',
      body: JSON.stringify({ orderId, userId: userID })
    });
  }

  releaseOrder(orderId) {
    const userID = localStorage.getItem('userID');
    if (!this.client || !userID) return;
    this.client.publish({
      destination: '/app/release',
      body: JSON.stringify({ orderId, userId: userID })
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
    this.client.subscribe('/topic/new-order', this.debounce((message) => {
      const orderId = JSON.parse(message.body);
      console.log('New order received:', orderId);
      if (callback) callback(orderId);
    }, 500)); // Adjust debounce delay as needed
  }
  debounce(func, delay) {
    let debounceTimer;
    return function(...args) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
  }
  subscribeToClaimResponses(callback, userID) {
    if (!this.client) return;
    this.client.subscribe(`/user/${userID}/queue/claim-responses`, (message) => {
      const response = JSON.parse(message.body);
      callback(response);
    });
  }
}

export default new WebSocketService();
