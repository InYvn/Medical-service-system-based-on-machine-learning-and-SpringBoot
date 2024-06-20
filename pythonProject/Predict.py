import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import requests
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score
from flask import Flask, request, jsonify



train = pd.read_csv("./Training.csv", encoding='gb18030')
test = pd.read_csv("./Testing.csv", encoding='gb18030')
print(train.head())

plt.rc("font",family='YouYuan')
disease_counts=train["prognosis"].value_counts()
plt.figure(figsize = (25,5))
plt.xticks(rotation=90)
sns.barplot(x=disease_counts.index,y=disease_counts.values)
# plt.show()

encoder = LabelEncoder()
train["prognosis"] = encoder.fit_transform(train["prognosis"])

y = train[["prognosis"]]

X = train.drop(["prognosis"],axis=1)

Y = test.drop(["prognosis"],axis=1)

train_X, val_X, train_y, val_y = train_test_split(X, y, test_size=0.2, random_state=40)

model = RandomForestClassifier(n_estimators=100, random_state=40)
train_y = train_y.values.ravel()
model.fit(train_X, train_y)

tr_predictions = model.predict(train_X)
predictions = model.predict(val_X)


# 创建一个新的LabelEncoder来对症状进行编码
symptom_encoder = LabelEncoder()

# 获取训练数据中所有的症状列
symptoms = train.drop(["prognosis"], axis=1).columns

# 使用fit方法来训练编码器
symptom_encoder.fit(symptoms)

def predict_disease(symptoms):
    # 使用新的编码器将输入的症状转换为数字
    symptoms_encoded = symptom_encoder.transform(symptoms)

    # 创建一个全零的数组来表示所有的症状
    symptoms_input = np.zeros(len(symptom_encoder.classes_))

    # 将输入的症状的位置设为1
    symptoms_input[symptoms_encoded] = 1

    # 将数组转换为DataFrame，并使用symptom_encoder.classes_作为列名
    symptoms_input_df = pd.DataFrame([symptoms_input], columns=symptom_encoder.classes_)

    # 重新排序列以匹配训练数据的列顺序
    symptoms_input_df = symptoms_input_df.reindex(columns=train_X.columns)

    # 使用模型进行预测
    return encoder.inverse_transform(model.predict(symptoms_input_df))[0]



app = Flask(__name__)


@app.route('/predict', methods=['GET'])
def wechat_api():
    # 从 GET 请求中获取参数
    symptom = request.args.get('symptom')

    # 对 symptom 进行处理，比如分割成症状列表
    symptoms_list = symptom.split(',')

    # 调用预测函数
    prediction = predict_disease(symptoms_list)

    # 返回一个 JSON 响应给微信小程序前端
    response = {
        'status': 'success',
        'message': '处理成功',
        'data': prediction
    }
    return jsonify(response)




if __name__ == '__main__':
    app.run(port=5000, debug=True)

if __name__ == "__main__":
    # 处理前端get请求
    response = requests.get("http://localhost:9090/predict/symptoms")
    symptoms = response.json()

    # 使用获取的症状列表进行预测
    print(predict_disease(symptoms))
    # symptoms = ["vomiting", "fatigue", "anxiety", "headache", "palpitations"]
    # print(predict_disease(symptoms))
