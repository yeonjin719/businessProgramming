import re, time, ast, os, platform, subprocess
import google.generativeai as genai
from wcwidth import wcswidth
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import StaleElementReferenceException

# pip install -r requirements.txt 를 통해 쉽게 라이브러리를 설치할 수 있습니다.
# 파이썬 버전 3.12.7 버전 이상에서 개발 되었으므로, 해당 버전 이상에서 실행해주세요.


# 프롬프트를 불러오는 함수
def loadPrompt(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        return file.read()

# macOS에서 자동 창 전환 (Chrome이 가장 위에 뜨도록 하거나, vscode가 가장 위에 뜨게 함.)
def bringWindowToFront(app_name_substring: str):
    os_name = platform.system()

    if os_name == "Darwin":  # macOS
        try:
            subprocess.run(['osascript', '-e', f'tell application "{app_name_substring}" to activate'], check=True)
        except Exception as e:
            print(f"❌ macOS: 창 활성화 실패 - {e}")

# 자동으로 지메일을 이용하기 위해 로그인하는 함수
def login():
  driver.find_element(By.XPATH, '//*[@id="identifierId"]').send_keys(USER_EMAIL)
  driver.find_element(By.XPATH, '//*[@id="identifierNext"]/div/button').click()
  WebDriverWait(driver, 15).until(
    EC.visibility_of_element_located((By.NAME, "Passwd"))
)
  try:
    driver.find_element(By.XPATH,'//*[@id="password"]/div[1]/div/div[1]/input').send_keys(USER_PASSWORD)
    driver.find_element(By.XPATH,'//*[@id="passwordNext"]/div/button').click()
  
  except:
    try:
        current_url = driver.current_url
        id = re.search(r'pwd?TL=([^&]+)', current_url).group(1)
        time.sleep(2)
        driver.get(f'https://accounts.google.com/v3/signin/challenge/selection?TL={id}&checkConnection=youtube%3A264&checkedDomains=youtube&continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F1%2F&dsh=S-1862105550%3A1744683838397882&emr=1&flowEntry=ServiceLogin&flowName=GlifWebSignIn&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F1%2F&ifkv=AXH0vVsgjXN1T0wMyFbhzv0i4DFT4gXCmGb2_0oxLBhvVbFcgplbJWf1NgcWXkzGkCRjZND9OJmiHA&lid=1&osid=1&pstMsg=1&service=mail')
        element = WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.XPATH, '//*[@id="yDmH0d"]/c-wiz/div/div[2]/div/div/div/form/span/section[2]/div/div/section/div/div/div/ul/li[2]/div'))
        )
        driver.execute_script("arguments[0].click();", element)
        WebDriverWait(driver, 15).until(
          EC.visibility_of_element_located((By.NAME, "Passwd"))
        )
        driver.find_element(By.XPATH,'//*[@id="password"]/div[1]/div/div[1]/input').send_keys(USER_PASSWORD)
        driver.find_element(By.XPATH,'//*[@id="passwordNext"]/div/button').click()
    except Exception as e:
        print(f"❌ 추가 인증 또는 로그인 과정에서 오류가 발생했습니다: {e}")
        print("🛑 프로그램을 종료합니다. 이용해주셔서 감사합니다!")
        driver.quit()
        exit()

# 읽지 않은 메일 필터링하는 함수
def findUnread():
  try:
    driver.get('https://mail.google.com/mail/u/0/?pli=1#search/is%3Aunread')
    WebDriverWait(driver, 15).until(
        EC.visibility_of_element_located((By.CLASS_NAME, "Cp"))
    )
    target = driver.find_element(By.CLASS_NAME, 'bv9')
    table = target.find_element(By.CLASS_NAME, 'Cp')
    rows = table.find_elements(By.TAG_NAME , 'tr')
    return rows
  except:
    print('⚠️ 로그인 과정 중에 오류가 발생하였습니다. ⚠️')
    print('🔄 로그인을 다시 시도합니다. 🔄')
    driver.get('https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F1%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F1%2F&ifkv=AXH0vVsgjXN1T0wMyFbhzv0i4DFT4gXCmGb2_0oxLBhvVbFcgplbJWf1NgcWXkzGkCRjZND9OJmiHA&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-1862105550%3A1744683838397882#inbox')
    print('\n\n🔐 이중 보안이 설정된 계정에서는 패스키 인증으로 인해 자동화가 실패할 수 있습니다.\n👉 반드시 이중 인증을 해제한 후 프로그램을 실행해주세요.\n')
    login()
    time.sleep(5)

