# 该文件使用selenium和BeautifulSoup爬取京东自营药品列表页数据（获取名称、价格、sku）
# medicine.py文件通过sku进入商品详情页获取药品数据（药品通用名、保质期等）

import time
from bs4 import BeautifulSoup
from pandas.core.frame import DataFrame
from selenium import webdriver  # selenium 驱动
from selenium.webdriver.common.keys import Keys


# 通过网页url获取网页
def getHTMLText(url, times, driver):
    # 打开浏览器
    driver.get(url)
    # 如果是第一次打开则休眠20s 首次打开页面需要登录京东，之后循环是不需要再登录。休眠2s用于加载页面
    if times == 0:
        time.sleep(20)
    else:
        time.sleep(2)
    # 京东页面是动态加载的，这里模拟滚动条下拉操作，使商品加载完全
    for i in range(10):
        driver.execute_script(f'document.documentElement.scrollTop={(i + 1) * 1000}')
        time.sleep(1)
    pageSource = driver.page_source
    # 返回整个网页
    return pageSource


# 获取当前网页的三个信息
def fillUnivList(price_set, name_set, product_ID_set, html):
    soup = BeautifulSoup(html, "html.parser")
    # 获取页面上的所有价格
    prices = soup.find_all('div', class_='p-price')
    names = soup.find_all('div', class_='p-name p-name-type-2')
    product_IDs = soup.find_all('li', class_='gl-item')
    min_length = min(len(prices), len(names), len(product_IDs))
    for i in range(min_length):
        price_div = prices[i]
        price_text = price_div.text.strip()  # 去除价格文本两侧的空白字符
        name_div = names[i]
        name_em = name_div.find('em')
        product_ID_li = product_IDs[i]
        product_ID = product_ID_li.get('data-sku') if product_ID_li.has_attr('data-sku') else None
        # 检查价格是否为空或者只包含货币符号
        if price_text.replace('￥', '').replace('¥', '') == '':
            continue  # 如果是空价格，则跳过当前循环
        # 价格不为空的加入集合中
        price_set.append(price_text)
        name = name_em.text
        name_set.append(name)
        product_ID_set.append(product_ID)
    return ""


# 获取商品的价格，名称和编号
price_set = []
name_set = []
product_ID_set = []
start_url = "https://search.jd.com/Search?keyword=药自营&"
driver = webdriver.Chrome()
print(start_url)
# 循环拼接url控制加载第几页
# for i in range(70):
for i in range(1):

    url = start_url + "page=" + str(2 * i + 1)
    html = getHTMLText(url, i, driver)
    print(html)
    fillUnivList(price_set, name_set, product_ID_set, html)

data = {"价格（￥）": price_set, "名称": name_set, "sku": product_ID_set}
print(data)
data = DataFrame(DataFrame.from_dict(data, orient='index').values.T, columns=list(data.keys()))
data = data.dropna(subset=["名称"])
# 将数据存入“爬取关键词：药结果1000.csv”
data.to_csv('爬取关键词：药结果1000.csv')
driver.close()
