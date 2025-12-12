import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteOrder1764121133945 implements MigrationInterface {
    name = 'DeleteOrder1764121133945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_detail" DROP CONSTRAINT "FK_d3dbd5c021247e9085891d1ad1b"`);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD CONSTRAINT "FK_d3dbd5c021247e9085891d1ad1b" FOREIGN KEY ("id_order") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_detail" DROP CONSTRAINT "FK_d3dbd5c021247e9085891d1ad1b"`);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD CONSTRAINT "FK_d3dbd5c021247e9085891d1ad1b" FOREIGN KEY ("id_order") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
