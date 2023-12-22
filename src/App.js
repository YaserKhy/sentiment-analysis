import './App.css';
import Form from './Form.js'
import Result from './Result.js'
import React, { useState } from 'react'
import {Stack} from 'react-bootstrap'

export default function App() {
  const [text, setText] = useState('')                   // User Input
  const [analysis, setAnalysis] = useState(false)        // Analysis Trigger
  const [result, setResult] = useState('')               // Result Taken from API
  const [showResult, setShowResult] = useState(false)    // Show or Hide Result

  return (
    <Stack className='mt-4' gap={3}>
      <h1 className='mt-5 title text-center'>Sentiment Analysis</h1>
      <Form text={text} setText={setText} setAnalysis={setAnalysis}/>
      <Result text={text} analysis={analysis} setAnalysis={setAnalysis} result={result} setResult={setResult} showResult={showResult} setShowResult={setShowResult} />
    </Stack>
  )
}