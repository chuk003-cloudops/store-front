# Store Front

The Store Front is the Vue.js client for browsing products and placing orders. In Lab 2 it runs on its own Azure VM; the browser on your laptop calls the Product and Order Service VMs using their public IPs.

## Configuration

Create a local .env file in the repository root before starting the development server:

VUE_APP_ORDER_SERVICE_URL=http://ORDER_SERVICE_VM_PUBLIC_IP:3000
VUE_APP_PRODUCT_SERVICE_URL=http://PRODUCT_SERVICE_VM_PUBLIC_IP:3030

Replace the placeholder host names above with the public IPs recorded in Azure. Keep .env out of Git; .env.example contains placeholders only. Vue CLI embeds VUE_APP_ values when the development server starts, so restart npm run serve after changing them. Do not put RabbitMQ credentials in the Store Front; these URLs are visible to the browser.

## Install and run

On the Store Front VM, install Node.js 24 LTS and npm. From this repository root, run npm ci and npm run serve. The service listens on port 8080. Its NSG should allow TCP 8080 only from the laptop public IP. Keep vue.config.js and the public directory from the Lab 1 starting point.

## Verify

Open http://STORE_FRONT_VM_PUBLIC_IP:8080 in the laptop browser, substituting the actual public IP. Confirm that products load, select Dog Food, enter quantity 2, and verify the $39.98 total. Click Place Order, then check RabbitMQ's durable order_queue message count on the RabbitMQ VM. Check the browser console for API or WebSocket errors.
