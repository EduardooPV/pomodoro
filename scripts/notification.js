const NOTIFICATION_TITLE = "Title";
const NOTIFICATION_BODY =
  "Notification from the Renderer process. Click to log to console.";


function showNotification() {
  new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY, icon: './assets/notification.png'});
}
