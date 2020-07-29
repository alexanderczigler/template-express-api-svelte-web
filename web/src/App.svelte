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
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    text-transform: uppercase;
    font-size: 3em;
    font-weight: 100;
  }

  p {
    font-size: 0.9em;
    font-weight: 200;
    margin: 32px 0 0 33px;
  }

  p.info {
    font-size: 0.5em;
  }

  hr {
    border-top: 1px solid #d0d0d0;
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

  <Add on:reload={reloadCats} />

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

  <hr />
</main>
