<script>
  export let cat
  import { API } from './api.js'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  const deleteCat = async id => {
    try {
      await API.Cats.Delete(id)
    } catch (error) {
      console.error(error)
      alert(
        'Oh no! Could not delete this cat. See the conosle for more details.'
      )
    }

    dispatch('reload', {})
  }
</script>

<style>
  div {
    display: inline-block;
    margin: 16px 0 0 32px;
    border-width: 1px;
    border-radius: 4px;
    border-color: #d0d0d0;
    border-style: solid;
    padding: 8px;
    width: 400px;
    vertical-align: top;
  }

  span.highlight {
    font-weight: 300;
    color: #9a1750;
  }

  h3 {
    margin-bottom: 2px;
    margin-top: 0;
    font-size: 0.8em;
    font-weight: 400;
    text-transform: uppercase;
  }

  p {
    margin-top: 0px;
    font-size: 0.9em;
    font-weight: 200;
  }

  p.info {
    font-size: 0.5em;
    margin-bottom: 20px;
  }

  span.delete {
    margin-top: 32px;
    display: block;
  }

  button {
    font-size: 0.7em;
  }
</style>

<div>
  <h3>{cat.name}</h3>
  <p class="info">
    <span class="highlight">ID:</span>
    {cat.id}
  </p>
  <p>
    {cat.name} is a
    <span class="highlight">{cat.breed}</span>
    with
    <span class="highlight">{cat.eyeColor}</span>
    colored eyes.
  </p>
  <span class="delete">
    <button on:click={() => deleteCat(cat.id)}>Delete</button>
  </span>
</div>
