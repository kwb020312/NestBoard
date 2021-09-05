import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository
    ){

    }
    // getAllBoards(): Board[] {
    //     return this.boards
    // }

    // createBoard(createBoardDto: CreateBoardDto) {
    //     const {title, description} = createBoardDto
    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC
    //     }
    //     this.boards.push(board)
    //     return board
    // }

    async deleteBoard(id: number, user: User): Promise<void> {

        const result = await this.boardRepository.delete({id, user})

        if(result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }
    }

    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {

        return this.boardRepository.createBoard(createBoardDto, user)
    }

    async getAllBoards(user: User): Promise<Board[]> {
        const query = this.boardRepository.createQueryBuilder('board')
        query.where(`board.userId = :userId`, {userId: user.id})
        const boards = await query.getMany()
        return boards
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id)
        board.status = status
        await this.boardRepository.save(board)

        return board
    }

    async getBoardById(id: number): Promise <Board> {
        const found = await this.boardRepository.findOne(id)

        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }

        return found
    }

    // getBoardById(id: string): Board {
    //     const found = this.boards.find(board => board.id === id)
    //     if(!found) {
    //         throw new NotFoundException(`Can't find Board with id ${id}`)
    //     }
    //     return found
    // }

    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id)
    //     this.boards = this.boards.filter(board => board.id !== found.id)
    // }

    // updateBoardStatus(id: string , status: BoardStatus): Board {
    //     const board = this.getBoardById(id)
    //     board.status = status
    //     return board
    // }
 }
