import React, { useState, useEffect } from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'
import { FcEmptyTrash } from 'react-icons/fc'
import './Completed.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Completed = () => {

  const [completedTodos, setCompletedTodos] = useState([])
  const [remove, setRemove] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  useEffect(() => {

    setLoading(true)

    axios.get('/todo/completed')
    .then(
      (response) => {
        setCompletedTodos(response.data.payload)
        setLoading(false)
      }
    )
    .catch(err => console.log(`Error occured: ${err.message}`))
  }, [remove])

  const deleteTodo = (todo) => {
    
    const deleteTodoUrl = '/todo/delete-completed-todo/' + todo._id

    axios.delete(deleteTodoUrl)
    .then(
      () => {}
    )
    .catch(err => console.log(`Error occured: ${err.message}`))

    setRemove(!remove)
  }

  const toActive = () => {
    navigate('/active')
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
                (completedTodos === undefined) 
                ?
                (
                  <div className=' p-3'>
                    <div className='no-completetd-todos-text text-center'>There are no completed tasks yet!</div>
                    <button className='btn btn-primary d-block mx-auto m-3' onClick={toActive}>Go to active tasks</button>
                  </div>
                )
                :
                (
                  <>
                    <Card.Body className='p-1'>
                      <Card.Title className='text-center completed-card-head mb-3'>You achieved it</Card.Title>
                        <Row className='justify-content-center'>
                          {
                            completedTodos.map(todo => (
                              <Col xs={12} sm={6} md={4} key={todo.id} className="p-2">
                                <Card className='shadow p-2 mb-3 bg-body rounded'>
                                  <Card.Body className='p-3'>
                                    {todo.todo}
                                  </Card.Body>
                                  <div className='ms-auto gap-2 p-1'>
                                    <button className='d-block trash' onClick={() => deleteTodo(todo)}>
                                      <FcEmptyTrash />
                                    </button>
                                  </div>
                                </Card>
                              </Col>
                            ))
                          }
                        </Row>
                    </Card.Body>
                    <div className='d-flex align-items-center gap-1'>
                      <FcEmptyTrash className='trash'/>
                      <div>Delete</div>
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

export default Completed