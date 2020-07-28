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

<p>
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
</p>
