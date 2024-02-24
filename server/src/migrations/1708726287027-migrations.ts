import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1708726287027 implements MigrationInterface {
  name = 'Migrations1708726287027';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tag_projects_project" DROP CONSTRAINT "FK_71dbc1e03c54eb0cb28f4cfdfd0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_todos_todo" DROP CONSTRAINT "FK_b812bff92c0934a42d65ddd9a4d"`,
    );
    await queryRunner.query(
      `CREATE TABLE "todo_tags_tag" ("todoId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_4b5c5b6c3213690a283f2d9c17c" PRIMARY KEY ("todoId", "tagId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5dc0015c16ba6a838d953ed07f" ON "todo_tags_tag" ("todoId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c0e14c0180e343dfa2fa00c24a" ON "todo_tags_tag" ("tagId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "project_tags_tag" ("projectId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_3215f280f961a2c7bea05565512" PRIMARY KEY ("projectId", "tagId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5438ba7df067895391b6f9f415" ON "project_tags_tag" ("projectId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_041c5496afa04d41bbafb5c98f" ON "project_tags_tag" ("tagId") `,
    );
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "tag"`);
    await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "tag"`);
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "tag"`);
    await queryRunner.query(
      `ALTER TABLE "tag_projects_project" ADD CONSTRAINT "FK_71dbc1e03c54eb0cb28f4cfdfd0" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_todos_todo" ADD CONSTRAINT "FK_b812bff92c0934a42d65ddd9a4d" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo_tags_tag" ADD CONSTRAINT "FK_5dc0015c16ba6a838d953ed07f2" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo_tags_tag" ADD CONSTRAINT "FK_c0e14c0180e343dfa2fa00c24a5" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tags_tag" ADD CONSTRAINT "FK_5438ba7df067895391b6f9f4157" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tags_tag" ADD CONSTRAINT "FK_041c5496afa04d41bbafb5c98f6" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_tags_tag" DROP CONSTRAINT "FK_041c5496afa04d41bbafb5c98f6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_tags_tag" DROP CONSTRAINT "FK_5438ba7df067895391b6f9f4157"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo_tags_tag" DROP CONSTRAINT "FK_c0e14c0180e343dfa2fa00c24a5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo_tags_tag" DROP CONSTRAINT "FK_5dc0015c16ba6a838d953ed07f2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_todos_todo" DROP CONSTRAINT "FK_b812bff92c0934a42d65ddd9a4d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_projects_project" DROP CONSTRAINT "FK_71dbc1e03c54eb0cb28f4cfdfd0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD "tag" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ADD "tag" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD "tag" character varying NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_041c5496afa04d41bbafb5c98f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5438ba7df067895391b6f9f415"`,
    );
    await queryRunner.query(`DROP TABLE "project_tags_tag"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c0e14c0180e343dfa2fa00c24a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5dc0015c16ba6a838d953ed07f"`,
    );
    await queryRunner.query(`DROP TABLE "todo_tags_tag"`);
    await queryRunner.query(
      `ALTER TABLE "tag_todos_todo" ADD CONSTRAINT "FK_b812bff92c0934a42d65ddd9a4d" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag_projects_project" ADD CONSTRAINT "FK_71dbc1e03c54eb0cb28f4cfdfd0" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
