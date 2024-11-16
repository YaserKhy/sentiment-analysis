import React, { useEffect } from 'react'
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from "react-chartjs-2";

export default function Result({ text, analysis, setAnalysis, result, setResult, showResult, setShowResult }) {

    async function query(data) {
        const BASEURL = 'https://api-inference.huggingface.co/models/cardiffnlp/twitter-xlm-roberta-base-sentiment'
        const paramdict = {
            headers: { Authorization: `Bearer ${process.env.REACT_APP_APIKEY}` },
            method: "POST",
            body: data,
        }
        const response = await fetch(BASEURL, paramdict);
        const result = await response.json();
        let res = result[0]
        let dict = {}
        for (let i = 0; i < res.length; i++) {
            let thelabel = res[i]['label'];
            let thescore = Math.round(res[i]['score'] * 1000) / 10;
            dict[thelabel] = thescore
        }
        setAnalysis(false)
        setResult(dict)
        setShowResult(true)
        return dict;
    }

    // with every render of this component
    useEffect(() => {
        if (analysis) {
            query(text).then((response) => {
                console.log(JSON.stringify(response));
            });
        }
    })

    const ordered = ['positive', 'neutral', 'negative']

    const data = {
        labels: ["Positive", "Neutral", "Negative",],
        datasets: [
            {
                label: `Sentiment (Percentage)`,
                data: [result[ordered[0]], result[ordered[1]], result[ordered[2]], 0, 100],
                fill: true,
                backgroundColor: "#7251b5",
                borderColor: "#02b844",
            },
        ]
    };

    const options = {
        indexAxis: 'y',
        responsive:true,
    };

    return showResult && (
        <div className='result m-auto'>
            <Bar data={data} options={options} />
        </div>
    );
}