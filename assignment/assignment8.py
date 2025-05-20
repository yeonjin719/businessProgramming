import datetime

post_date = datetime.datetime.now().date()

class Post(object):
  def __init__(self, title, writer, board):
    self.title = title
    self.writer = writer
    self.date = post_date
    self.postNumber = len(board.posts) + 1

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

class BoardManager:
    def __init__(self):
        self.boards = {}
        self.current_board = None

    def create_board(self, name):
        if name in self.boards:
            print("Board already exists.")
        else:
            self.boards[name] = Board()
            print(f"Board '{name}' created.")

    def delete_board(self, name):
        board = self.boards.get(name)
        if board:
            if board.posts:
                print("Cannot delete board with posts.")
            else:
                del self.boards[name]
                print(f"Board '{name}' deleted.")
        else:
            print("Board not found.")

    def delete_all_board(self):
        if not self.boards:
            print("No boards to delete.")
        else:
            for name, board in list(self.boards.items()):
              if board.posts:
                print(f"Cannot delete board '{name}' with posts.")
                return
            self.boards.clear()
            print("All boards deleted.")
    
    def select_board(self, index):
        if 1 <= index <= len(self.boards):
            name = list(self.boards.keys())[index - 1]
            self.current_board = self.boards[name]
            print(f"Board '{name}' selected.")
        else:
            print("Board not found.")

    def list_boards(self):
        for i, (name, board) in enumerate(self.boards.items(), 1):
            print(f"{i}. {name} - Posts: {len(board.posts)}")


def whatToDo(work):
  if work == '1':
    title = input('제목을 입력하세요:')
    writer = input('작성자를 입력하세요:')
    post = Post(title, writer, manager.current_board)
    manager.current_board.add_post(post)
    print('\n게시물이 추가되었습니다.\n')
    manager.current_board.show_posts()
  elif work == '2':
    number = int(input('삭제할 게시물 번호를 입력하세요:'))
    manager.current_board.remove_post_by_number(number)
  elif work == '3':
    manager.current_board.show_posts()
  elif work == '4':
    number = int(input('수정할 게시물 번호를 입력하세요:'))
    manager.current_board.edit_post(number)
  elif work == '5':
    print('게시물 전체 삭제')
    manager.current_board.remove_all_post()
  else:
    print('잘못된 입력입니다.')

if __name__ == "__main__":
  manager = BoardManager()

  manager.create_board("공지사항")
  manager.create_board("자유게시판")


  manager.select_board(1)
  if manager.current_board:
        manager.current_board.add_post(Post("개강 안내", "관리자", manager.current_board))
        manager.current_board.add_post(Post("시험 일정", "교수자", manager.current_board))

  manager.select_board(2)
  if manager.current_board:
        manager.current_board.add_post(Post("밥 먹을 사람?", "학생A", manager.current_board))
        manager.current_board.add_post(Post("스터디 모집", "학생B", manager.current_board))

  
  while True: 
    print('조회를 원하는 게시판을 선택해주세요')
    print("\n--- 게시판 목록 ---")
    manager.list_boards()
    board_number = (input("게시판 번호를 입력하세요 (종료를 입력하면 프로그램이 종료됩니다): "))
    if board_number == '종료':
      print("프로그램을 종료합니다.")
      break
    else:
      try:
        board_number = int(board_number)
        if board_number < 1 or board_number > len(manager.boards):
          print("잘못된 게시판 번호입니다.")
          continue
      except ValueError:
        print("잘못된 입력입니다. 숫자를 입력하세요.")
        continue
    manager.select_board(int(board_number))
    manager.current_board.show_posts()
    while True:
      print('1. 게시물 추가, 2. 게시물 삭제, 3. 게시물 보기, 4. 게시물 수정, 5. 게시물 전체 삭제 6. 게시판 다시 선택하기')
      work = input('원하는 작업을 선택하세요:')
      if work == '6':
        print('게시판 선택으로 돌아갑니다')
        break
      else:
        whatToDo(work)
