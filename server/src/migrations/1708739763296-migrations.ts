import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1708739763296 implements MigrationInterface {
  name = 'Migrations1708739763296';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todo_tags" DROP CONSTRAINT "FK_72ad52a390ac887fbf9eb9215d7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo_tags" DROP CONSTRAINT "FK_da0fd6bf7150f085b3e79f066f1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tags" DROP CONSTRAINT "FK_f32b78c2affb2ff0556eee81b28"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tags" DROP CONSTRAINT "FK_eabf9838b75eb417af9ccd37bfc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "description" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "dueDate" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "description" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "dueDate" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ALTER COLUMN "description" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ALTER COLUMN "dueDate" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo_tags" ADD CONSTRAINT "FK_da0fd6bf7150f085b3e79f066f1" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo_tags" ADD CONSTRAINT "FK_72ad52a390ac887fbf9eb9215d7" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tags" ADD CONSTRAINT "FK_eabf9838b75eb417af9ccd37bfc" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tags" ADD CONSTRAINT "FK_f32b78c2affb2ff0556eee81b28" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_tags" DROP CONSTRAINT "FK_f32b78c2affb2ff0556eee81b28"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tags" DROP CONSTRAINT "FK_eabf9838b75eb417af9ccd37bfc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo_tags" DROP CONSTRAINT "FK_72ad52a390ac887fbf9eb9215d7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo_tags" DROP CONSTRAINT "FK_da0fd6bf7150f085b3e79f066f1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ALTER COLUMN "dueDate" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ALTER COLUMN "description" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "dueDate" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "description" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "dueDate" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "description" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tags" ADD CONSTRAINT "FK_eabf9838b75eb417af9ccd37bfc" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tags" ADD CONSTRAINT "FK_f32b78c2affb2ff0556eee81b28" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo_tags" ADD CONSTRAINT "FK_da0fd6bf7150f085b3e79f066f1" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo_tags" ADD CONSTRAINT "FK_72ad52a390ac887fbf9eb9215d7" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
