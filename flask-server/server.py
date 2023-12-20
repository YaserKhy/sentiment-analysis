from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

import requests

API_URL = "https://api-inference.huggingface.co/models/cardiffnlp/twitter-xlm-roberta-base-sentiment"
headers = {"Authorization": "Bearer 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"}

@app.route("/",methods=['POST'])
def query():
	textToAnalyze = request.data.decode('utf-8')
	response = requests.post(API_URL, headers=headers, data=textToAnalyze)
	result = {}
	res = response.json() # convert response to python object
	#print(res) # dict inside list inside list
	for i in range(3):
		label = res[0][i]['label'] # extract the label
		score = round(res[0][i]['score'] * 100,1) # mult by 100 & show only 1 num after floating point
		result[label] = score
	print(result)
	return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)