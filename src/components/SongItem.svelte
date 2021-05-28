<script lang="ts">
  import { songViewInfo } from "../store";
  import { push } from "svelte-spa-router";
  export let artist: string;
  export let title: string;
  export let imgSrc: string;
  export let file: string;
</script>

<main
  on:click={() => {
    push("/song-view");
    songViewInfo.set({
      artist,
      title,
      imgSrc,
      file,
    });
  }}
>
  <img src={imgSrc ? imgSrc : "icon.svg"} alt="" />
  <div class="song-info">
    <h4>{title}</h4>
    <p>{artist}</p>
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 10px;
    cursor: pointer;
  }
  img {
    width: 120px;
    height: 120px;
    object-fit: cover;

    border-radius: 10px;
  }
  h4,
  p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    max-width: 120px;
  }
</style>
