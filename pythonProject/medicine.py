import requests
import time
import json
import csv
from bs4 import BeautifulSoup
import pandas as pd


# 读取CSV文件
df = pd.read_csv('爬取关键词：药结果1000.csv', encoding='utf8')
# 由于京东的反爬机制，每爬取一段时间，打开商品详情页会自动跳转京东首页导致报错 程序中断
# 出现这种情况，需要等待一段时间再启动程序。
# start控制下次启动程序从哪一项开始爬取，控制台找到最近打印的一个数据项，打开“爬取关键词：药结果1000”表查找这一项的序号
# 该序号+1为start的值，恢复到中断前的位置
start = 2183
# 读取文件的三个属性值
prices = df['价格（￥）']
names = df['名称']
skus = df['sku']
for i in range(start, len(prices)):
    sku = skus[i]
    url = "https://item.yiyaojd.com/" + str(sku) + ".html"
    # 这里设置成自己的请求头
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0"
    }
    response = requests.get(url, headers=headers)
    time.sleep(5)
    html = response.text
    # print(html)
    soup = BeautifulSoup(html, "html.parser")
    all_items = soup.findAll("dl", attrs={"class": "clearfix"})
    drug_info = {}
    # 遍历每个dl标签，并提取dt和dd的内容
    for dl in all_items:
        dt_tag = dl.find('dt')
        dd_tag = dl.find('dd')
        if dt_tag and dd_tag:
            drug_info[dt_tag.get_text()] = dd_tag.get_text()

    name = soup.find("div", attrs={"class": "sku-name"})

    name = name.get_text().replace(" ", "").replace("\n", "")

    drug_info['商品名'] = name
    generic_name = drug_info.get('药品通用名', '未知')
    trade_name = drug_info.get('商品名', '未知')
    validity = drug_info.get('有效期', '未知')
    drug_classification = drug_info.get('药品分类', '未知')
    dosage_form = drug_info.get('剂型', '未知')
    storage_condition = drug_info.get('储存条件', '未知')
    use_dose = drug_info.get('使用剂量', '未知')
    indications = drug_info.get('适用症/功能主治', '未知')
    adverse_reaction = drug_info.get('不良反应', '未知')
    medicine_children = drug_info.get('儿童用药', '未知')
    medicine_geriatric = drug_info.get('老年用药', '未知')
    taboo = drug_info.get('禁忌', '未知')
    approval_certificate = drug_info.get('批准文号', '未知')
    new_row = {
        '价格（￥）': prices[i],
        '名称': names[i],
        'sku': skus[i],
        '药品通用名': generic_name,
        '有效期': validity,
        '药品分类': drug_classification,
        '剂型': dosage_form,
        '储存条件': storage_condition,
        '使用剂量': use_dose,
        '适用症/功能主治': indications,
        '不良反应': adverse_reaction,
        '儿童用药': medicine_children,
        '老年用药': medicine_geriatric,
        '禁忌': taboo,
        '批准文号': approval_certificate
    }

    fieldnames = ['价格（￥）', '名称', 'sku', '药品通用名', '有效期', '药品分类', '剂型', '储存条件', '使用剂量', '适用症/功能主治',
                         '不良反应', '儿童用药', '老年用药', '禁忌', '批准文号']
    # a模式 追加写
    with open('medicines_data.csv', 'a', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        # 如果文件是空的（即没有列标题），则写入列标题
        if csvfile.tell() == 0:
            writer.writeheader()

        # 写入数据 medicines_data.csv文件为最终爬取的完整药品文件 处理数据原文件先复制一份
        writer.writerow(new_row)
        print(new_row)