# 읽지 않은 메일의 메일 아이디를 가져오는 함수
def getEmailsId():
  url = driver.current_url  # 현재 URL 가져옴
  # 메일 ID 추출
  match = re.search(r'#search/is%3Aunread/([^/]+)$', url)
  if match:
      message_id = match.group(1)
  return message_id

# AI를 활용하여 이메일을 요약하는 함수
def analysisWithAI(id, title, name, email, content, index):
  input_str= f"{index}: ['{id}', '{title}', '{name}', '{email}', '{content}']"
  try:
      response = ratingAndSummaryPrompt.send_message(input_str)
  except Exception as e:
      print("⚠️ Gemini API 이용 제한 초과, 🔄 60초 후 재시도 🔄")
      time.sleep(60)
      response = ratingAndSummaryPrompt.send_message(input_str)
  key, value_str = response.text.split(":", 1)
  value = ast.literal_eval(value_str.strip())
  return key.strip(), value

# 읽지 않은 메일을 가져오는 함수
def getEmails():
    emails = {}
    index = 0

    while True:
        try:
            WebDriverWait(driver, 20).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".Cp tr"))
            )
            rows = driver.find_elements(By.CSS_SELECTOR, ".Cp tr")
            if index >= len(rows):
                break
            row = rows[index]

            title_element = row.find_element(By.CLASS_NAME, 'xS')
            driver.execute_script("arguments[0].click();", title_element)

            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'hP'))
            )
            title = driver.find_element(By.CLASS_NAME, 'hP').text   # 이메일 제목 가져오기
            content = driver.find_element(By.CLASS_NAME, 'gs').text # 이메일 내용 가져오기
            span = driver.find_element(By.CLASS_NAME, 'gD')
            email = span.get_attribute('email')                     # 이메일 주소 가져오기
            name = span.get_attribute('name')                       # 이메일 이름 가져오기
            id = getEmailsId()                                      # 이메일 ID 가져오기

            emails[index] = [id, title, email, name, content]

            key, value = analysisWithAI(id, title, name, email, content, index + 1)
            data[key] = value

            elements = driver.find_elements(By.CSS_SELECTOR, 'div.G-Ni.J-J5-Ji')
            if len(elements) >= 3: 
                unreadBtn = elements[2].find_element(By.CSS_SELECTOR, '.T-I.J-J5-Ji.bvt.T-I-ax7.T-I-Js-IF.mA')
                ActionChains(driver).move_to_element(unreadBtn).click().perform()

            driver.get('https://mail.google.com/mail/u/0/?pli=1#search/is%3Aunread') # 읽지 않은 메일 필터링
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, "Cp"))
            )

            index += 1  

        except StaleElementReferenceException:
            print(f"❗ {index+1}번째 메일의 요소가 만료되어 재시도합니다.")
            driver.get('https://mail.google.com/mail/u/0/?pli=1#search/is%3Aunread')
            continue

        except Exception as e:
            print(f"❌ {index+1}번째 메일 처리 중 오류: {e}")
            driver.get('https://mail.google.com/mail/u/0/?pli=1#search/is%3Aunread')
            index += 1
            continue

    return emails

# AI가 작성한 답변에서 문장만 추출하는 함수
def splitSentence(text):
  raw_split = text.split("'")

  # 실제 문장만 추출 (빈 문자, 쉼표 제외)
  response_list = [s.strip() for s in raw_split if s.strip() and s.strip() != ',']

  # 결과 확인
  for i, r in enumerate(response_list, 1):
      print(f"[{i}] {r}\n")
  return response_list

