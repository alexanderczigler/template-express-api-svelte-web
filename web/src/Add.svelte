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
    margin: 0 0 10px 0;
    background-color: #ee4c7c;
    color: #e3e2df;
    padding-left: 32px;
  }

  div.field {
    display: inline-block;
    padding: 0;
    margin-top: 0;
    margin-left: 8px;
  }

  div > p {
    margin-top: 0;
    font-weight: 100;
    text-transform: uppercase;
    font-size: 0.8em;
  }

  h2 {
    text-transform: uppercase;
    font-size: 1.2em;
    font-weight: 100;
    margin: 1em;
    color: #e3e2df;
    padding: 32px 0 0 0;
    margin-left: 8px;
  }
</style>

<div>
  <h2>Add a new cat</h2>
  <div class="field">
    <p>
      Breed
      <br />
      <input type="text" bind:value={newCat.breed} />
    </p>
  </div>

  <div class="field">
    <p>
      Eye color
      <br />
      <input type="text" bind:value={newCat.eyeColor} />
    </p>
  </div>

  <div class="field">
    <p>
      Name
      <br />
      <input type="text" bind:value={newCat.name} />
    </p>
  </div>

  <div class="field">
    <p>
      <button on:click={addCat}>Add</button>
    </p>
  </div>
</div>
