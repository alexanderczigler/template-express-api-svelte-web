<script>
  import { API } from './api.js'
  import Cat from './Cat.svelte'

  let catsPromise = API.Cats.List()
  let newCat = {}
  const copyCat = { breed: '', eyeColor: '', name: '' }

  const addCat = async () => {
    try {
      await API.Cats.Add(newCat)
    } catch (error) {
      console.error(error)
      alert(
        'Oh no! Something went wrong when adding the cat, check the console for more details.'
      )
    }

    reloadCats()
    copyCopyCat()
  }

  const copyCopyCat = () => {
    newCat = JSON.parse(JSON.stringify(copyCat))
  }

  function reloadCats() {
    catsPromise = API.Cats.List()
  }

  // TODO: Move the "add cat" function into its own thing.
  copyCopyCat()
</script>

<style>
  main {
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #cc6600;
    text-transform: uppercase;
    font-size: 3em;
    font-weight: 100;
  }

  h2 {
    color: #cc6600;
    text-transform: uppercase;
    font-size: 1.5em;
    font-weight: 600;
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
    featuring a Node Express API and a Svelte web app. The cats in the below are
    fetched from the restful API.
  </p>

  <h2>Add a cat</h2>
  <span>
    Breed:
    <br />
    <input type="text" bind:value={newCat.breed} />
    <br />
    Eye color:
    <br />
    <input type="text" bind:value={newCat.eyeColor} />
    <br />
    Name:
    <br />
    <input type="text" bind:value={newCat.name} />
    <br />
    <button on:click={addCat}>Add</button>
  </span>

  <h2>Cats</h2>
  {#await catsPromise then cats}
    {#each cats as cat}
      <Cat {cat} on:reload={reloadCats} />
    {/each}
  {/await}

</main>
