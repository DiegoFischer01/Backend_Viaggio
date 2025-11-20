import { MigrationInterface, QueryRunner } from "typeorm";

export class GeneratedMigration1763654520558 implements MigrationInterface {
    name = 'GeneratedMigration1763654520558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservas\` DROP FOREIGN KEY \`FK_8adfd4e4e0c39ff814a6f9c1841\``);
        await queryRunner.query(`CREATE TABLE \`usuarios\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`nombre\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL DEFAULT 'user', UNIQUE INDEX \`IDX_446adfc18b35418aac32ae0b7b\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reservas_actividades_actividades\` (\`reservasIdReserva\` int NOT NULL, \`actividadesId\` int NOT NULL, INDEX \`IDX_9ea46e8f160d74a760c343c473\` (\`reservasIdReserva\`), INDEX \`IDX_24b81de21dcd087c870a7f3a45\` (\`actividadesId\`), PRIMARY KEY (\`reservasIdReserva\`, \`actividadesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`actividades\` DROP COLUMN \`nombre\``);
        await queryRunner.query(`ALTER TABLE \`actividades\` ADD \`titulo\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`actividades\` ADD \`fecha\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`actividades\` DROP COLUMN \`descripcion\``);
        await queryRunner.query(`ALTER TABLE \`actividades\` ADD \`descripcion\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`actividades\` CHANGE \`precio\` \`precio\` decimal NULL`);
        await queryRunner.query(`ALTER TABLE \`actividades\` CHANGE \`imagenUrl\` \`imagenUrl\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reservas\` ADD CONSTRAINT \`FK_8adfd4e4e0c39ff814a6f9c1841\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservas_actividades_actividades\` ADD CONSTRAINT \`FK_9ea46e8f160d74a760c343c4734\` FOREIGN KEY (\`reservasIdReserva\`) REFERENCES \`reservas\`(\`idReserva\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`reservas_actividades_actividades\` ADD CONSTRAINT \`FK_24b81de21dcd087c870a7f3a45b\` FOREIGN KEY (\`actividadesId\`) REFERENCES \`actividades\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservas_actividades_actividades\` DROP FOREIGN KEY \`FK_24b81de21dcd087c870a7f3a45b\``);
        await queryRunner.query(`ALTER TABLE \`reservas_actividades_actividades\` DROP FOREIGN KEY \`FK_9ea46e8f160d74a760c343c4734\``);
        await queryRunner.query(`ALTER TABLE \`reservas\` DROP FOREIGN KEY \`FK_8adfd4e4e0c39ff814a6f9c1841\``);
        await queryRunner.query(`ALTER TABLE \`actividades\` CHANGE \`imagenUrl\` \`imagenUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`actividades\` CHANGE \`precio\` \`precio\` decimal NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`actividades\` DROP COLUMN \`descripcion\``);
        await queryRunner.query(`ALTER TABLE \`actividades\` ADD \`descripcion\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`actividades\` DROP COLUMN \`fecha\``);
        await queryRunner.query(`ALTER TABLE \`actividades\` DROP COLUMN \`titulo\``);
        await queryRunner.query(`ALTER TABLE \`actividades\` ADD \`nombre\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_24b81de21dcd087c870a7f3a45\` ON \`reservas_actividades_actividades\``);
        await queryRunner.query(`DROP INDEX \`IDX_9ea46e8f160d74a760c343c473\` ON \`reservas_actividades_actividades\``);
        await queryRunner.query(`DROP TABLE \`reservas_actividades_actividades\``);
        await queryRunner.query(`DROP INDEX \`IDX_446adfc18b35418aac32ae0b7b\` ON \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`usuarios\``);
        await queryRunner.query(`ALTER TABLE \`reservas\` ADD CONSTRAINT \`FK_8adfd4e4e0c39ff814a6f9c1841\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
