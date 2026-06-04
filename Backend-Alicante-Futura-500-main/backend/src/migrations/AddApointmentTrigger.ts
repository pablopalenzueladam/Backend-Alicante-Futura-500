import { MigrationInterface, QueryRunner } from "typeorm";

export class AddApointmentTrigger implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    
    //Este disparador debería actualizar el campo 'Siguiente reserva' de cada cliente una vez se introducen
    //nuevas reservas.
    await queryRunner.query(`
      CREATE TRIGGER IF NOT EXISTS new_appointment
      AFTER UPDATE ON appointment
      FOR EACH ROW
      BEGIN
        DECLARE fechaN STRING;
        DECLARE fechaV STRING DEFAULT NULL;
        SET fechaN := NEW.date;
        SELECT date INTO fechaV FROM customer JOIN appointment ON customer.id = appointment.customerId WHERE customer.businessId = appointment.businessId;

        IF(fechaV IS NULL) THEN
          UPDATE customer SET := NEW.businessId WHERE customerId = customer.id;
        ELSEIF(fechaV > fechaN) THEN
          UPDATE customer SET
            businessId = NEW.businessId WHERE customer.id = NEW.customerId;
      END;
    `);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(`
      DROP TRIGGER IF EXISTS user_updated_at;
    `);

  }
}