# AI로 답장 초안을 작성하는 함수
def replyAnswerGenerate(emails):
    bringWindowToFront("Visual Studio Code")

    while True:
        index = input(
            "\n📩 AI 답장을 작성하고 싶은 메일의 번호를 입력해주세요.\n"
            "   - 숫자가 아닌 문자를 입력하면 프로그램이 종료됩니다.\n"
            "입력: "
        )
        print('\n')
        if not index.isdigit():
            print('🛑 프로그램을 종료합니다. 이용해주셔서 감사합니다!')
            return -1, -1
        
        index_int = int(index) - 1
        
        try:
            selectedEmail = emails[index_int]

            while True:
                isAffirmation = input(
                    f"\n📌 {index}번 메일에 대해 어떤 성격의 답장을 생성하시겠습니까?\n"
                    "   - 긍정적인 답변: 긍정\n"
                    "   - 부정적인 답변: 부정\n"
                    "   - 메일 번호를 다시 고르려면: 0\n"
                    "입력: "
                )
                
                if isAffirmation == '0':
                    print('메일 번호를 다시 골라주세요.')
                    break
                
                if isAffirmation not in ['긍정', '부정']:
                    print('❗ 반드시 긍정 혹은 부정으로만 입력해주세요.')
                else:
                    print(f"🤖 {index}번 메일에 대해 '{isAffirmation}'적인 AI 답변을 생성 중입니다... 잠시만 기다려주세요.\n")
                    selectedEmail_with_label = selectedEmail.copy()
                    selectedEmail_with_label.append(isAffirmation)
                    break

            if len(selectedEmail_with_label) != 6:
                continue

            try:
                response = replyPrompt.send_message(selectedEmail_with_label)
            except Exception as e:
                print("❌ 제한 초과, 60초 후 재시도")
                time.sleep(60)
                response = replyPrompt.send_message(selectedEmail_with_label)

            response_list = splitSentence(response.text)

            while True:
                targetIndex = input(
                    "\n💬 아래 중 마음에 드는 답변의 번호를 입력해주세요.\n"
                    "   - 번호 1~3 중 선택 → 해당 내용으로 메일 초안 작성\n"
                    "   - 0 입력 → 다시 메일 선택 단계로 이동\n"
                    "입력: "
                )
                
                if not targetIndex.isdigit():
                    print('❗ 정확한 번호를 입력해주세요')
                    continue

                targetIndex = int(targetIndex)

                if targetIndex == 0:
                    break
                elif 1 <= targetIndex <= len(response_list):
                    print(f'💬 {targetIndex}번 답변으로 메일 초안을 작성합니다.')
                    return index_int, response_list[targetIndex - 1]
                else:
                    print('❗ 정확한 번호를 입력해주세요')

        except (IndexError, KeyError):
            print('❌ 입력하신 번호에 해당하는 메일이 없습니다. 다시 입력해주세요.')

# AI가 작성한 메일 초안을 자동으로 메일 답장 기능에 채워주는 함수
def moveToPrepareToSendEmail(id, content):
    url = f'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox/{id}'
    driver.get(url)

    try:
        body = WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'div[aria-label="메일 본문"][contenteditable="true"]'))
        )
        print("⚠️ 이미 초안이 작성되어 있습니다.\n🔄 기존 내용을 초기화하고 새로운 답변을 작성합니다.")

        body.click()
        body.clear()  
        body.send_keys(content)

    except:
        WebDriverWait(driver, 15).until(
            EC.element_to_be_clickable((By.CLASS_NAME, "bkH"))
        )
        button = driver.find_element(By.CLASS_NAME, 'bkH')
        driver.execute_script("arguments[0].click();", button)

        body = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 'div[aria-label="메일 본문"][contenteditable="true"]'))
        )
        body.click()
        body.send_keys(content)

    print('📬 메일 초안 작성을 완료하였습니다. 크롬 창을 확인해주세요.')
    bringWindowToFront("Chrome")



# 구글 드라이브 옵션 설정
options = Options()
options.add_argument("--incognito") # 시크릿 모드로 실행
options.add_argument('--disable-blink-features=AutomationControlled') # 자동화 감지 방지
options.add_experimental_option('detach', True) # 브라우저가 닫히지 않도록 설정
options.add_experimental_option('excludeSwitches', ['enable-logging']) # 불필요한 로그 제거
options.add_argument("window-position=0,0") # 창 위치 설정
options.add_argument("window-size=1280,800") # 창 크기 설정
load_dotenv()

