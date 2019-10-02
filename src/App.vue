<template>
  <div id="app">
    <Header />
    <Main />
  </div>
</template>

<script>
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
export default {
  name: "app",
  components: {
    Header,
    Main
  }
};
</script>

<style>
@font-face {
  font-family: "BeVietnam";
  src: url("./assets/fonts/BeVietnam-Light.ttf");
}

*{
  font-family: "BeVietnam";
  font-size: 16px;
}
</style>
