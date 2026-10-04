# Store Front

The Store Front is the Vue.js client for browsing products and placing orders. Lab 2 ran it on its own Azure VM. Lab 3 builds it against the Product and Order Service Azure App Service endpoints.

## Lab 3 deployment

The GitHub Actions workflow at `.github/workflows/azure-static-web-apps.yml` declares these build-time values:

```text
VUE_APP_ORDER_SERVICE_URL=https://chuk8915order.azurewebsites.net
VUE_APP_PRODUCT_SERVICE_URL=https://chuk8915product.azurewebsites.net
```

The workflow runs `npm ci` and `npm run build`, then retains the `dist` artifact. If `AZURE_STATIC_WEB_APPS_API_TOKEN` is configured, it deploys that artifact to Azure Static Web Apps. The token is a GitHub secret; it is not committed to source.

Azure for Students currently limits this subscription to regions that do not support Static Web Apps. A compatible App Service backup is deployed at `https://chuk8915storefront.azurewebsites.net/`, using `server.js` to serve the same compiled Vue files on the existing Free F1 plan. This is an explicit deviation from the assignment's Static Web Apps requirement, not a claim that a Static Web App was created. The exact deployment requires a supported subscription or an instructor-approved exception.

The backup uses `node /home/site/wwwroot/server.js` as its startup command. Product loading and an order through the App Service backend into RabbitMQ have been verified in the browser.

## Lab 2 local and VM setup

## Configuration

Create a local .env file in the repository root before starting the development server:

VUE_APP_ORDER_SERVICE_URL=http://ORDER_SERVICE_VM_PUBLIC_IP:3000
VUE_APP_PRODUCT_SERVICE_URL=http://PRODUCT_SERVICE_VM_PUBLIC_IP:3030

Replace the placeholder host names above with the public IPs recorded in Azure. Keep .env out of Git; .env.example contains placeholders only. Vue CLI embeds VUE_APP_ values when the development server starts, so restart npm run serve after changing them. Do not put RabbitMQ credentials in the Store Front; these URLs are visible to the browser.

## Install and run

On the Store Front VM, install Node.js 24 LTS and npm. From this repository root, run npm ci and npm run serve. The service listens on port 8080. Its NSG should allow TCP 8080 only from the laptop public IP. Keep vue.config.js and the public directory from the Lab 1 starting point.

## Verify

Open http://STORE_FRONT_VM_PUBLIC_IP:8080 in the laptop browser, substituting the actual public IP. Confirm that products load, select Dog Food, enter quantity 2, and verify the $39.98 total. Click Place Order, then check RabbitMQ's durable order_queue message count on the RabbitMQ VM. Check the browser console for API or WebSocket errors.
