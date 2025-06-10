from bs4 import BeautifulSoup
import re
import csv

with open('./assignment/Starbucks Korea.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
result_box = soup.find('ul', class_='quickSearchResultBoxSidoGugun')
li_list = result_box.find_all('li') if result_box else []

def findType(i_text):
  if (i_text == 'generalDT'):
    return 'DT'
  elif (i_text == 'reserve'):
    return 'R'
  else:
    return '일반'


with open('Seoul_Starbucks.csv', 'w', encoding='utf-8', newline='') as f:
    f.write("No.,Name,Type,Address\n")  

    for idx, li in enumerate(li_list, 1):
        i = str(li.find('i', class_=re.compile('^pin_'))).split('pin_')[1]
        i_text = i.split('"')[0]
        i_type = findType(i_text)
        p_tag = li.find('p', class_='result_details')
        name = li['data-name']
        if p_tag:
            text = p_tag.get_text(strip=True)
            clean_text = re.sub(r'\s+', ' ', text).split('1522')[0]
            
            line = f'{idx},{name},{i_type},"{clean_text}"\n'
            f.write(line)


district_counts = {}

with open('Seoul_Starbucks.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        address = row['Address']
        store_type = row['Type']
        gu_match = re.search(r'서울특별시\s+(\S+구)', address)
        if not gu_match:
            continue  
        district = gu_match.group(1)

        if district not in district_counts:
            district_counts[district] = {'일반': 0, 'DT': 0, 'R': 0}

        if store_type in district_counts[district]:
            district_counts[district][store_type] += 1
        else:
            district_counts[district][store_type] = 1 

print("[구별 스타벅스 매장 수 - 타입별]")
for district in sorted(district_counts.keys()):
    counts = district_counts[district]
    print(f"{district}: 일반 {counts['일반']}, DT {counts['DT']}, R {counts['R']}")