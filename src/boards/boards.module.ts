import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { BoardRepository } from "./board.repository";
import { BoardsController } from "./boards.controller";
import { BoardsService } from "./boards.service";

export interface Board {
  id: string
  title: string
  description: string
  status: BoardStatus
}

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardRepository])
  ],
  controllers: [BoardsController],
  providers: [BoardsService]
})

export class BoardsModule {

}