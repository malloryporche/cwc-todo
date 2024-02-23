import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1708617103456 implements MigrationInterface {
  name = 'Migrations1708617103456';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "todo" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "tag" character varying NOT NULL, "dueDate" TIMESTAMP NOT NULL, "projectId" integer NOT NULL, "completed" boolean NOT NULL, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "todo"`);
  }
}
