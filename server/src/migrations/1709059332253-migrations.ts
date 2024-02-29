import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1709059332253 implements MigrationInterface {
    name = 'Migrations1709059332253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo_tags" DROP CONSTRAINT "FK_72ad52a390ac887fbf9eb9215d7"`);
        await queryRunner.query(`ALTER TABLE "todo_tags" DROP CONSTRAINT "FK_da0fd6bf7150f085b3e79f066f1"`);
        await queryRunner.query(`ALTER TABLE "project_tags" DROP CONSTRAINT "FK_f32b78c2affb2ff0556eee81b28"`);
        await queryRunner.query(`ALTER TABLE "project_tags" DROP CONSTRAINT "FK_eabf9838b75eb417af9ccd37bfc"`);
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
        await queryRunner.query(`ALTER TABLE "project_tags" ADD CONSTRAINT "FK_eabf9838b75eb417af9ccd37bfc" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_tags" ADD CONSTRAINT "FK_f32b78c2affb2ff0556eee81b28" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "todo_tags" ADD CONSTRAINT "FK_da0fd6bf7150f085b3e79f066f1" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "todo_tags" ADD CONSTRAINT "FK_72ad52a390ac887fbf9eb9215d7" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
