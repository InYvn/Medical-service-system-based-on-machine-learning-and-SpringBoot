from flask import Flask, request, jsonify
from HeartPredict import predict
from Predict import predict_disease

app = Flask(__name__)

@app.route('/predict', methods=['GET'])
def predict_api():
    symptom = request.args.get('symptom')
    symptoms_list = symptom.split(',')
    prediction = predict_disease(symptoms_list)
    response = {
        'status': 'success',
        'message': '处理成功',
        'data': prediction
    }
    return jsonify(response)

@app.route('/heartpredict', methods=['GET'])
def heartpredict_api():
    symptom = request.args.get('symptom')
    prediction = predict(symptom)
    response = {
        'status': 'success',
        'message': '处理成功',
        'data': prediction
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(port=5000, debug=True)