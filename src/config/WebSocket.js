import { Client, Stomp } from '@stomp/stompjs';
import SockJS from "sockjs-client/dist/sockjs"

class WebSocketService {
  constructor() {
    this.url = 'http://159.89.49.13:8080/ws'; // Set your WebSocket URL
    //this.url = 'http://localhost:8080/ws'; // Set your WebSocket URL

    this.client = null;
    this.connected = false;
  }

  connect(newOrderCallback, claimResponseCallback, chatMessageCallback, appraisalCallback, appraisedProductCallback) {
    const userID = localStorage.getItem('userId');
    if (!userID) {
      console.log('User ID not found. WebSocket connection not initiated.');
      return;
    }

    const socket = new SockJS(this.url);
    this.client = Stomp.over(socket, {heartbeat: {
      outgoing: 20000, // 10 sec
      incoming: 20000, // 10 sec
    }});

    this.client.connect({}, () => {
      console.log('Connected to WebSocket');
      this.connected = true;

      // Existing subscriptions
      if (newOrderCallback) {
        this.subscribeToNewOrders(newOrderCallback);
      }

      if (claimResponseCallback) {
        this.subscribeToClaimResponses(claimResponseCallback, userID);
      }

      if (chatMessageCallback) {
        this.subscribeToChatMessages(chatMessageCallback);
      }

      // New subscription for unapprised products
      if (appraisalCallback) {
        this.subscribeToUnappraisedProducts(appraisalCallback);
      }

      // New subscription for appraised products
      if (appraisedProductCallback) {
        this.subscribeToAppraisedProducts(appraisedProductCallback);
      }
    }, (error) => {
      console.error('Error connecting to WebSocket:', error);
      // Implement reconnection logic here if needed
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
      this.connected = false;
    }
  }

  subscribeToNewOrders(callback) {
    if (!this.client || !this.connected) {
      console.log('Not connected. Retrying in 1 second...');
      setTimeout(() => this.subscribeToNewOrders(callback), 1000);
      return;
    }
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
    if (!this.client || !this.connected) {
      console.log('Not connected. Retrying in 1 second...');
      setTimeout(() => this.subscribeToClaimResponses(callback, userID), 1000);
      return;
    }
    this.client.subscribe(`/user/${userID}/queue/claim-responses`, (message) => {
      const response = JSON.parse(message.body);
      callback(response);
    });
  }

  subscribeToChatMessages(callback) {
    if (!this.client || !this.connected) {
      console.log('Not connected. Retrying in 1 second...');
      setTimeout(() => this.subscribeToChatMessages(callback), 1000);
      return;
    }
    this.client.subscribe('/topic/public', (message) => {
      const chatMessage = JSON.parse(message.body);
      console.log('New chat message received:', chatMessage);
      if (callback) callback(chatMessage);
    });
  }

  initializeProduct(productData) {
    if (!this.client || !this.connected) return;
    this.client.publish({
      destination: '/app/initialize-product',
      body: JSON.stringify(productData)
    });
  }

  subscribeToUnappraisedProducts(callback) {
    if (!this.client || !this.connected) {
      console.log('Not connected. Retrying in 1 second...');
      setTimeout(() => this.subscribeToUnappraisedProducts(callback), 1000);
      return;
    }
    this.client.subscribe('/topic/unappraisedProducts', (message) => {
      const products = JSON.parse(message.body);
      callback(products);
    });
  }

  subscribeToAppraisedProducts(callback) {
    if (!this.client || !this.connected) {
      console.log('Not connected. Retrying in 1 second...');
      setTimeout(() => this.subscribeToAppraisedProducts(callback), 1000);
      return;
    }
    this.client.subscribe('/topic/appraisedProducts', (message) => {
      const product = JSON.parse(message.body);
      callback(product);
    });
  }

  submitAppraisal(appraisedData) {
    if (!this.client || !this.connected) return;
    this.client.publish({
      destination: '/app/submit-appraisal',
      body: JSON.stringify(appraisedData)
    });
  }

  sendMessage(content) {
    const userID = localStorage.getItem('userId');
    const role = localStorage.getItem('role'); // Get role from localStorage
    if (!this.client || !this.connected || !userID || !role) return;
    this.client.publish({
      destination: '/app/chat.sendMessage',
      body: JSON.stringify({
        content: content,
        sender: userID,
        role: role,
        timestamp: new Date().toISOString()
      })
    });
  }
}

export default new WebSocketService();