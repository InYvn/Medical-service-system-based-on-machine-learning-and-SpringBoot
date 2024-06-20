import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from flask import Flask, request, jsonify
import json
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.ensemble import RandomForestRegressor

df = pd.read_csv("./Heart_health.csv")
print(df.head())
df = df.set_index('ID')
print(df.isnull().sum())

plt.rcParams['font.sans-serif'] = ['SimHei']  # 设置字体为SimHei显示中文
plt.rcParams['axes.unicode_minus'] = False  # 设置正常显示符号
sns.countplot(x='Gender', hue='Smoker', data=df)

plt.title('不同性别吸烟者')
plt.xlabel('性别')
plt.ylabel('计数')

# plt.show()


sns.countplot(x='Gender', hue='Exercise(hours/week)', data=df)

plt.title('不同性别每周运动多少小时')
plt.xlabel('性别')
plt.ylabel('计数')

# plt.show()

sns.countplot(x='Gender', hue='Heart Attack', data=df)

plt.title('不同性别患有心脏疾病的人数')
plt.xlabel('性别')
plt.ylabel('计数')

# plt.show()

heart_attack_df = df[df['Heart Attack'] == 1]

sns.histplot(data=heart_attack_df, x='Age', bins=10)

plt.title('不同年龄患有心脏疾病的人数')
plt.xlabel('性别')
plt.ylabel('计数')
# plt.show()


df['Gender'] = df['Gender'].map({'Male': 1, 'Female': 0})
df['Smoker'] = df['Smoker'].map({'Yes': 1, 'No': 0})

X = df.drop(['Heart Attack', 'Name', 'Blood Pressure(mmHg)'], axis=1)
y = df['Heart Attack']
print(X.head())

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

model = RandomForestRegressor()
model.fit(X_train_scaled, y_train)

model = RandomForestRegressor()
model.fit(X_train_scaled, y_train)
print(model.score(X_test_scaled, y_test))


# 预测心脏病 输入年龄、性别、身高、体重、胆固醇指标、葡萄糖指标、吸烟、运动时间 输出结果为是否为心脏病患者
def predict(symptoms_list):
    # 使用json.loads()函数将字符串转换为字典
    params = json.loads(symptoms_list)
    age = params['age']
    gender = params['sex']
    height = params['height']
    weight = params['weight']
    cholesterol = params['cholesterol']
    glucose = params['glucose']
    smoker = params['smoke']
    exercise = params['exercise']
    input_data = np.array([[age, gender, height, weight, cholesterol, glucose, smoker, exercise]])
    input_data_scaled = scaler.transform(input_data)
    prediction = model.predict(input_data_scaled)
    result = ""
    if prediction[0] == 1:
        result = "可能患有心脏疾病 建议医院复查"
    else:
        result = "未患有心脏疾病"
    print(result)
    return result




app = Flask(__name__)


@app.route('/heartpredict', methods=['GET'])
def wechat_api():
    # 从 GET 请求中获取参数
    symptom = request.args.get('symptom')

    print(symptom)

    # 调用预测函数
    prediction = predict(symptom)

    # 返回一个 JSON 响应给微信小程序前端
    response = {
        'status': 'success',
        'message': '处理成功',
        'data': prediction
    }
    return jsonify(response)


if __name__ == '__main__':
    app.run(port=5000, debug=True)
