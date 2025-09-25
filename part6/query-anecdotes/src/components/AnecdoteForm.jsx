import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests/requests"


const AnecdoteForm = () => {
   const queryClient = useQueryClient()
 const newAnecdoteMutation = useMutation({ 
  mutationFn: createAnecdote,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  }
})

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if(content.length < 5) {
      return
    }
    console.log('new anecdote')
    newAnecdoteMutation.mutate({content, votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
