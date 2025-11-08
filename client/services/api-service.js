// API Base URL configuration for Render deployment
// For Render: Set window.__API_URL__ in index.html before loading scripts
// If not set, uses relative path (assumes API is on same domain)
// Example: <script>window.__API_URL__ = 'https://your-api.onrender.com';</script>
export const BASE_URL = window.__API_URL__ || "";
