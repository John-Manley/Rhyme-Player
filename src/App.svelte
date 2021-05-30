<script lang="ts">
  import Router from "svelte-spa-router";
  import SideBar from "./components/SideBar.svelte";
  // Create Routes
  import MyMusic from "./views/MyMusic.svelte";
  import Explore from "./views/Explore.svelte";
  import Settings from "./views/Settings.svelte";
  import SongView from "./views/SongView.svelte";
  import BottomBar from "./components/BottomBar.svelte";
  const routes = {
    "/": MyMusic,
    "/explore": Explore,
    "/settings": Settings,
    "/song-view": SongView,
  };
  console.clear();
</script>

<main>
  <SideBar />
  <div class="left-bar">
    <Router {routes} />
    <BottomBar />
  </div>
</main>

<style lang="scss">
  main {
    width: 100vw;
    background-color: white;
    height: 100vh;
    display: flex;
  }
  .left-bar {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
