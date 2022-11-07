import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)

  const selectRandom = () => {
    const rng = Math.floor(Math.random() * anecdotes.length)
    setSelected(rng)
  }

  const voteCurrent = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setVotes(updatedVotes)
  }

  let mostVoted = 0
  for (let i = 1; i < votes.length; ++i) {
    if (votes[i] > votes[mostVoted]) {
      mostVoted = i
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={voteCurrent}>vote</button>
      <button onClick={selectRandom}>next anecdote</button>

      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVoted]}</p>
      <p>has {votes[mostVoted]} votes</p>
    </div>
  )
}

export default App