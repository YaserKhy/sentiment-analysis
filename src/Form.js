import { useState } from 'react'
import { Col, Form, Button, Modal } from 'react-bootstrap'

export default function TheForm({ text, setText, setAnalysis }) {

    const [validated, setValidated] = useState(false)
    const [err, setErr] = useState(false)

    const handleCloseErr = () => setErr(false)
    const performAnalysis = (event) => setAnalysis(true)
    const handleChange = (event) => setText(event.target.value)

    const handleSubmit = (event) => {
        const theform = event.currentTarget;
        if (theform.checkValidity() === false) {
            event.preventDefault(); // prevent reload when submit
            event.stopPropagation();
            setErr(true);
        }
        else {
            event.preventDefault(); // prevent reload when submit
            setValidated(true)
            performAnalysis();
        }
    }

    return (
        <>
            <Form className='mt-4 text-center' noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Type something to start the sentiment analysis</Form.Label>
                    <Col xs={9} md={5} lg={4} className='m-auto'>
                        <Form.Control required type='text' placeholder='How do you feel ?' value={text} onChange={handleChange}></Form.Control>
                    </Col>
                </Form.Group>
                <Button variant='primary fs-6 mt-3' type='submit'>ANALYSIS</Button>
            </Form>
            <Modal style={{borderRadius:'5rem',justifyContent:'center'}} show={err} onHide={handleCloseErr} centered>
                <Modal.Header className='justify-content-center border-0'><Modal.Title>Oops !</Modal.Title></Modal.Header>
                <Modal.Body className='text-center'>Too shy to share your feelings ? <br/> Come on, give it a try.</Modal.Body>
                <Modal.Footer className='justify-content-center border-0'>
                    <Button variant='primary' onClick={handleCloseErr}>Got it</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}