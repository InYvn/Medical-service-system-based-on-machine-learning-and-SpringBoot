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
from sklearn.ensemble import BaggingClassifier
from sklearn.tree import DecisionTreeClassifier



train = pd.read_csv("./Training.csv", encoding='gb18030')
test = pd.read_csv("./Testing.csv", encoding='gb18030')
print(train.head())

plt.rc("font",family='YouYuan')
disease_counts=train["prognosis"].value_counts()
plt.figure(figsize = (20,5))
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

print("RADtraining accuracy is:", accuracy_score(train_y, tr_predictions))
print("RADtesting accuracy is:", accuracy_score(val_y, predictions))


bag_classifier = BaggingClassifier(base_estimator=DecisionTreeClassifier(),n_estimators=100, random_state=40)
bag_classifier.fit(train_X, train_y)
tr_predictions = bag_classifier.predict(train_X)
predictions = bag_classifier.predict(val_X)
print("BAGtraining accuracy is:", accuracy_score(train_y, tr_predictions))
print("BAGtesting accuracy is:", accuracy_score(val_y, predictions))
