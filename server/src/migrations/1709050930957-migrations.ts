import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1709050930957 implements MigrationInterface {
    name = 'Migrations1709050930957'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_tags" DROP CONSTRAINT "FK_f32b78c2affb2ff0556eee81b28"`);
        await queryRunner.query(`ALTER TABLE "project_tags" DROP CONSTRAINT "FK_eabf9838b75eb417af9ccd37bfc"`);
        await queryRunner.query(`ALTER TABLE "todo_tags" DROP CONSTRAINT "FK_72ad52a390ac887fbf9eb9215d7"`);
        await queryRunner.query(`ALTER TABLE "todo_tags" DROP CONSTRAINT "FK_da0fd6bf7150f085b3e79f066f1"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "completed"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "completed"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "completed"`);
        await queryRunner.query(`CREATE TYPE "public"."task_status_enum" AS ENUM('not started', 'planning', 'assigned', 'in progress', 'review', 'completed')`);
        await queryRunner.query(`ALTER TABLE "task" ADD "status" "public"."task_status_enum" NOT NULL DEFAULT 'not started'`);
        await queryRunner.query(`CREATE TYPE "public"."project_status_enum" AS ENUM('not started', 'planning', 'assigned', 'in progress', 'review', 'completed')`);
        await queryRunner.query(`ALTER TABLE "project" ADD "status" "public"."project_status_enum" NOT NULL DEFAULT 'not started'`);
        await queryRunner.query(`CREATE TYPE "public"."todo_status_enum" AS ENUM('not started', 'planning', 'assigned', 'in progress', 'review', 'completed')`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "status" "public"."todo_status_enum" NOT NULL DEFAULT 'not started'`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "dueDate"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "dueDate" date`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "dueDate"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "dueDate" date`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "dueDate"`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "dueDate" date`);
        await queryRunner.query(`ALTER TABLE "project_tags" ADD CONSTRAINT "FK_f32b78c2affb2ff0556eee81b28" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_tags" ADD CONSTRAINT "FK_eabf9838b75eb417af9ccd37bfc" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "todo_tags" ADD CONSTRAINT "FK_72ad52a390ac887fbf9eb9215d7" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "todo_tags" ADD CONSTRAINT "FK_da0fd6bf7150f085b3e79f066f1" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo_tags" DROP CONSTRAINT "FK_da0fd6bf7150f085b3e79f066f1"`);
        await queryRunner.query(`ALTER TABLE "todo_tags" DROP CONSTRAINT "FK_72ad52a390ac887fbf9eb9215d7"`);
        await queryRunner.query(`ALTER TABLE "project_tags" DROP CONSTRAINT "FK_eabf9838b75eb417af9ccd37bfc"`);
        await queryRunner.query(`ALTER TABLE "project_tags" DROP CONSTRAINT "FK_f32b78c2affb2ff0556eee81b28"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "dueDate"`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "dueDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "dueDate"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "dueDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "dueDate"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "dueDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."todo_status_enum"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."project_status_enum"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."task_status_enum"`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "completed" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "project" ADD "completed" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "task" ADD "completed" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "todo_tags" ADD CONSTRAINT "FK_da0fd6bf7150f085b3e79f066f1" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "todo_tags" ADD CONSTRAINT "FK_72ad52a390ac887fbf9eb9215d7" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_tags" ADD CONSTRAINT "FK_eabf9838b75eb417af9ccd37bfc" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_tags" ADD CONSTRAINT "FK_f32b78c2affb2ff0556eee81b28" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
