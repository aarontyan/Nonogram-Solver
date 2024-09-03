# 1 means filled, 0 means empty, -1 means crossed
import heapq as hq
from typing import Optional


class Nonogram:
    def __init__(self, rows: int, cols: int, row_vals: list, col_vals: list):
        self.num_rows = rows
        self.num_cols = cols
        self.row_len = self.num_cols
        self.col_len = self.num_rows
        self.row_vals = row_vals
        self.col_vals = col_vals
        # Set to true if the puzzle is impossible to solve
        self.impossible = False
        # holds lists containing all the possibilities for each row and column, with each index representing each row/col number
        self.row_possibilities = []
        self.col_possibilities = []
        for row in row_vals:
            self.row_possibilities.append(self.generate_possibilities(row, True))
        for col in col_vals:
            self.col_possibilities.append(self.generate_possibilities(col, False))
        self.board = [[0 for _ in range(self.num_rows)] for _ in range(self.num_cols)]
        # subtract by 1 everytime a row or col possiblity reaches length 1, when 0 it's finished
        self.solves_needed = rows + cols
        # index corrosponds to which row/col, list at that place corresponds to which spot to change
        # THESE ARE ALL CHANGES THAT NEED TO BE MADE
        self.rows_todo = [[0, i, True, set()] for i in range(self.num_rows)]
        self.cols_todo = [[0, i, False, set()] for i in range(self.num_cols)]
        # THESE ARE ALL CHANGES THAT HAVE ALREADY BEEN MADE
        self.row_changes = [set() for _ in range(self.num_rows)]
        self.col_changes = [set() for _ in range(self.num_cols)]
        self.row_solved = [False for _ in range(self.num_rows)]
        self.col_solved = [False for _ in range(self.num_cols)]
        self.board_change = []
        self.board_change.append(self.board)
        self.solve_board()
        self.check_board()

    # solves the board
    def solve_board(self):
        if self.impossible:
            return
        heap = []
        for i in range(self.num_rows):
            indexes = self.find_common_indexes(i, True)
            for idx, type in indexes:
                self.row_changes[i].add((idx, type))
            if len(self.row_possibilities[i]) == 1 and not self.row_solved[i]:
                self.solves_needed -= 1
                self.row_solved[i] = True
            if len(self.row_possibilities[i]) == 0:
                self.impossible = True
                return

        for i in range(self.num_cols):
            indexes = self.find_common_indexes(i, False)
            for idx, type in indexes:
                self.col_changes[i].add((idx, type))
            if len(self.col_possibilities[i]) == 1 and not self.col_solved[i]:
                self.solves_needed -= 1
                self.col_solved[i] = True
            if len(self.col_possibilities[i]) == 0:
                self.impossible = True
                return

        for i in range(self.num_rows):
            for idx, type in self.row_changes[i]:
                if (i, type) not in self.col_changes[idx]:
                    self.cols_todo[idx][0] -= 1
                    self.cols_todo[idx][3].add((i, type))

        for i in range(self.num_cols):
            for idx, type in self.col_changes[i]:
                if (i, type) not in self.row_changes[idx]:
                    self.rows_todo[idx][0] -= 1
                    self.rows_todo[idx][3].add((i, type))

        for r in self.rows_todo:
            if r[0] != 0:
                hq.heappush(heap, [r[0], r[1], r[2], list(r[3])])
        for c in self.cols_todo:
            if c[0] != 0:
                hq.heappush(heap, [c[0], c[1], c[2], list(c[3])])

        while heap and self.solves_needed > 0:
            # if row is true, we are currently looking at the changes to be made to a row (changes are column indexes)
            _, idx, row, changes = hq.heappop(heap)
            changes = list(changes)
            i = 0
            completed = False
            while i < len(changes):
                if row:
                    if len(self.row_possibilities[idx]) == 1:
                        completed = True
                        break
                    if len(self.row_possibilities[idx]) == 0:
                        self.impossible = True
                        break
                else:
                    if len(self.col_possibilities[idx]) == 1:
                        completed = True
                        break
                    if len(self.col_possibilities[idx]) == 0:
                        self.impossible = True
                        break
                change_idx, type = changes[i]
                if row and change_idx in self.row_changes[idx]:
                    i += 1
                    continue
                if not row and change_idx in self.col_changes[idx]:
                    i += 1
                    continue
                self.remove_possibilities(idx, row, change_idx, type)
                if row:
                    self.row_changes[idx].add(change_idx)
                else:
                    self.col_changes[idx].add(change_idx)
                new_changes = self.find_common_indexes(idx, row)
                if row:
                    for nidx, ntype in new_changes:
                        if (
                            idx not in self.col_changes[nidx]
                            and idx not in self.cols_todo[nidx][3]
                        ):
                            self.cols_todo[nidx][0] -= 1
                            self.cols_todo[nidx][3].add((idx, ntype))
                            hq.heappush(heap, self.cols_todo[nidx])
                else:
                    for nidx, ntype in new_changes:
                        if (
                            idx not in self.row_changes[nidx]
                            and idx not in self.rows_todo[nidx][3]
                        ):
                            self.rows_todo[nidx][0] -= 1
                            self.rows_todo[nidx][3].add((idx, ntype))
                            hq.heappush(heap, self.rows_todo[nidx])

                changes.extend(new_changes)
                i += 1

            if self.impossible:
                return
            if completed:
                if (
                    row
                    and len(self.row_possibilities[idx]) == 1
                    and not self.row_solved[idx]
                ):
                    self.solves_needed -= 1
                    self.row_solved[idx] = True
                elif (
                    not row
                    and len(self.col_possibilities[idx]) == 1
                    and not self.col_solved[idx]
                ):
                    self.solves_needed -= 1
                    self.col_solved[idx] = True

    def check_board(self) -> None:
        if self.impossible:
            return
        for i, curr_row_real in enumerate(self.row_vals):
            if len(self.row_possibilities[i]) != 1:
                self.impossible = True
                return
            curr_row = self.row_possibilities[i][0]
            curr_vals = []
            count = 0
            print(curr_row)
            for val in curr_row:
                if val == 1:
                    count += 1
                if val == -1 and count != 0:
                    curr_vals.append(count)
                    count = 0
            if count != 0:
                curr_vals.append(count)
            print(curr_vals)
            if curr_row_real != curr_vals:
                self.impossible = True
                return
        for i, curr_col_real in enumerate(self.col_vals):
            if len(self.col_possibilities[i]) != 1:
                self.impossible = True
                return
            curr_col = self.col_possibilities[i][0]
            curr_vals = []
            count = 0
            for val in curr_col:
                if val == 1:
                    count += 1
                if val == -1 and count != 0:
                    curr_vals.append(count)
                    count = 0
            if count != 0:
                curr_vals.append(count)
            if curr_col_real != curr_vals:
                self.impossible = True
                return

        row_mtrx = []
        for row in self.row_possibilities:
            row_mtrx.append(row[0])

        for c, col in enumerate(self.col_possibilities):
            for r, val in enumerate(col[0]):
                if val != row_mtrx[r][c]:
                    self.impossible = True
                    return

    # returns either the solved board in a 2x2 array, or None if the board is unsolvable
    def get_board(self) -> Optional[list]:
        if self.impossible:
            return None
        res = []
        for r in self.row_possibilities:
            if len(r) != 1:
                return None
            res.append(r[0])
        return res

    # helper function to generate every possible position for a given value list
    def generate_possibilities(self, vals: list, row: bool) -> list:
        res = []
        size = self.row_len if row else self.col_len

        def generate_possibility(vals: list, size: int, curr: list):
            if not vals or 0 in vals:
                while len(curr) < size:
                    curr.append(-1)
                res.append(curr.copy())
                return

            if len(curr) >= size:
                return

            space_needed = sum(vals) + len(vals) - 1

            max_start_index = size - space_needed
            for i in range(max_start_index - len(curr) + 1):
                temp = curr.copy()
                temp.extend([-1] * i)
                temp.extend([1] * vals[0])
                if len(vals) > 1:
                    temp.append(-1)
                generate_possibility(vals[1:], size, temp)

        generate_possibility(vals, size, [])
        return res

    # removes every possibility that doesn't align with having type at idx for the row or column at index num
    def remove_possibilities(self, num: int, row: bool, idx: int, type: int):
        possibilities = (
            self.row_possibilities[num] if row else self.col_possibilities[num]
        )
        new_possibilities = []
        for possibility in possibilities:
            if possibility[idx] == type:
                new_possibilities.append(possibility)
        if row:
            self.row_possibilities[num] = new_possibilities
        else:
            self.col_possibilities[num] = new_possibilities

    # finds the indexes with the same values for a given row or column's possibilities
    def find_common_indexes(self, num: int, row: bool) -> list:
        possibilities = (
            self.row_possibilities[num] if row else self.col_possibilities[num]
        )
        size = self.row_len if row else self.col_len
        common_indexes = []
        for i in range(size):
            common = 0
            completed = True
            for p in possibilities:
                if common == 0:
                    common = p[i]
                if p[i] != common:
                    completed = False
                    break
            if completed:
                common_indexes.append((i, common))
        return common_indexes
