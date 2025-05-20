import datetime

post_date = datetime.datetime.now().date()

class Post(object):
  def __init__(self, title, writer):
    self.title = title
    self.postNumber = len(board.posts) + 1
    self.writer = writer
    self.date = post_date
  def __str__(self) -> str:
    return f"[No.{self.postNumber:>3}] 제목: {self.title:<20} | 작성자: {self.writer:<10} | 날짜: {self.date}"


class Board(object):
  def __init__(self):
    self.posts = []
  def add_post(self, post):
    self.posts.append(post)
  def remove_all_post(self):
    self.posts = []
  def show_posts(self):
    print('\n')
    if len(self.posts) == 0:
      print('게시물이 없습니다.\n')
      return
    for post in self.posts:
      print(post)
    print('\n')
  def remove_post_by_number(self, number):
    for post in self.posts:
      if post.postNumber == number:
        self.posts.remove(post)
        print('\n게시물이 삭제되었습니다.\n')
        break
  def edit_post(self, number):
    for post in self.posts:
      if post.postNumber == number:
        title = input('수정할 제목을 입력하세요:')
        writer = input('수정할 작성자를 입력하세요:')
        post.title = title
        post.writer = writer
        break

def whatToDo(work):
  if work == '1':
    title = input('제목을 입력하세요:')
    writer = input('작성자를 입력하세요:')
    post = Post(title, writer)
    board.add_post(post)
    print('\n게시물이 추가되었습니다.\n')
    board.show_posts()
  elif work == '2':
    number = int(input('삭제할 게시물 번호를 입력하세요:'))
    board.remove_post_by_number(number)
  elif work == '3':
    board.show_posts()
  elif work == '4':
    number = int(input('수정할 게시물 번호를 입력하세요:'))
    board.edit_post(number)
  elif work == '5':
    print('게시물 전체 삭제')
    board.remove_all_post()
  else:
    print('잘못된 입력입니다.')

if __name__ == "__main__":
  board = Board()
  post1 = Post("Title1", "Writer1")
  board.add_post(post1)
  post2 = Post("Title2", "Writer2")
  board.add_post(post2)
  
  while True:
    print('1. 게시물 추가, 2. 게시물 삭제, 3. 게시물 보기, 4. 게시물 수정, 5. 게시물 전체 삭제 6. 종료')
    work = input('원하는 작업을 선택하세요:')
    if work == '6':
      print('프로그램을 종료합니다.')
      break
    else:
      whatToDo(work)