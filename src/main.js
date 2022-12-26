import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "http://billowing-breeze-5166.fly.dev";

createApp(App).use(router).mount("#app");
