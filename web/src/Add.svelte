<script>
  import { API } from './api.js'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
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

    dispatch('reload', {})
    copyCopyCat()
  }

  const copyCopyCat = () => {
    newCat = JSON.parse(JSON.stringify(copyCat))
  }

  copyCopyCat()
</script>

<style>
  div {
    display: inline-block;
    margin-top: 0;
  }

  div > p {
    margin-top: 0;
    font-weight: 300;
    color: #9a1750;
  }
</style>

<div>
  <p>
    Breed:
    <br />
    <input type="text" bind:value={newCat.breed} />
  </p>
</div>

<div>
  <p>
    Eye color:
    <br />
    <input type="text" bind:value={newCat.eyeColor} />
  </p>
</div>

<div>
  <p>
    Name:
    <br />
    <input type="text" bind:value={newCat.name} />
  </p>
</div>

<div>
  <p>
    <button on:click={addCat}>Add</button>
  </p>
</div>