# 프롬프트 로드
rating_prompt = loadPrompt('term_project/ratingPrompt.txt')
reply_prompt = loadPrompt('term_project/replyPrompt.txt')

ratingAndSummaryPrompt = genai.GenerativeModel('gemini-1.5-flash-latest').start_chat(history=[
    {"role": "user", "parts": [rating_prompt]}
])

replyPrompt = genai.GenerativeModel('gemini-1.5-flash-latest').start_chat(history=[
    {"role": "user", "parts": [reply_prompt]}
])

# .env 파일에서 이메일, 비밀번호, API key 로드
USER_EMAIL = os.getenv('GMAIL_EMAIL')
USER_PASSWORD = os.getenv('GMAIL_PASSWORD')
API_KEY = os.getenv('API_KEY')

# 예외처리
if (USER_EMAIL == None):
  print("❌ 이메일이 설정되지 않았습니다. 환경 변수 GMAIL_EMAIL를 설정하세요.")
  exit()

if (USER_PASSWORD == None):
  print("❌ 비밀번호가 설정되지 않았습니다. 환경 변수 GMAIL_PASSWORD를 설정하세요.")
  exit()
  

if (API_KEY == None):
  print("❌ Google API 키가 설정되지 않았습니다. 환경 변수 GOOGLE_API_KEY를 설정하세요.")
  exit()
    

genai.configure(api_key=API_KEY)

driver = webdriver.Chrome(options=options)
driver.get('https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F1%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F1%2F&ifkv=AXH0vVsgjXN1T0wMyFbhzv0i4DFT4gXCmGb2_0oxLBhvVbFcgplbJWf1NgcWXkzGkCRjZND9OJmiHA&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-1862105550%3A1744683838397882#inbox')

data = {}
os_name = platform.system()

# macOS만 자동 창 전환 지원
if os_name != 'Darwin':
  print(f'❗ 이 운영체제는 자동 창 전환이 지원되지 않습니다: {os_name}')
  

print('\n\n🔐 이중 보안이 설정된 계정에서는 패스키 인증으로 인해 자동화가 실패할 수 있습니다.\n👉 반드시 이중 보안을 해제한 후 프로그램을 실행해주세요.\n')
login()
time.sleep(5)

rows = findUnread()

if (len(rows) != 0):
  emails = getEmails()
  sortedData = dict(sorted(data.items(), key=lambda x: int(x[1][1]), reverse=True))
  print('📬 분석된 메일 요약 목록 (중요도 순):\n')
  for k, v in sortedData.items():
    score = int(v[1])
    summary = v[2]
    star = '⭐'
    bar = star * score
    padding = 10 * 2 - wcswidth(bar)  # 1개의 ⭐는 너비 2로 측정됨
    bar = bar + ' ' * padding
    print(f"{bar}  [{k}] {summary}\n")
  if (os_name != 'Darwin'):
    driver.execute_script("alert('메일 요약 분석이 완료되었습니다! 반드시 확인버튼을 누르고 vscode를 확인해주세요!');")
  bringWindowToFront("Visual Studio Code")
  
  while True:
    quit = input('종료 를 입력하면 프로그램이 종료됩니다 그 외 아무키나 누르면 AI를 이용한 답변을 생성해드립니다: ')
    if quit == '종료':
      print('🛑 프로그램을 종료합니다. 이용해주셔서 감사합니다!')
      driver.quit()
      break
    else:
      index, answer = replyAnswerGenerate(emails)
      if (answer != -1 and index != -1):
        moveToPrepareToSendEmail(sortedData[str(index+1)][0], answer)
      else:
        print('🛑 답변을 생성하지 않고 프로그램을 종료합니다. 이용해주셔서 감사합니다!')
        driver.quit()
        break
      
else:
  print('🛑새로운 메일이 없습니다. \n 프로그램을 종료합니다. 이용해주셔서 감사합니다!')
  driver.quit()
  exit()
