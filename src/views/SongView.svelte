<script lang="ts">
  import { songViewInfo } from "../store";
</script>

<main>
  <div class="song-info">
    <img src={$songViewInfo["imgSrc"]} alt="" />
    <div class="info">
      <h2>{$songViewInfo["title"]}</h2>
      <p>{$songViewInfo["artist"]}</p>
    </div>
  </div>
</main>

<style>
  main {
    padding: 20px;
  }
  img {
    min-width: 200px;
    min-height: 200px;
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
  }

  .song-info {
    display: flex;
    gap: 30px;
    align-items: center;
  }
  h2 {
    font-size: 1.4em;
    font-weight: 500;
  }
  p {
    font-size: 1.2em;
  }
  h2,
  p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
  }
</style>
