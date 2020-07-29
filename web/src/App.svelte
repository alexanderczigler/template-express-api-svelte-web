<script>
  import { API } from './api.js'
  import { API_URL } from './api_url.js'
  import Cat from './Cat.svelte'
  import Add from './Add.svelte'

  let catsPromise = API.Cats.List()

  function reloadCats() {
    catsPromise = API.Cats.List()
  }
</script>

<style>
  main {
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    text-transform: uppercase;
    font-size: 3em;
    font-weight: 100;
  }

  h2 {
    text-transform: uppercase;
    font-size: 1.2em;
    font-weight: 100;
    margin-top: 42px;
  }

  p.info {
    font-size: 0.5em;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>sample web app</h1>
  <p>
    This is part of a
    <a
      href="https://github.com/alexanderczigler/template-express-api-svelte-web">
      sample project
    </a>
    featuring a Node Express API and a Svelte web app. The web app communicates
    with the
    <a href={API_URL}>API</a>
    when you list, add and delete cats below.
  </p>

  <h2>Add a new cat</h2>
  <Add on:reload={reloadCats} />

  <h2>List cats</h2>
  {#await catsPromise}
    <p>Loading...</p>
  {:then cats}
    <p class="info">Number of cats: {cats.length}</p>
    {#each cats as cat}
      <Cat {cat} on:reload={reloadCats} />
    {/each}
  {:catch error}
    <p style="color: red">Error: {error.message}</p>
  {/await}
</main>
