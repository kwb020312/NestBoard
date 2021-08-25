import { Injectable } from '@nestjs/common';
import { Board } from './boards.module';

@Injectable()
export class BoardsService {
    private boards: Board[] = []

    getAllBoards(): Board[] {
        return this.boards
    }
}
