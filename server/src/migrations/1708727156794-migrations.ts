import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1708727156794 implements MigrationInterface {
  name = 'Migrations1708727156794';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "project_tags" ("tagId" integer NOT NULL, "projectId" integer NOT NULL, CONSTRAINT "PK_348a788aabc2b5440dbc0153f60" PRIMARY KEY ("tagId", "projectId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f32b78c2affb2ff0556eee81b2" ON "project_tags" ("tagId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_eabf9838b75eb417af9ccd37bf" ON "project_tags" ("projectId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "todo_tags" ("tagId" integer NOT NULL, "todoId" integer NOT NULL, CONSTRAINT "PK_85708ac82b6de1d0e2015e5862e" PRIMARY KEY ("tagId", "todoId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_72ad52a390ac887fbf9eb9215d" ON "todo_tags" ("tagId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_da0fd6bf7150f085b3e79f066f" ON "todo_tags" ("todoId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tags" ADD CONSTRAINT "FK_f32b78c2affb2ff0556eee81b28" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tags" ADD CONSTRAINT "FK_eabf9838b75eb417af9ccd37bfc" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo_tags" ADD CONSTRAINT "FK_72ad52a390ac887fbf9eb9215d7" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo_tags" ADD CONSTRAINT "FK_da0fd6bf7150f085b3e79f066f1" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todo_tags" DROP CONSTRAINT "FK_da0fd6bf7150f085b3e79f066f1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo_tags" DROP CONSTRAINT "FK_72ad52a390ac887fbf9eb9215d7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tags" DROP CONSTRAINT "FK_eabf9838b75eb417af9ccd37bfc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tags" DROP CONSTRAINT "FK_f32b78c2affb2ff0556eee81b28"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_da0fd6bf7150f085b3e79f066f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_72ad52a390ac887fbf9eb9215d"`,
    );
    await queryRunner.query(`DROP TABLE "todo_tags"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_eabf9838b75eb417af9ccd37bf"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f32b78c2affb2ff0556eee81b2"`,
    );
    await queryRunner.query(`DROP TABLE "project_tags"`);
  }
}
