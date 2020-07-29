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
    margin-right: 24px;
    border-width: 1px;
    border-radius: 4px;
    border-color: #d0d0d0;
    border-style: solid;
    padding: 8px;
  }

  span.highlight {
    font-weight: 300;
    color: #9a1750;
  }

  h3 {
    margin-bottom: 10px;
    margin-top: 0;
    font-size: 1em;
  }

  p {
    margin-top: 0px;
  }
</style>

<div>
  <h3>{cat.name}</h3>
  <p>
    <span class="highlight">Breed:</span>
    {cat.breed}
    <br />
    <span class="highlight">Eye Color:</span>
    {cat.eyeColor}
    <br />
    <span class="highlight">ID:</span>
    {cat.id}
    <br />
    <br />
    <button on:click={() => deleteCat(cat.id)}>Delete</button>
  </p>
</div>
