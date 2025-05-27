import urllib.request
import re
import csv

class Stock:
    def __init__(self, stockName, stockCode, price, previousPrice, openingPrice, highPrice, upperLimitPrice, lowPrice, lowerLimitPrice, quantity):
        self.name = stockName
        self.code = stockCode
        self.price = price
        self.previousPrice = previousPrice
        self.openingPrice = openingPrice
        self.highPrice = highPrice
        self.upperLimitPrice = upperLimitPrice
        self.lowPrice = lowPrice
        self.lowerLimitPrice = lowerLimitPrice
        self.quantity = quantity

    def to_list(self):
        return [self.name, self.code, self.price, self.previousPrice, self.openingPrice,
                self.highPrice, self.upperLimitPrice, self.lowPrice, self.lowerLimitPrice, self.quantity]

input_file = 'stock.csv'
output_file = 'stock_info.csv'
base_url = 'https://finance.naver.com/item/main.naver?code='

stock_list = []

with open(input_file, 'r', encoding='utf-8-sig') as file:
    reader = csv.reader(file)
    header = next(reader)  

    for row in reader:
        stockName, stockCode = row[0], row[1]
        try:
            html = urllib.request.urlopen(base_url + stockCode)
            html_contents = str(html.read().decode("cp949"))

            results = re.findall(r"(\<dl class=\"blind\"\>)([\s\S]+?)(\<\/dl\>)", html_contents)
            stock_index = results[0][1]  
            index_list = re.findall(r"(\<dd\>)([\s\S]+?)(\<\/dd\>)", stock_index)

            values = [str(index_list[i][1].split(' ')[1]) for i in range(3, 11)]
            price, previousPrice, openingPrice, highPrice, upperLimitPrice, lowPrice, lowerLimitPrice, quantity = values

            stock = Stock(stockName, stockCode, price, previousPrice, openingPrice,
                          highPrice, upperLimitPrice, lowPrice, lowerLimitPrice, quantity)
            stock_list.append(stock)

        except Exception as e:
            print(f"[오류] {stockName}({stockCode}) 처리 중 오류 발생: {e}")

for stock in stock_list:
  print(f"종목명: {stock.name}, 종목코드: {stock.code}, 현재가: {stock.price}, 전일가: {stock.previousPrice}, "
      f"시가: {stock.openingPrice}, 고가: {stock.highPrice}, 상한가: {stock.upperLimitPrice}, "
      f"저가: {stock.lowPrice}, 하한가: {stock.lowerLimitPrice}, 거래량: {stock.quantity}")


with open(output_file, 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow(header)
    for stock in stock_list:
        writer.writerow(stock.to_list())

print(f"\n✅ 총 {len(stock_list)}개 종목 정보가 '{output_file}'에 저장되었습니다.")