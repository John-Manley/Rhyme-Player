<script lang="ts">
  import { currentSong } from "../store";
</script>

<main>
  {#if $currentSong}
    <div class="songInfo">
      <img src={$currentSong["imgSrc"]} alt="" />
      <div class="songTitles">
        <h1>{$currentSong["title"]}</h1>
        <p>{$currentSong["artist"]}</p>
      </div>
    </div>
  {/if}
</main>

<style lang="scss">
  .songInfo {
    display: flex;
    gap: 10px;
  }

  h1,
  p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    max-width: 200px;
  }
  .songTitles {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  main {
    height: 105px;
    width: 100%;
    padding: 10px;
    display: flex;
    img {
      min-width: 70px;
      object-fit: cover;
      min-height: 70px;
      width: 70px;
      height: 70px;
      border-radius: 7px;
    }
    h1 {
      font-size: 1em;
    }
  }
</style>
