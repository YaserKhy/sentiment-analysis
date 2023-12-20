import axios from 'axios'
import React, { useEffect } from 'react'
import { MDBContainer } from "mdbreact";
import { HorizontalBar } from "react-chartjs-2";

export default function Result({ text, analysis, setAnalysis, result, setResult, showResult, setShowResult }) {
    useEffect(() => {
        if (analysis) {
            axios.post('http://127.0.0.1:5000/', text, {
                headers: { 'Content-Type': 'text/plain', },
            })
                .then((response) => {
                    setResult(response.data);
                    setShowResult(true);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error('Error during analysis:', error);
                });
            setAnalysis(false);
        }
    }, [analysis])

    const ordered = ['Positive','Neutral','Negative']

    const data = {
        labels: ["Positive","Neutral","Negative",],
        datasets: [
            {
                label: `Sentiment (Percentage)`,
                data: [result[ordered[0]], result[ordered[1]], result[ordered[2]]],
                fill: true,
                backgroundColor: "#7251b5",
                borderColor: "#02b844",
            },
        ]
    };

    return (
        showResult && (
            <div className='result'>
                <MDBContainer>
                    <HorizontalBar data={data} />
                </MDBContainer>
            </div>
        )
    );
}