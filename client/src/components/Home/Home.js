import React from 'react'
import './Home.css'
import { Container, Card } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const {register, handleSubmit, formState: {errors}} = useForm()
  const navigate = useNavigate()

  const onFormSubmit = (todoData) => {
    axios.post('/todo/create-active-todo', todoData)
    .then(
      () => {
        navigate('/active')
      }
    )
    .catch(err => console.log(`Error occured: ${err.message}`))
  }

  return (
    <Container fluid>
      <Card className='todo-card mx-auto shadow-lg bg-body rounded mt-5 mb-5 p-3 border border-dark'>
        <Card.Body className='p-1'>
          <Card.Title className='text-center mb-3'>What u wanna do?</Card.Title>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <input type="text" id="todo" className='form-control input-height' placeholder='Enter here...' autoComplete='off' {...register('todo', {required: true})} />
            {errors.todo?.type==="required" && <p className='text-danger'>*Enter your task before adding</p>}
            <button className='btn btn-primary d-block mx-auto m-3' type='submit'>Add task</button>
          </form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Home