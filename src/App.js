import './App.css';
import Form from './Form.js'
import Result from './Result.js'
import React, { useState } from 'react'

export default function App() {
  const [text, setText] = useState('')                   // User Input
  const [analysis, setAnalysis] = useState(false)        // Analysis Trigger
  const [result, setResult] = useState('')               // Result Taken from API
  const [showResult, setShowResult] = useState(false)   // Show or Hide Result
  return (
    <div className='container text-center' id='main'>
      <div className='row justify-content-center'>
        <div className='col-auto text-center'>
          <h1 className='title fw-medium'>Sentiment Analysis</h1>
        </div>
      </div>
      <div className='row justify-content-center'>
        <div className='col-auto'>
          <Form text={text} setText={setText} setAnalysis={setAnalysis} />
        </div>
      </div>
      <div className='row justify-content-center'>
        <div className='col-auto'>
          <Result text={text} analysis={analysis} setAnalysis={setAnalysis} result={result} setResult={setResult} showResult={showResult} setShowResult={setShowResult} />
        </div>
      </div>
    </div>
  )
}