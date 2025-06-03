from bs4 import BeautifulSoup
import re

with open('Starbucks_Korea.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
result_box = soup.find('ul', class_='quickSearchResultBoxSidoGugun')
li_list = result_box.find_all('li') if result_box else []

with open('Jeju_Starbucks.csv', 'w', encoding='utf-8', newline='') as f:
    f.write("No.,Name,Address\n")  

    for idx, li in enumerate(li_list, 1):
        p_tag = li.find('p', class_='result_details')
        name = li['data-name']
        if p_tag:
            text = p_tag.get_text(strip=True)
            clean_text = re.sub(r'\s+', ' ', text).split('1522')[0]
            line = f'{idx},{name},"{clean_text}"\n'
            f.write(line)
