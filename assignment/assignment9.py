import datetime
file_path = 'assignment/postings.csv'
post_date = datetime.datetime.now().date()

with open(file_path, 'r', encoding='utf-8-sig') as file:
  content = file.read()
  
class Post(object):
  def __init__(self, title, writer, board, content, date=post_date):
    self.title = title
    self.writer = writer
    self.date = date
    self.postNumber = len(board.posts) + 1
    self.content = content

  def __str__(self) -> str:
    return f"[No.{self.postNumber:>3}] 제목: {self.title:<20} | 작성자: {self.writer:<10} | 날짜: {self.date}"


class Board(object):
  def __init__(self):
    self.posts = []
  def add_post(self, post):
    self.posts.append(post)
    print('\n게시물이 추가되었습니다.\n')
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
  def move_post(self, number, board):
    for post in self.posts:
      if post.postNumber == number:
        board.add_post(post)
        print(f'게시물 "{post.title}"이(가) "{board}" 보드로 이동되었습니다.')
        self.posts.remove(post)
        break

class BoardManager:
    def __init__(self):
        self.boards = {}
        self.current_board = None

    def create_board(self, name):
        if name in self.boards:
            print("이미 존재하는 보드입니다.")
        else:
            self.boards[name] = Board()
            print(f"'{name}' 보드가 생성되었습니다.")

    def delete_board(self, name):
        board = self.boards.get(name)
        if board:
            if board.posts:
                print("게시물이 존재하는 보드는 삭제할 수 없습니다.")
            else:
                del self.boards[name]
                print(f"보드 '{name}'(이)가 삭제되었습니다")
        else:
            print("해당하는 보드가 없습니다")

    def delete_all_board(self):
        if not self.boards:
            print("삭제할 보드가 없습니다.")
        else:
            for name, board in list(self.boards.items()):
              if board.posts:
                print(f"보드 내에 게시물이 존재하여 보드 '{name}'(을)를 지울 수 없습니다.")
                return
            self.boards.clear()
            print("모든 보드가 삭제되었습니다.")
    
    def select_board(self, name):
      if name in self.boards:
          self.current_board = self.boards[name]
      else:
          self.current_board = None  # 잘못된 입력이면 초기화!
          print("해당하는 보드가 없습니다")

    def list_boards(self):
        for i, (name, board) in enumerate(self.boards.items(), 1):
            print(f"{i}. {name} - Posts: {len(board.posts)}")
            


def whatToDoPost(work):
  if work == '1':
    if len(manager.current_board.posts) >= 10:
      print('\n게시물은 최대 10개까지만 추가할 수 있습니다.\n')
      return
    title = input('제목을 입력하세요:')
    writer = input('작성자를 입력하세요:')
    content = input('게시물 내용을 입력하세요:')
    date = post_date
    post = Post(title, writer, manager.current_board, content, date)
    
    manager.current_board.add_post(post)
    
    manager.current_board.show_posts()
  elif work == '2':
    manager.current_board.show_posts()
    number = int(input('삭제할 게시물 번호를 입력하세요:'))
    manager.current_board.remove_post_by_number(number)
  elif work == '3':
    manager.current_board.show_posts()
  elif work == '4':
    manager.current_board.show_posts()
    number = int(input('수정할 게시물 번호를 입력하세요:'))
    manager.current_board.edit_post(number)
  elif work == '5':
    manager.current_board.show_posts()
    number = int(input('이동할 게시물 번호를 입력하세요:'))
    if not manager.boards:
      print('이동할 게시판이 없습니다.')
      return
    print('이동할 게시판 목록:')
    manager.list_boards()
    name = input('게시판 이름을 입력하세요:')
    if name in manager.boards:
      target_board = manager.boards[name]
      manager.current_board.move_post(number, target_board)
    else:
      print('해당하는 게시판이 없습니다.')
  elif work == '6':
    print('게시물 전체 삭제')
    manager.current_board.remove_all_post()
  else:
    print('잘못된 입력입니다.')

def whatToDoBoard(work):
  if work == '1':
    name = input('게시판 이름을 입력하세요:')
    manager.create_board(name)
  elif work == '2':
    manager.list_boards()
    name = input('삭제할 게시판 이름을 입력하세요:')
    manager.delete_board(name)
  elif work == '3':
    print('게시판 전체 삭제를 시도합니다.')
    manager.delete_all_board()
  elif work == '4':
    if not manager.boards:
      print('선택할 수 있는 게시판이 없습니다.')
      return
    print('존재하는 게시판 목록')
    manager.list_boards()
    
    try:
      name = (input('게시판 이름을 입력하세요:'))
    except ValueError:
      print('잘못된 입력입니다.')
      return
    manager.select_board(name)
    if manager.current_board:
      print(f"게시판 '{name}' 선택됨.")
      print('게시판에서 작업을 선택하세요.')
      
      while True:
        print('1. 게시물 추가, 2. 게시물 삭제, 3. 게시물 보기, 4. 게시물 수정, 5. 게시물 다른 게시판으로 옮기기 6. 게시물 삭제 7. 게시판 다시 선택하기')
        work = input('원하는 작업을 선택하세요:')
        if work == '7':
          print('게시판 선택으로 돌아갑니다')
          break
        else:
          whatToDoPost(work)
    else:
      print('해당하는 게시판이 없습니다.')
  else:
    print('잘못된 입력입니다.')

if __name__ == "__main__":
  manager = BoardManager()
  
  for i, line in enumerate(content.splitlines()):
    if i==0:
      info = line.split(',')
    else:
      boardName = line.split(',')[0]
      if boardName not in manager.boards:
        manager.create_board(boardName)
      manager.select_board(boardName)
      manager.current_board.add_post(Post(line.split(',')[1], line.split(',')[2], manager.current_board,line.split(',')[4],  line.split(',')[3]))

  
  while True: 
    print('게시판 관리 프로그램입니다.')
    print('1. 게시판 추가, 2. 게시판 삭제, 3. 게시판 전체 삭제, 4. 게시판 선택, 5. 종료')
    work = input('원하는 작업을 선택하세요:')
    if work == '5':
      print('프로그램을 종료합니다.')
      with open('assignment/postings_rev.csv', 'w', encoding='utf-8-sig') as file:
        file.write(f'{",".join(info)}\n')
        for board_name, board in manager.boards.items():
          for post in board.posts:
            file.write(f'{board_name},{post.title},{post.writer},{post.date},{post.content}\n')
      break
    else:
      whatToDoBoard(work)

