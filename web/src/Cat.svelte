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

    // TODO: Emit event.
    dispatch('reload', {})
  }
</script>

<style>
  span {
    width: 500px;
    background-color: #ff6600;
  }

  i {
    color: #909090;
  }

  h3 {
    margin-bottom: 10px;
  }

  p {
    margin-top: 0px;
  }
</style>

<span>
  <h3>{cat.name}</h3>
  <p>
    <i>Breed:</i>
    {cat.breed}
    <br />
    <i>Eye Color:</i>
    {cat.eyeColor}
    <br />
    <i>ID:</i>
    {cat.id}
    <br />
    <br />
    <button on:click={() => deleteCat(cat.id)}>Delete</button>
  </p>
</span>
