import React, { useState, useEffect } from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'
import { FcOk, FcEmptyTrash } from 'react-icons/fc'
import axios from 'axios'
import './Active.css'
import { useNavigate } from 'react-router-dom'

const Active = () => {

  const [activeTodos, setActiveTodos] = useState([])
  const [remove, setRemove] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {

    setLoading(true)

    axios.get('/todo/active')
    .then(
      (response) => {
        setActiveTodos(response.data.payload)
        setLoading(false)
      }
    )
    .catch(err => console.log(`Error Occured: ${err.message}`))
  }, [remove, completed])

  const completedTodo = (todo) => {

    const todoData = {todo: todo.todo}

    axios.post('/todo/create-completed-todo', todoData)
    .then(
      () => {
        navigate('/completed')
      }
    )
    .catch(err => console.log(`Error Occured: ${err.message}`))

    setCompleted(!completed)

    deleteTodo(todo)

  }

  const deleteTodo = (todo) => {

    const deleteTodoUrl = '/todo/delete-active-todo/' + todo._id

    axios.delete(deleteTodoUrl)
    .then(
      (response) => {
        console.log(response)
      }
    )
    .catch(err => console.log(`Error occured: ${err.message}`))

    setRemove(!remove)
  }

  const toHome = () => {
    navigate('/')
  }

  return (
    <Container fluid>
      {
        loading 
        ?
        (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary mt-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )
        :
        (
          <Card className='todo-card mx-auto border border-dark mt-5 mb-5 p-3 shadow-lg bg-body rounded'>
              {
                (activeTodos === undefined) 
                ? 
                (
                  <div className='p-3'>
                    <div className='no-active-todos-text text-center'>There are no active tasks. Keep up the good work!</div>
                    <button className='btn btn-primary d-block mx-auto m-3' onClick={toHome}>Add some tasks</button>
                  </div>
                )
                :
                (
                  <>
                    <Card.Body className='p-1'>
                      <Card.Title className='text-center active-card-head mb-3'>Let's go</Card.Title>
                      <Row className='justify-content-center'>
                        {
                          activeTodos.map(todo => (
                            <Col xs={12} sm={6} md={4} key={todo.id} className="p-2">
                              <Card className='shadow p-2 mb-2 bg-body rounded'>
                                <Card.Body className='p-3'>
                                  {todo.todo}
                                </Card.Body>
                                <div className='d-flex ms-auto gap-2 p-1'>
                                  <button className='d-block complete-trash' onClick={() => completedTodo(todo)}>
                                    <FcOk />
                                  </button>
                                  <button className='d-block complete-trash' onClick={() => deleteTodo(todo)}>
                                    <FcEmptyTrash />
                                  </button>
                                </div>
                              </Card>
                            </Col>
                          ))
                        }
                      </Row>
                    </Card.Body>
                    <div className="d-flex gap-3">
                      <div className='d-flex align-items-center gap-1'>
                        <FcOk className="complete-trash" />
                        <div>Mark as completed</div>
                      </div>
                      <div className='d-flex align-items-center gap-1'>
                        <FcEmptyTrash className="complete-trash" />
                        <div>Delete</div>
                      </div>
                    </div>
                  </>
                )
              }
          </Card> 
        )
      }
    </Container>
  )
}

export default Active