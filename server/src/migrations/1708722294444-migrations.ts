import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1708722294444 implements MigrationInterface {
  name = 'Migrations1708722294444';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "tag" character varying NOT NULL, "dueDate" TIMESTAMP NOT NULL, "completed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "tag" character varying NOT NULL, "dueDate" TIMESTAMP NOT NULL, "completed" boolean NOT NULL DEFAULT false, "userId" integer, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tag_projects_project" ("tagId" integer NOT NULL, "projectId" integer NOT NULL, CONSTRAINT "PK_c73a25afa652e59695161112ed4" PRIMARY KEY ("tagId", "projectId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8b8141d9d204321c95eb009686" ON "tag_projects_project" ("tagId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_71dbc1e03c54eb0cb28f4cfdfd" ON "tag_projects_project" ("projectId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "tag_todos_todo" ("tagId" integer NOT NULL, "todoId" integer NOT NULL, CONSTRAINT "PK_558d9ecc86714db434fa0f8de46" PRIMARY KEY ("tagId", "todoId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_936f08bfeb61abd3b5ede0615a" ON "tag_todos_todo" ("tagId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b812bff92c0934a42d65ddd9a4" ON "tag_todos_todo" ("todoId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "completed" SET DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "projectId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ADD CONSTRAINT "FK_114a4b7327487e206983b9be77f" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_7c4b0d3b77eaf26f8b4da879e63" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_projects_project" ADD CONSTRAINT "FK_8b8141d9d204321c95eb0096867" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_projects_project" ADD CONSTRAINT "FK_71dbc1e03c54eb0cb28f4cfdfd0" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_todos_todo" ADD CONSTRAINT "FK_936f08bfeb61abd3b5ede0615ae" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_todos_todo" ADD CONSTRAINT "FK_b812bff92c0934a42d65ddd9a4d" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tag_todos_todo" DROP CONSTRAINT "FK_b812bff92c0934a42d65ddd9a4d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_todos_todo" DROP CONSTRAINT "FK_936f08bfeb61abd3b5ede0615ae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_projects_project" DROP CONSTRAINT "FK_71dbc1e03c54eb0cb28f4cfdfd0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_projects_project" DROP CONSTRAINT "FK_8b8141d9d204321c95eb0096867"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" DROP CONSTRAINT "FK_7c4b0d3b77eaf26f8b4da879e63"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" DROP CONSTRAINT "FK_114a4b7327487e206983b9be77f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "projectId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "completed" DROP DEFAULT`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b812bff92c0934a42d65ddd9a4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_936f08bfeb61abd3b5ede0615a"`,
    );
    await queryRunner.query(`DROP TABLE "tag_todos_todo"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_71dbc1e03c54eb0cb28f4cfdfd"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8b8141d9d204321c95eb009686"`,
    );
    await queryRunner.query(`DROP TABLE "tag_projects_project"`);
    await queryRunner.query(`DROP TABLE "tag"`);
    await queryRunner.query(`DROP TABLE "project"`);
    await queryRunner.query(`DROP TABLE "task"`);
  }
}
